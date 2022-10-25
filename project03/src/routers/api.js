export default {
  /**
   * Name-of-function : { endpoint: /path/to/api, method: 'POST/PUT/GET/DELETE/...'}
   */

  // management user
  accountDetail: {
    endpoint: '/user',
    method: 'GET',
    schema: '',
    isCheckRole: ['admin', 'customer', 'product_owner'],
  },
  changePassword: {
    endpoint: '/user',
    method: 'POST',
    schema: 'user/changePassword',
    isCheckRole: ['admin', 'customer', 'product_owner'],
  },
  // management product
  createProduct: {
    endpoint: '/product',
    method: 'PUT',
    schema: 'product/createProduct',
    isCheckRole: ['admin', 'product_owner'],
  },
  editProduct: {
    endpoint: '/product',
    method: 'POST',
    schema: 'product/editProduct',
    isCheckRole: ['admin', 'product_owner'],
  },
  deleteProduct: {
    endpoint: '/product',
    method: 'DELETE',
    schema: 'product/deleteProduct',
    isCheckRole: ['admin', 'product_owner'],
  },
  getProduct: {
    endpoint: '/product',
    method: 'GET',
    schema: 'product/getProduct',
    isCheckRole: ['admin', 'product_owner'],
  },
  // management order
  createOrder: {
    endpoint: '/order',
    method: 'PUT',
    schema: 'order/createOrder',
    isCheckRole: ['admin', 'customer'],
  },
  editOrder: {
    endpoint: '/order',
    method: 'POST',
    schema: 'order/editOrder',
    isCheckRole: ['admin', 'customer'],
  },
  deleteOrder: {
    endpoint: '/order',
    method: 'DELETE',
    schema: 'order/deleteOrder',
    isCheckRole: ['admin', 'customer'],
  },
  getOrder: {
    endpoint: '/order',
    method: 'GET',
    schema: 'order/getOrder',
    isCheckRole: ['admin', 'customer'],
  },
};
