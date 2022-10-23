import { DYNAMO_DB, PRODUCT_STATUS } from '../../libraries/const';
import { update } from '../../libraries/dynamoDB';

const editProduct = async (req) => {
  console.log('😎 Sylitas | Triggered successful function editProduct (Model)');
  try {
    const {
      query: { productId },
      body: { tag, productInfo, price, amount },
    } = req;
    const updateField = ['tag', 'productInfo', 'price', 'amount', 'updatedAt'];
    const updateExpression = updateField
      .reduce((pre, cur) => {
        pre.push(`#${cur} = :${cur}`);
        return pre;
      }, [])
      .join(',');

    const params = {
      TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
      Key: { productId },
      UpdateExpression: `SET ${updateExpression}`,
      ConditionExpression: '#status <> :status',
      ExpressionAttributeNames: {
        '#tag': 'tag',
        '#productInfo': 'productInfo',
        '#price': 'price',
        '#amount': 'amount',
        '#status': 'status',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':tag': tag,
        ':productInfo': productInfo,
        ':price': price,
        ':amount': amount,
        ':status': PRODUCT_STATUS.DELETED,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };
    console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

    const { Attributes } = await update(params);

    return { data: { productId: Attributes.productId } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createProduct';
    return { error: { message } };
  }
};

export default editProduct;
