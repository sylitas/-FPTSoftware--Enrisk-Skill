import getOrderModel from '../../model/order/getOrder.model';

/**
 * @api {get} /product 3 - Get products
 * @apiName getProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiQuery {String} [productIds] Multiple Id of products
 * @apiQuery {String} [fields] Fields that you want to get
 * @apiQuery {Number} [limit] limit limit of products
 * @apiQuery {String} [paginateToken] Token for paginate
 *
 * @apiSuccess {String} products List of products.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *        "products": [
 *              {
 *                  "userId": "d014526a-9ffc-4083-bd2d-5d41bd8d4bef",
 *                  "updatedAt": "2022-10-23T07:53:54.060Z",
 *                  "status": "CREATED",
 *                  "productInfo": {
 *                      "name": "Iphone 14 promax 256GB"
 *                  },
 *                  "createdAt": "2022-10-23T07:53:47.158Z",
 *                  "amount": 100,
 *                  "tag": "electronics",
 *                  "price": 30000000,
 *                  "productId": "355efcd1-791f-44d8-b1a7-0081f0f1cfca"
 *              },
 *              {
 *                  "userId": "d014526a-9ffc-4083-bd2d-5d41bd8d4bef",
 *                  "updatedAt": "",
 *                  "status": "CREATED",
 *                  "productInfo": {
 *                      "name": "Iphone 14 promax 128GB"
 *                  },
 *                  "createdAt": "2022-10-23T07:45:09.988Z",
 *                  "amount": 100,
 *                  "tag": "electronics",
 *                  "price": 30000000,
 *                  "productId": "e33d3ec6-7838-4a4d-8cd7-2b94ef3bfb4a"
 *              },
 *       ],
 *       "paginateToken": ""
 *    }
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
