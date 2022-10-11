import editProductModel from '../../model/product/editProduct.model';

const editProduct = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function editProduct (Controller)');
  const response = await editProductModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default editProduct;
