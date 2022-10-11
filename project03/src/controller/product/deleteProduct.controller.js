import deleteProductModel from '../../model/product/deleteProduct.model';

const deleteProduct = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function deleteProduct (Controller)');
  const response = await deleteProductModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default deleteProduct;
