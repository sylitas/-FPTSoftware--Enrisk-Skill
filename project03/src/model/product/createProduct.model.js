// import { DYNAMO_DB } from '../../libraries/const';
// import { query } from '../../libraries/dynamoDB';
// import { getEmailFromReq } from '../../libraries/util';
import { getAccountDetailByRequest } from './common';
const createProduct = async (req) => {
  console.log('😎 Sylitas | Triggered successful function createProduct (Model)');

  const userInfo = await getAccountDetailByRequest(req);
  console.log('😎 Sylitas | userInfo : ', userInfo);
  return { data: { message: 'createProduct is triggered' } };
  // try {

  // } catch (error) {
  //   const message = error.message ? error.message : 'An error occurred at createProduct';
  //   return { error: { message } };
  // }
};

export default createProduct;
