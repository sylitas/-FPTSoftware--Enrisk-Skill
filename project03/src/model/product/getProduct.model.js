// import { DYNAMO_DB } from '../../libraries/const';
// import { query } from '../../libraries/dynamoDB';
// import { getEmailFromReq } from '../../libraries/util';

const getProduct = async () => {
  console.log('😎 Sylitas | Triggered successful function getProduct (Model)');
  return { data: { message: 'getProduct is triggered' } };
  // try {

  // } catch (error) {
  //   const message = error.message ? error.message : 'An error occurred at getProduct';
  //   return { error: { message } };
  // }
};

export default getProduct;
