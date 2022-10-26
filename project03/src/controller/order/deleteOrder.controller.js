import deleteOrderModel from '../../model/order/deleteOrder.model';

/**
 * @api {put} /order 4 - Delete a order
 * @apiName deleteOrder
 * @apiGroup Order
 *
 * @apiDescription This endpoint can only be use when the order is paid
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiQuery {String} orderId Id of order
 *
 * @apiSuccess {String} message this is notification
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *   {
 *     "message":"Deleted order successfully"
 *   }
 *
 * @apiUse Error
 */
const deleteOrder = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function deleteOrder (Controller)');
  const response = await deleteOrderModel(req);

  if (response.error) if (response.error) return res.status(403).json({ message: 'The order must be paid first' });

  return res.status(200).json(response.data);
};

export default deleteOrder;
