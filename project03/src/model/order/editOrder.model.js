import { DYNAMO_DB } from '../../libraries/const';
import { put } from '../../libraries/dynamoDB';
import { getOrder, getProductById } from './common';

const modifyProduct = async (additional, order, type = 'add') =>
  additional.reduce(async (preP, { productId, amount }) => {
    const { products: productsOrder, productOwnerIds } = order;
    const pre = await preP;
    let productsOrderIndex;
    if (
      productsOrder.find((productOrder, index) => {
        if (productOrder.productId === productId) {
          productsOrderIndex = index;
          return true;
        }
        return false;
      })
    ) {
      if (type === 'add') {
        productsOrder[productsOrderIndex].amount += amount;
      } else {
        productsOrder[productsOrderIndex].amount -= amount;
      }
    } else {
      productsOrder.push({ productId, amount });
    }
    const { price, userId: productOwnerId } = await getProductById(productId);
    if (type === 'add') {
      order.totalPrice += price * amount;
    } else {
      order.totalPrice -= price * amount;
    }
    if (!productOwnerIds.includes(productOwnerId)) productOwnerIds.push(productOwnerId);
    return pre;
  }, Promise.resolve());

const editOrder = async (req) => {
  console.log('😎 Sylitas | Triggered successful function editOrder (Model)');
  try {
    const {
      userInfo: { userId },
      query: { orderId },
      body: { additional, removal },
    } = req;

    const order = await getOrder(userId, orderId);

    order.updatedAt = new Date().toISOString();

    if (!order) throw new Error('Can not find orderId');

    if (additional.length) await modifyProduct(additional, order, 'add');
    if (removal.length) await modifyProduct(removal, order, 'remove');

    order.products = order.products.filter((product) => product.amount);

    console.log('😎 Sylitas | order : ', JSON.stringify(order, null, 2));

    await put({ TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME, Item: order });

    return { data: { order } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createProduct';
    return { error: { message } };
  }
};

export default editOrder;
