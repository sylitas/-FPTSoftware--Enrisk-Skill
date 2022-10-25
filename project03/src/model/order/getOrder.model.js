import { getOrder as getOrderDetail } from './common';

const getOrder = async (req) => {
  console.log('😎 Sylitas | Triggered successful function getOrder (Model)');
  try {
    const {
      query: { orderId },
      userInfo: { userId },
    } = req;

    const order = await getOrderDetail(userId, orderId);

    console.log('😎 Sylitas | order : ', JSON.stringify(order, null, 2));

    return { data: { order } };
  } catch (error) {
    console.error('😎 Sylitas | Error :', error);
    const message = error.message ? error.message : 'An error occurred at getOrder';
    return { error: { message } };
  }
};

export default getOrder;
