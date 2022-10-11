const accountDetail = async (req) => {
  console.log('😎 Sylitas | Triggered successful function accountDetail (Model)');
  return { data: req.userInfo };
};

export default accountDetail;
