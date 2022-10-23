import createProductModel from '../../model/product/createProduct.model';

/**
 * @api {put} /product 1 - Create a product
 * @apiName createProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization Token of user after signIn
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
 *
 * @apiUse Error
 */
const createProduct = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function createProduct (Controller)');
  const response = await createProductModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default createProduct;
