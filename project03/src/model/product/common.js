import accountDetail from '../user/accountDetail.model';

export const getAccountDetailByRequest = async (req) => {
  const res = await accountDetail(req);
  if (res.error) return res.error;
  return res.data;
};
