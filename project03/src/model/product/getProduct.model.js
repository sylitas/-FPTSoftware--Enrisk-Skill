import {
  DYNAMO_DB,
  // PRODUCT_STATUS
} from '../../libraries/const';
import { query } from '../../libraries/dynamoDB';
import { base64Decoded, base64Encoded } from '../../libraries/util';

const generateProjectionExpression = (params, fields) => {
  if ([fields, fields !== ''].every(Boolean)) {
    const fieldArr = fields.split(',');
    params.ProjectionExpression = fieldArr
      .map((el) => {
        params.ExpressionAttributeNames = {
          ...params.ExpressionAttributeNames,
          [`#${el}`]: el,
        };
        return `#${el}`;
      })
      .join(',');
  }
};

const generateFilterExpression = (params, productIds) => {
  if ([productIds, productIds !== ''].every(Boolean)) {
    params.FilterExpression += ' AND ';
    const filterExpressionAddition = productIds
      .split(',')
      .reduce((pre, cur, index) => {
        params.ExpressionAttributeNames[`#productId${index}`] = 'productId';
        params.ExpressionAttributeValues[`:productId${index}`] = cur;
        pre.push(`#productId${index} = :productId${index}`);
        return pre;
      }, [])
      .join(' OR ');
    params.FilterExpression += `(${filterExpressionAddition})`;
  }
};

const getProduct = async (req) => {
  console.log('😎 Sylitas | Triggered successful function getProduct (Model)');
  try {
    const {
      userInfo: { userId },
      query: { productIds, limit = 20, paginateToken, fields },
    } = req;

    const params = {
      TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
      IndexName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.INDEX_USER_ID,
      KeyConditionExpression: '#userId = :userId',
      // FilterExpression: '(#status <> :status)',
      ExpressionAttributeNames: {
        '#userId': 'userId',
        // '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':userId': userId,
        // ':status': PRODUCT_STATUS.DELETED
      },
      Limit: parseInt(limit, 10),
    };

    if ([paginateToken, paginateToken !== ''].every(Boolean)) {
      params.ExclusiveStartKey = JSON.parse(base64Decoded(paginateToken));
    }

    generateProjectionExpression(params, fields);
    generateFilterExpression(params, productIds);

    console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

    const { Items, LastEvaluatedKey } = await query(params);

    return {
      data: {
        products: Items,
        paginateToken: LastEvaluatedKey ? base64Encoded(JSON.stringify(LastEvaluatedKey)) : '',
      },
    };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createProduct';
    return { error: { message } };
  }
};

export default getProduct;
