import { DYNAMO_DB, PRODUCT_STATUS } from '../../libraries/const';
import { update } from '../../libraries/dynamoDB';

const deleteProduct = async (req) => {
  console.log('😎 Sylitas | Triggered successful function deleteProduct (Model)');
  try {
    const {
      query: { productId },
    } = req;

    const params = {
      TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME,
      Key: { productId },
      UpdateExpression: 'SET #status = :status, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':status': PRODUCT_STATUS.DELETED,
        ':updatedAt': new Date().toISOString(),
      },
    };
    console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

    await update(params);

    return { data: { message: 'Product deleted' } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at createProduct';
    return { error: { message } };
  }
};

export default deleteProduct;
