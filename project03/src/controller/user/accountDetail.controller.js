import accountDetailModel from '../../model/user/accountDetail.model';

const accountDetail = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function accountDetail (Controller)');
  const response = await accountDetailModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default accountDetail;
