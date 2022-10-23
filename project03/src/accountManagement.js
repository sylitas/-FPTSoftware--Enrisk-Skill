import { v4 as uuidv4 } from 'uuid';
import {
  createUser,
  setUserPassword,
  initiateAuth,
  forgotPassword as sendRecoverCodeToEmail,
  confirmForgotPassword,
} from './libraries/cognito';
import { sendEmail } from './libraries/ses';
import { put } from './libraries/dynamoDB';
import { sendResponse } from './libraries/util';
import { DYNAMO_DB } from './libraries/const';
import { validation } from './libraries/ajv';
import signInSchema from './schema/accountManagement/signIn.schema.json';
import signUpSchema from './schema/accountManagement/signUp.schema.json';
import forgotPasswordSchema from './schema/accountManagement/forgotPassword.schema.json';
import confirmPasswordSchema from './schema/accountManagement/confirmPassword.schema.json';

const { userPoolId: UserPoolId, userClientId: ClientId } = process.env;

/**
 * @api {post} /signIn 1 - Sign in your account
 * @apiName signIn
 * @apiGroup Account
 *
 * @apiBody {String} email Email of user.
 * @apiBody {String} password Password of user.
 *
 * @apiSuccess {String} token This token use as Authorization for all request's Headers
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "eyJraWQiOiJwVFBmRUtsSk8wOUQ2WjArTk9L0Klz7ABzP0WZqYCuvKAVlr6fkjl_KJ6V5bXh3ThxiPqPyQgxrg...",
 *     }
 *
 * @apiUse Error
 */
const signIn = async (event) => {
  console.log('😎 Sylitas | signIn triggered');
  try {
    const { isVerified } = validation({ schema: signInSchema, data: event.body });
    if (!isVerified) return { error: { message: 'Invalid input' } };

    const { email, password } = event.body;
    const params = {
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId,
      ClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const response = await initiateAuth(params);

    return {
      data: {
        token: response.AuthenticationResult.IdToken,
      },
    };
  } catch (error) {
    const message = error.message ? error.message : 'Internal server error';

    return { error: { message } };
  }
};

/**
 * @api {post} /signUp 2 - Register your account
 * @apiName signUp
 * @apiGroup Account
 *
 * @apiBody {String} email Email of user.
 * @apiBody {String} password Password of user.
 *
 * @apiSuccess {String} message Message contains notification.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User registration successful",
 *     }
 *
 * @apiUse Error
 */
const signUp = async (event) => {
  console.log('😎 Sylitas | signUp triggered');
  try {
    const { isVerified } = validation({ schema: signUpSchema, data: event.body });
    if (!isVerified) return { error: { message: 'Invalid input' } };

    const { email, password } = event.body;
    const params = {
      UserPoolId,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
      ],
      MessageAction: 'SUPPRESS',
    };
    const response = await createUser(params);
    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId,
        Username: email,
        Permanent: true,
      };
      await Promise.allSettled([
        setUserPassword(paramsForSetPass),
        put({
          TableName: DYNAMO_DB.TABLE.USERS_TABLE.NAME,
          Item: {
            userId: uuidv4(),
            email,
            createdAt: new Date().toISOString(),
            role: 'customer',
          },
        }),
        sendEmail({
          to: email,
          from: 'shoppingTime.fpt@gmail.com',
          subject: 'Welcome to our shop',
          text: `Congratulation, your email ${email} just registered successfully to our shop!`,
        }),
      ]);
    }

    return { data: { message: 'User registration successful' } };
  } catch (error) {
    const message = error.message ? error.message : 'An error occurred at signUp';

    return { error: { message } };
  }
};

/**
 * @api {post} /forgotPassword 3 - Find your password
 * @apiName forgotPassword
 * @apiGroup Account
 *
 * @apiBody {String} email Email of user.
 *
 * @apiSuccess {String} message Message contains notification.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "The verify email just sent to your mailbox",
 *     }
 *
 * @apiUse Error
 */
const forgotPassword = async (event) => {
  console.log('😎 Sylitas | forgotPassword triggered');
  try {
    const { isVerified } = validation({ schema: forgotPasswordSchema, data: event.body });
    if (!isVerified) return { error: { message: 'Invalid input' } };
    const { email: Username } = event.body;
    await sendRecoverCodeToEmail({ ClientId, Username });

    return { data: { message: 'The verify email just sent to your mailbox' } };
  } catch (error) {
    const message = error.message ? error.message : 'An error occurred at forgotPassword';

    return { error: { message } };
  }
};

/**
 * @api {post} /confirmPassword 4 - Verify forgot password
 * @apiName confirmPassword
 * @apiGroup Account
 *
 * @apiBody {String} email Email of user.
 * @apiBody {String} code Code you can receive from email after forgotPassword.
 * @apiBody {String} newPassword Password of user.
 *
 * @apiSuccess {String} message Message contains notification.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Your new password just updated successful",
 *     }
 *
 * @apiUse Error
 */
const confirmPassword = async (event) => {
  console.log('😎 Sylitas | confirmPassword triggered');
  try {
    const { isVerified } = validation({ schema: confirmPasswordSchema, data: event.body });
    if (!isVerified) return { error: { message: 'Invalid input' } };
    const { email: Username, code: ConfirmationCode, newPassword: Password } = event.body;
    await confirmForgotPassword({
      ClientId,
      ConfirmationCode,
      Password,
      Username,
    });

    return { data: { message: 'Your new password just updated successful' } };
  } catch (error) {
    const message = error.message ? error.message : 'An error occurred at confirmPassword';

    return { error: { message } };
  }
};

const managementList = { signIn, signUp, forgotPassword, confirmPassword };

export const handler = async (event) => {
  const funcName = event.path.replace('/', '');
  const accountManagementType = Object.prototype.hasOwnProperty.call(managementList, funcName) ? funcName : 'default';

  if (accountManagementType === 'default') {
    return sendResponse(403, { message: 'Forbidden' });
  }
  event.body = JSON.parse(event.body);
  const response = await managementList[accountManagementType](event);
  let responseParams = [200, response.data];

  if (response.error) {
    responseParams = [500, response.error.message ? response.error : { message: 'Internal server error' }];
  }

  return sendResponse(...responseParams);
};
