import editOrderModel from '../../model/order/editOrder.model';

/**
 * @api {post} /product 2 - Edit a product
 * @apiName editProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiQuery {String} productId Id of product
 *
 * @apiBody {String = "books", "housewares", "electronics", "others"} tag Type of product
 * @apiBody {Number} price price of product (VND)
 * @apiBody {Number} amount amount of product
 * @apiBody {Object} productInfo Information of product
 * @apiBody {String} productInfo.name Name of product
 * @apiBody {String} [productInfo.size] Size of product (clothes)
 *
 * @apiSuccess {String} productId Id of product
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *         "productId": "355efcd1-791f-44d8-b1a7-0081f0f1cfca"
 *     }
 *
 * @apiUse Error
 */
const editOrder = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function editOrder (Controller)');
  const response = await editOrderModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default editOrder;
