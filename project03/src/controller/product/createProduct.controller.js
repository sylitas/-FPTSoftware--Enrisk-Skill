import createProductModel from '../../model/product/createProduct.model';

const createProduct = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function createProduct (Controller)');
  const response = await createProductModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default createProduct;
