import { v4 as uuidv4 } from 'uuid';
import { findOne, insertOne } from './database';
import crypto from 'crypto';

const signUpModel = async (requestBody) => {
  const { email, password } = requestBody;
  const user = await findOne('users', { email });
  if (user) {
    return { error: { message: 'User is already existed!', status: 400 } };
  }
  const userInfo = {
    _id: uuidv4(),
    email,
    password: crypto.createHash('md5').update(password).digest('hex'),
    role: ['member'],
  };
  await insertOne('users', userInfo);
  return { message: 'User signed up successfully!' };
};

export { signUpModel };
