import validateEmail from '../libraries/deep-email-validator';
import { signUpModel } from '../models/signUp.model';

const signUp = async (req, res, next) => {
  const requestBody = req.body;

  const isValidEmail = await validateEmail(requestBody.email);
  if (isValidEmail) {
    const result = await signUpModel(requestBody);
    if (result.error) {
      const { status, message } = result.error;
      return res.status(status).json({ message });
    }
    res.status(200).json({ message: result.message });
  } else {
    res.status(422).json({ message: 'Your email is invalid' });
  }
};
export default signUp;
