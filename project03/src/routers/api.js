export default {
  /**
   * Name-of-function : { endpoint: /path/to/api, method: 'POST/PUT/GET/DELETE/...'}
   */

  // management user
  accountDetail: { endpoint: '/user', method: 'GET', schema: '', isCheckRole: true },
  changePassword: { endpoint: '/user', method: 'POST', schema: '', isCheckRole: true },
  // management product
  createProduct: { endpoint: '/product', method: 'PUT', schema: '', isCheckRole: true },
  editProduct: { endpoint: '/product', method: 'POST', schema: '', isCheckRole: true },
  deleteProduct: { endpoint: '/product', method: 'DELETE', schema: '', isCheckRole: true },
  getProduct: { endpoint: '/product', method: 'GET', schema: '', isCheckRole: true },
  // management order
  createOrder: { endpoint: '/order', method: 'PUT', schema: '', isCheckRole: true },
  editOrder: { endpoint: '/order', method: 'POST', schema: '', isCheckRole: true },
  deleteOrder: { endpoint: '/order', method: 'DELETE', schema: '', isCheckRole: true },
  getOrder: { endpoint: '/order', method: 'GET', schema: '', isCheckRole: true },
};
