const RAZORPAY_API_KEY = 'rzp_test_Y2m091ztDwGT0P';

export const loadScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(window.Razorpay);
    };
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay SDK'));
    };
    document.body.appendChild(script);
  });
};

export const getRazorpayOptions = () => {
  return {
    key: RAZORPAY_API_KEY,
    amount: 100,
    currency: 'INR',
    name: 'Koovs Payment App',
    description: 'Payment for final order',
    image: 'https://via.placeholder.com/150',
    handler: function (response) {
      console.log(response);
    },
    prefill: {
      name: 'Navneet Burman',
      email: 'navneetburman900@example.com',
      contact: '8617555572',
    },
    notes: {
      address: 'Demo Address',
    },
  };
};
