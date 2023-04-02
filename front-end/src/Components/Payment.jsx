import React, { useState } from "react";
import { loadScript, getRazorpayOptions } from "../Utils/razorpay";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const Payment = ({ subtotal, tax, totalPrice,cartData,text }) => {
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {


      const newData = cartData.map((e) => {
        let obj = {
          status: false,
          ...e,
          ...text,
        };
        return obj;
      });
      console.log(newData, "newData");
      for (let i = 0; i < newData.length; i++) {
        let obj = { ...newData[i] };
        delete obj._id;
        delete obj.userId;
        let data = await axios.post(
          "https://vast-raincoat-lamb.cyclic.app/order/add",
          obj,
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
            },
          }
        );
        console.log(data.data, "sent data");
        await axios.delete(
          `https://vast-raincoat-lamb.cyclic.app/cart/delete/${newData[i]._id}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_TOKEN,
            },
          }
        );
      }


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
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        w="100%"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://astrobaltics.eu/wp-content/uploads/2021/06/Mobile-payments.gif"
          alt="Caffe Latte"
        />

        <Stack w="100%">
          <CardBody w="100%">
            <Flex justifyContent="space-between">
              <Text fontSize={"21px"} fontWeight={"bold"}>
                SubTotal :
              </Text>
              <Text fontSize={"21px"} fontWeight={"bold"}>
                {subtotal}
              </Text>
            </Flex>
            <Flex w="100%" justifyContent="space-between">
              <Text fontSize={"21px"} fontWeight={"bold"}>
                Estimated Tax :
              </Text>
              <Text fontSize={"21px"} fontWeight={"bold"}>
                {tax}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize={"21px"} fontWeight={"bold"}>
                TotalPrice :
              </Text>
              <Text fontSize={"21px"} fontWeight={"bold"}>
                {totalPrice}
              </Text>
            </Flex>
          </CardBody>

          <CardFooter>
            <Button colorScheme="red" onClick={handleClick}>
              Pay Now
            </Button>
          </CardFooter>
        </Stack>
      </Card>
      {error && <p>{error.message}</p>}
    </>
  );
};

export default Payment;
