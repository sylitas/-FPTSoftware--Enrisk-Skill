import { DYNAMO_DB } from '../../libraries/const';
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
  };
  const { Items } = await query(params);
  return Items[0];
};
