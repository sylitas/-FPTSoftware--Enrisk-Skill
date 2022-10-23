// import { v4 as uuIdv4 } from 'uuid';
// import { DYNAMO_DB, PRODUCT_STATUS } from '../../libraries/const';
// import { put } from '../../libraries/dynamoDB';
const createOrder = async () => {
  console.log('😎 Sylitas | Triggered successful function createOrder (Model)');

  // try {
  // const {
  //   userInfo: { userId },
  //   body: { tag, productInfo, price, amount },
  // } = req;

  // const Item = {
  //   productId: uuIdv4(),
  //   createdAt: new Date().toISOString(),
  //   status: PRODUCT_STATUS.CREATED,
  //   updatedAt: '',
  //   userId,
  //   tag,
  //   productInfo,
  //   price,
  //   amount,
  // };

  // await put({ TableName: DYNAMO_DB.TABLE.PRODUCTS_TABLE.NAME, Item });

  return { data: { message: 'Triggered createOrder' } };
  // } catch (error) {
  //   console.error('😎 Sylitas | Error :', error);
  //   const message = error.message ? error.message : 'An error occurred at createOrder';
  //   return { error: { message } };
  // }
};

export default createOrder;
