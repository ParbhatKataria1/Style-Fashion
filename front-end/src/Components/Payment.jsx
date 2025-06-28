import  { useState } from "react";
import { loadScript, getRazorpayOptions } from "../Utils/razorpay";
import {
  Button,
} from "@chakra-ui/react";

const Payment = ({ subtotal, tax, totalPrice, cartData, text }) => {
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      // const newData = cartData.map((e) => {
      //   let obj = {
      //     status: false,
      //     ...e,
      //     ...text,
      //   };
      //   return obj;
      // });
      // console.log(newData, "newData");
      // for (let i = 0; i < newData.length; i++) {
      //   let obj = { ...newData[i] };
      //   delete obj._id;
      //   delete obj.userId;
      //   let data = await axios.post(
      //     "https://vast-raincoat-lamb.cyclic.app/order/add",
      //     obj,
      //     {
      //       headers: {
      //         Authorization: process.env.REACT_APP_TOKEN,
      //       },
      //     }
      //   );
      //   console.log(data.data, "sent data");
      //   await axios.delete(
      //     `https://vast-raincoat-lamb.cyclic.app/cart/delete/${newData[i]._id}`,
      //     {
      //       headers: {
      //         Authorization: process.env.REACT_APP_TOKEN,
      //       },
      //     }
      //   );
      // }

      const Razorpay = await loadScript();
      const options = getRazorpayOptions();
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Button w="100%" colorScheme="red" onClick={handleClick}>
        Pay Now
      </Button>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Payment;
