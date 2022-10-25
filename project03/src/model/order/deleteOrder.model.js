import { DYNAMO_DB, ORDER_STATUS } from '../../libraries/const';
import { deleteRecord } from '../../libraries/dynamoDB';

const deleteOrder = async (req) => {
  console.log('😎 Sylitas | Triggered successful function deleteOrder (Model)');

  try {
    const {
      query: { orderId },
    } = req;

    const params = {
      TableName: DYNAMO_DB.TABLE.ORDERS_TABLE.NAME,
      Key: { orderId },
      ConditionExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': ORDER_STATUS.PAID,
      },
    };
    console.log('😎 Sylitas | params : ', JSON.stringify(params, null, 2));

    await deleteRecord(params);

    return { data: { message: 'Deleted order successfully' } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    return { error: { message: 'Can not find orderId' } };
  }
};

export default deleteOrder;
