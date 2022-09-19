import { findOne } from './database';
import crypto from 'crypto';
import { generateToken } from '../libraries/jwt';
import { sendMail } from '../libraries/nodemailer';

const signInModel = async (requestBody) => {
  const { email, password } = requestBody;
  const realPassword = crypto.createHash('md5').update(password).digest('hex');
  const user = await findOne('users', { email, password: realPassword });
  if (user) {
    if (user.role.includes('admin')) {
      const subject = 'Enrish Skill NodeJS Project02';
      const text = 'Your email just signed in our website';
      await sendMail(email, { subject, text });
    }
    const token = generateToken(
      { userName: user._id },
      Math.floor(Date.now() / 1000) + 60 * 60
    );
    return { authorization: token };
  }
  return { error: { message: 'Unauthorized', status: 401 } };
};

export { signInModel };
