import createOrderModel from '../../model/order/createOrder.model';

/**
 * @api {put} /order 1 - Create a order
 * @apiName createOrder
 * @apiGroup Order
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiParamExample {json} sample request
 *      {
 *        "orderDetail": [
 *           "productId":"",
 *           "amount": 1
 *        ]
 *      }
 *
 * @apiBody {Array} orderDetail the information of order.
 * @apiBody {Object} orderDetail[productInfo] The information of product.
 * @apiBody {String} productInfo.productId productId the id of product.
 * @apiBody {Number} productInfo.amount amount the amount of product.
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
const createOrder = async (req, res) => {
  console.log('???? Sylitas | Triggered successful function createOrder (Controller)');
  const response = await createOrderModel(req);

  if (response.error) if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default createOrder;
