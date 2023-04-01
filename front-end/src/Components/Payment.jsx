import React, { useState } from 'react';
import { loadScript, getRazorpayOptions } from '../Utils/razorpay';

const Payment = () => {
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const Razorpay = await loadScript();
      const options = getRazorpayOptions();
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
      setPayment(razorpayInstance);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Pay Now</button>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Payment;
