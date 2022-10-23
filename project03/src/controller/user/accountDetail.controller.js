import accountDetailModel from '../../model/user/accountDetail.model';

/**
 * @api {get} /user 1 - Get User information
 * @apiName accountDetail
 * @apiGroup User
 *
 * @apiHeader {String} Authorization Token of user after signIn
 *
 * @apiSuccess {String} role Role of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} userId Id of the User.
 *
 * @apiSuccessExample Success:
 *     HTTP/1.1 200 OK
 *     {
 *       "role": "admin",
 *       "email": "johnluy1999@gmail.com",
 *       "userId": "d014526a-9ffc-4083-bd2d-5d41bd8d4bef",
 *     }
 *
 * @apiError ERROR An error when get account detail.
 *
 * @apiUse Error
 */
const accountDetail = async (req, res) => {
  console.log('😎 Sylitas | Triggered successful function accountDetail (Controller)');
  const response = await accountDetailModel(req);

  if (response.error) return res.status(403).json({ message: 'Forbidden' });

  return res.status(200).json(response.data);
};

export default accountDetail;
