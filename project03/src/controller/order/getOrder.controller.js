import getOrderModel from '../../model/order/getOrder.model';

/**
 * @api {put} /order 2 - Get a order
 * @apiName getOrder
 * @apiGroup Order
 *
 * @apiDescription This endpoint can only be use when the order is paid
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiQuery {String} orderId Id of order
 *
 * @apiSuccess {String} order order's information
 * @apiSuccess {String} order.productOwnerIds The Id of productOwner
 * @apiSuccess {String} order.currency currency of payment
 * @apiSuccess {String} order.totalPrice Total of price client need to pay all product in order
 * @apiSuccess {String} order.products products information.
 * @apiSuccess {String} order.userId client id
 * @apiSuccess {String} order.updatedAt Time the order has been updated
 * @apiSuccess {String} order.orderId Id of the order
 * @apiSuccess {String} order.status status of payment
 * @apiSuccess {String} order.createdAt Time the order has been created
 * @apiSuccess {String} order.referenceTag The tag for refer the other product for client
 * @apiSuccess {String} order.deliverStatus the deliver status
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *   {
 *     "order": {
 *       "productOwnerIds": ["d014526a-9ffc-4083-bd2d-5d41bd8d4bef"],
 *       "currency": "VND",
 *       "totalPrice": 120000000,
 *       "products": [
 *         {
 *           "productId": "e33d3ec6-7838-4a4d-8cd7-2b94ef3bfb4a",
 *           "amount": 2
 *         },
 *         {
 *           "productId": "a26391ee-1843-43d3-96e6-e10916a4a2d4",
 *           "amount": 2
 *         }
 *       ],
 *       "userId": "d014526a-9ffc-4083-bd2d-5d41bd8d4bef",
 *       "updatedAt": "2022-10-25T23:23:48.348Z",
 *       "orderId": "3100012d-c187-4b31-9435-9e38c7b7a3e6",
 *       "status": "PENDING",
 *       "createdAt": "2022-10-25T23:18:48.071Z",
 *       "referenceTag": ["electronics"],
 *       "deliverStatus": "NONE"
 *     }
 *   }
 *
 * @apiUse Error
 */
const getOrder = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function getOrder (Controller)');
  const response = await getOrderModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default getOrder;
