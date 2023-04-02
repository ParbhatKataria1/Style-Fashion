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

const Payment = ({ subtotal, tax, totalPrice }) => {
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
