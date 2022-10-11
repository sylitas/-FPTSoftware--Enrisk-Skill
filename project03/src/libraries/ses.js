import AWS from 'aws-sdk';

const ses = new AWS.SES();

export const sendEmail = async ({ to, from, subject, text }) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: { Data: subject },
      Body: {
        Text: { Data: text },
      },
    },
    Source: from,
  };
  await ses.sendEmail(params).promise();
};
