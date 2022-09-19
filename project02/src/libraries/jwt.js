import jwt from 'jsonwebtoken';

const secret = process.env.SecretKey;

const generateToken = (data, timeExpire) => {
  const exp = timeExpire;
  const token = jwt.sign({ exp, data }, secret);
  return token;
};

export { generateToken };
