import changePasswordModel from '../../model/user/changePassword.model';

const changePassword = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function changePassword');
  const response = await changePasswordModel(req);
  console.log('😎 Sylitas | response : ', response);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default changePassword;
