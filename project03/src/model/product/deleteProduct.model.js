// import { DYNAMO_DB } from '../../libraries/const';
// import { query } from '../../libraries/dynamoDB';
// import { getEmailFromReq } from '../../libraries/util';

const deleteProduct = async () => {
  console.log('😎 Sylitas | Triggered successful function deleteProduct (Model)');
  return { data: { message: 'deleteProduct is triggered' } };
  // try {

  // } catch (error) {
  //   const message = error.message ? error.message : 'An error occurred at deleteProduct';
  //   return { error: { message } };
  // }
};

export default deleteProduct;
