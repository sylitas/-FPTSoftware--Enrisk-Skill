import { signInModel } from '../models/signIn.model';

const signIn = async (req, res, next) => {
  const requestBody = req.body;
  const result = await signInModel(requestBody);
  if (result.error) {
    const { status, message } = result.error;
    return res.status(status).json({ message });
  }
  res.status(200).json(result);
};
export default signIn;
