import deleteOrderModel from '../../model/order/deleteOrder.model';

/**
 * @api {delete} /product 4 - Delete a product
 * @apiName deleteProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiQuery {String} productId Id of product
 *
 * @apiSuccess {String} message A message contain notification.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Product deleted"
 *     }
 *
 *
 * @apiUse Error
 */
const deleteOrder = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function deleteOrder (Controller)');
  const response = await deleteOrderModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default deleteOrder;
