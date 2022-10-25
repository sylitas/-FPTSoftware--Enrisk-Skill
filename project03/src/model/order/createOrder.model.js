import { v4 as uuIdv4 } from 'uuid';
import { CURRENCY, DELIVER_STATUS, DYNAMO_DB, ORDER_STATUS } from '../../libraries/const';
import { put } from '../../libraries/dynamoDB';
import { getAllProductsWithIds, getPendingOrder } from './common';

const updateOldDetail = async (orderDetail, productsInfo, pendingOrder) => {
  const newOrder = pendingOrder;
  newOrder.updatedAt = new Date().toISOString();
  orderDetail.forEach(({ productId, amount }) => {
    productsInfo.forEach((productInfo) => {
      if (productInfo.productId === productId) {
        let indexProduct;
        if (
          newOrder.products.find((product, index) => {
            if (product.productId === productId) {
              indexProduct = index;
              return true;
            }
            return false;
          })
        ) {
          newOrder.products[indexProduct].amount += amount;
        } else {
          newOrder.products.push(productId, amount);
        }
        newOrder.totalPrice += productInfo.price * amount;
        if (!newOrder.productOwnerIds.includes(productInfo.userId)) newOrder.productOwnerIds.push(productInfo.userId);
        if (!newOrder.referenceTag.includes(productInfo.tag)) newOrder.referenceTag.push(productInfo.tag);
      }
    });
  });

  return newOrder;
};

const createNewOrder = async (userId, orderDetail, productsInfo) => {
  const order = orderDetail.reduce(
    (pre, { productId, amount }) => {
      productsInfo.forEach((productInfo) => {
        if (productInfo.productId === productId) {
          pre.products.push({ productId, amount });
          if (!pre.productOwnerIds.includes(productInfo.userId)) pre.productOwnerIds.push(productInfo.userId);
          if (!pre.referenceTag.includes(productInfo.tag)) pre.referenceTag.push(productInfo.tag);
          pre.totalPrice += productInfo.price * amount;
        }
      });
      return pre;
    },
    {
      orderId: uuIdv4(),
      userId,
      products: [],
      productOwnerIds: [],
      referenceTag: [],
      totalPrice: 0,
      createdAt: new Date().toISOString(),
      updatedAt: '',
      currency: CURRENCY,
      status: ORDER_STATUS.PENDING,
      deliverStatus: DELIVER_STATUS.NONE,
    },
  );

  return order;
};

const createOrder = async (req) => {
  console.log('😎 Sylitas | Triggered successful function createOrder (Model)');

  try {
    const {
      userInfo: { userId },
      body: { orderDetail = [] },
    } = req;

    console.log('😎 Sylitas | orderDetail : ', JSON.stringify(orderDetail, null, 2));

    let recentOrder;

    const pendingOrder = await getPendingOrder(userId);
    const productsInfo = await getAllProductsWithIds(orderDetail.map((productInfo) => productInfo.productId));
    console.log('😎 Sylitas | productsInfo : ', JSON.stringify(productsInfo, null, 2));
    if (pendingOrder) {
      recentOrder = await updateOldDetail(orderDetail, productsInfo, pendingOrder);
    } else {
      recentOrder = await createNewOrder(userId, orderDetail, productsInfo);
    }

    await put({ TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME, Item: recentOrder });
    return { data: { order: recentOrder } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createOrder';
    return { error: { message } };
  }
};

export default createOrder;
