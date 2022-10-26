import { DYNAMO_DB } from '../../libraries/const';
import { scan } from '../../libraries/dynamoDB';
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

const getAllProduct = async (req) => {
  console.log('😎 Sylitas | Triggered successful function getAllProduct (Model)');
  try {
    const {
      query: { limit = 20, paginateToken, fields },
    } = req;

    const params = {
      TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
      Limit: parseInt(limit, 10),
    };

    if ([paginateToken, paginateToken !== ''].every(Boolean)) {
      params.ExclusiveStartKey = JSON.parse(base64Decoded(paginateToken));
    }

    generateProjectionExpression(params, fields);

    if (params.FilterExpression === '') delete params.FilterExpression;
    console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

    const { Items, LastEvaluatedKey } = await scan(params);

    return {
      data: {
        products: Items,
        paginateToken: LastEvaluatedKey ? base64Encoded(JSON.stringify(LastEvaluatedKey)) : '',
      },
    };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at getAllProduct';
    return { error: { message } };
  }
};

export default getAllProduct;
