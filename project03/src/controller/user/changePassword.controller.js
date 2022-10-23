import changePasswordModel from '../../model/user/changePassword.model';

/**
 * @api {post} /user 2 - Change account password
 * @apiName changPassword
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiBody {String} oldPassword Old password
 * @apiBody {String} newPassword New password
 *
 * @apiSuccess {String} message A message contain notification.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password had changed successfully",
 *     }
 *
 * @apiUse Error
 */
const changePassword = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function changePassword');
  const response = await changePasswordModel(req);
  console.log('😎 Sylitas | response : ', response);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default changePassword;
