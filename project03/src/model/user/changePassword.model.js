import { initiateAuth, changePassword as changePass } from '../../libraries/cognito';
import { getEmailFromReq } from '../../libraries/util';

const { userPoolId: UserPoolId, userClientId: ClientId } = process.env;

const changePassword = async (req) => {
  console.log('😎 Sylitas | Triggered successful function changePassword (Model)');
  try {
    const { oldPassword: PreviousPassword, newPassword: ProposedPassword } = req.body;

    const email = getEmailFromReq(req);
    const auth = await initiateAuth({
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      UserPoolId,
      ClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: PreviousPassword,
      },
    });

    await changePass({
      AccessToken: auth.AuthenticationResult.AccessToken,
      PreviousPassword,
      ProposedPassword,
    });
    return { data: { message: 'Password had changed successfully' } };
  } catch (error) {
    const message = error.message ? error.message : 'An error occurred at accountDetail';
    return { error: { message } };
  }
};

export default changePassword;
