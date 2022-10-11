export const sendResponse = (statusCode, body) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
  return response;
};

export const parseJwt = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

export const getEmailFromReq = (req) => parseJwt(req.headers.authorization).email;
