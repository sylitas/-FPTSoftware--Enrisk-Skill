import getProductModel from '../../model/product/getProduct.model';

const getProduct = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function getProduct (Controller)');
  const response = await getProductModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default getProduct;
