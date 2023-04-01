
import razorpay from './razorpay';

const createOrder = async () => {
  const options = {
    amount: 1000, // amount in paise
    currency: 'INR',
    receipt: 'order_rcptid_11',
    payment_capture: 100,
  };
  const order = await razorpay.orders.create(options);
  return order;
}
