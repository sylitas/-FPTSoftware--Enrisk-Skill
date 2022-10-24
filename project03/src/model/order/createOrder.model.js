/* eslint-disable no-unused-vars */
import { v4 as uuIdv4 } from 'uuid';
import { CURRENCY, DELIVER_STATUS, DYNAMO_DB, ORDER_STATUS } from '../../libraries/const';
import { put, query } from '../../libraries/dynamoDB';
import { getAllProductsWithIds } from './common';

const getAllOrders = async (userId) => {
  const params = {
    TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME,
    IndexName: DYNAMO_DB.TABLE.ORDERS_TABLE.INDEX_USER_ID,
    KeyConditionExpression: '#userId = :userId',
    FilterExpression: '#status = :status',
    ExpressionAttributeNames: { '#userId': 'userId', '#status': 'status' },
    ExpressionAttributeValues: { ':userId': userId, ':status': ORDER_STATUS.PENDING },
  };
  const { Items = [] } = await query(params);
  return Items;
};

const createOrder = async (req) => {
  console.log('😎 Sylitas | Triggered successful function createOrder (Model)');

  try {
    const {
      userInfo: { userId },
      body: { productIds = [] },
    } = req;

    const isOrderExisted = await getAllOrders(userId);
    if (isOrderExisted.length) return { error: { message: 'Can not create more order' } };

    const products = await getAllProductsWithIds(productIds);
    const order = products.reduce(
      (orderInfo, product) => {
        const { userId: productOwnerId, tag, price, productId } = product;
        if (!orderInfo.productIds.includes(productId)) orderInfo.productIds.push(productId);
        if (!orderInfo.productOwnerIds.includes(productOwnerId)) orderInfo.productOwnerIds.push(productOwnerId);
        if (!orderInfo.referenceTag.includes(tag)) orderInfo.referenceTag.push(tag);
        orderInfo.totalPrice += price;
        return orderInfo;
      },
      {
        orderId: uuIdv4(),
        userId,
        productIds: [],
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

    console.log('😎 Sylitas | order : ', JSON.stringify(order, null, 2));

    await put({ TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME, Item: order });

    return { data: { order } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createOrder';
    return { error: { message } };
  }
};

export default createOrder;
