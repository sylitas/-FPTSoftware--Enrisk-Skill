import { DYNAMO_DB, ORDER_STATUS } from '../../libraries/const';
import { query, scan } from '../../libraries/dynamoDB';

export const getAllProductsWithIds = async (ids) => {
  const params = {
    TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
    ExpressionAttributeNames: { '#productId': 'productId' },
    ExpressionAttributeValues: {},
    ProjectionExpression: 'userId, tag, price, productId',
  };
  params.FilterExpression = ids
    .reduce((pre, cur, index) => {
      params.ExpressionAttributeValues[`:productId${index}`] = cur;
      pre.push(`(#productId = :productId${index})`);
      return pre;
    }, [])
    .join(' OR ');

  console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

  const { Items = [] } = await scan(params);
  console.log('😎 Sylitas | products : ', Items);
  return Items;
};

export const getProductById = async (productId) => {
  const params = {
    TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
    KeyConditionExpression: '#productId = :productId',
    ExpressionAttributeNames: { '#productId': 'productId' },
    ExpressionAttributeValues: { ':productId': productId },
    ProjectionExpression: 'userId, tag, price',
    Limit: 1,
  };
  const { Items } = await query(params);
  return Items[0];
};

export const getPendingOrder = async (userId) => {
  const params = {
    TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME,
    IndexName: DYNAMO_DB.TABLE.ORDERS_TABLE.INDEX_USER_ID,
    KeyConditionExpression: '#userId = :userId',
    FilterExpression: '#status = :status',
    ExpressionAttributeNames: { '#userId': 'userId', '#status': 'status' },
    ExpressionAttributeValues: { ':userId': userId, ':status': ORDER_STATUS.PENDING },
    Limit: 1,
  };
  const {
    Items: [pendingOrder],
  } = await query(params);
  return pendingOrder;
};

export const getOrder = async (userId, orderId) => {
  const params = {
    TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME,
    IndexName: DYNAMO_DB.TABLE.ORDERS_TABLE.INDEX_USER_ID,
    KeyConditionExpression: '#userId = :userId',
    FilterExpression: '#orderId = :orderId',
    ExpressionAttributeNames: {
      '#orderId': 'orderId',
      '#userId': 'userId',
    },
    ExpressionAttributeValues: {
      ':orderId': orderId,
      ':userId': userId,
    },
  };
  const {
    Items: [order],
  } = await query(params);
  return order;
};
