import accountDetail from './user/accountDetail.controller';
import changePassword from './user/changePassword.controller';

import createProduct from './product/createProduct.controller';
import editProduct from './product/editProduct.controller';
import deleteProduct from './product/deleteProduct.controller';
import getProduct from './product/getProduct.controller';

import createOrder from './order/createOrder.controller';
import editOrder from './order/editOrder.controller';
import deleteOrder from './order/deleteOrder.controller';
import getOrder from './order/getOrder.controller';

export default {
  // user
  accountDetail,
  changePassword,
  // product
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  // order
  createOrder,
  editOrder,
  deleteOrder,
  getOrder,
};
