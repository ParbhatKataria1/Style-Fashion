import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DrawerExample from "../Components/Hamb";
import "../ProductDetails..css";


const ProductDetails = () => {
  const [size, setSize] = useState("");
  const [color,setColor] = useState(false);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
    console.log(size);
  };

  return (
    <div>
      <Container maxW={"7xl"} border="1px solid red">
        <DrawerExample/>
        <Flex w={"100%"}>
          <Box
            className="Multiple_Images"
            h={{ base: "100%", sm: "300px", lg: "650px" }}
            border="1px solid black"
            w={"10%"}
          ></Box>

          <Box
            className="Image"
            h={{ base: "100%", sm: "300px", lg: "650px" }}
            border="1px solid black"
            w={"40%"}
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=600"
              alt={"product image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "100%" }}
            />
          </Box>

          <Box
            className="Details"
            h={{ base: "100%", sm: "300px", lg: "650px" }}
            border="1px solid black"
            w={"50%"}
          >
            <Stack textAlign={"left"} spacing={{ base: 6, md: 10 }} ml="25px">
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "2xl" }}
                >
                  The Ritual T-shirt
                </Heading>
                <Text mt={3} mb={-10} fontWeight={500} fontSize={"xl"}>
                  ₹ {"Rs. 1,890.00"}
                </Text>
                <Text mt={10}>Tax included.</Text>
              </Box>

              <Stack
                textAlign={"left"}
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
              >
                <Text
                  alignSelf={"flex-start"}
                  border={"0px solid red"}
                  fontSize={"md"}
                  color="black"
                  fontWeight={"400"}
                >
                  20 people are viewing this right now
                </Text>

                <Text fontSize={"md"} fontWeight={"500"}>
                  Size: {size}
                </Text>
                
                <Flex border={"0px solid red"} justifyContent="space-between" maxW={"sm"} alignItems="center">
                  <label>
                    <Input
                      height={"30px"}
                      w="30px"
                      border={"1px solid black"}
                      bgColor={"white"}
                      margin="auto"
                      alignItems={"center"}
                      color="black"
                      type="checkbox"
                      value="S"
                      checked={size === "S"}
                      onChange={handleSizeChange}
                      
                    />
                    S
                  </label>
                  <label>
                    <Input
                      height={"30px"}
                      w="30px"
                      border={"1px solid black"}
                      bgColor={"white"}
                      margin="auto"
                      alignItems={"center"}
                      color="white"
                      type="checkbox"
                      value="M"
                      checked={size === "M"}
                      onChange={handleSizeChange}
                    />
                    M
                  </label>
                  <label>
                    <Input
                      height={"30px"}
                      w="30px"
                      border={"1px solid black"}
                      bgColor={"white"}
                      margin="auto"
                      alignItems={"center"}
                      color="white"
                      type="checkbox"
                      value="L"
                      checked={size === "L"}
                      onChange={handleSizeChange}
                    />
                    L
                  </label>
                  <label>
                    <Input
                      height={"30px"}
                      w="30px"
                      border={"1px solid black"}
                      bgColor={"white"}
                      margin="auto"
                      alignItems={"center"}
                      color="white"
                      type="checkbox"
                      value="XL"
                      checked={size === "XL"}
                      onChange={handleSizeChange}
                    />
                    XL
                  </label>
                </Flex>

                <Text fontSize={"md"} fontWeight={"500"}>
                  Color: Black
                </Text>
                <Flex
                  height={"40px"}
                  w="40px"
                  border={"1px solid black"}
                  rounded="full"
                >
                  <Box
                    height={"30px"}
                    w="30px"
                    border={"1px solid black"}
                    rounded="full"
                    bgColor={"black"}
                    margin="auto"
                    alignItems={"center"}
                  ></Box>
                </Flex>
              </Stack>

              <Button
                // onClick={handleAddToCart}
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("white", "gray.50")}
                color={useColorModeValue("gray.900", "gray.900")}
                border="1px solid black"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(1px)",
                  boxShadow: "lg",
                  bg: "black",
                  color: "white",
                }}
              >
                ADD TO CART
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Container>

      <Tabs width={"82%"} m="auto" mt={"20"} mb="50">
        <TabList justifyContent={"space-between"} p="0px 200px 0px 200px">
          <Tab>Product description</Tab>
          <Tab>Shipping & Return</Tab>
          <Tab>Material & Care</Tab>
        </TabList>

        <TabPanels textAlign={"left"} fontSize="13px">
          <TabPanel>
            <p>
              This is a limited edition pre-order product and will be delivered
              on or before 5th April 2023
            </p>
            <br />
            <p>
              Introducing the Ritual t-shirt, a stunning collaboration between
              our brand and the talented artist Boomrangg. This t-shirt
              represents the power of music and its ability to bring people
              together in a shared experience that transcends time and space.
              The striking design features intricate illustrations of
              instruments and symbols, creating a hypnotic and almost mystical
              effect that will surely turn heads.
            </p>
            <br />
            <p>
              Crafted from high-quality, soft and breathable cotton, this
              t-shirt is as comfortable as it is stylish. Whether you're going
              to a music festival, concert, or just hanging out with friends,
              the Ritual t-shirt is the perfect choice for any occasion. It's
              available in a range of sizes, so you can find the perfect fit for
              you.
            </p>
            <br />
            <p>
              Wear it with your favorite jeans or shorts, and you're ready to
              go. This t-shirt is more than just a piece of clothing; it's a
              statement about your love for music and your appreciation for art.
              So why wait? Order your Ritual t-shirt today and join the koovs
              cult!
            </p>
          </TabPanel>
          <TabPanel className="tabs" textAlign={"center"}>
            <p>
              <br />
              India-wide Shipping Average time: 4-6 days after the order
              confirmation.
              <br />
              <br />
              <h1>SHIPPING POLICY</h1>
              <br />
              Any product bought from https://koovs.com, will be shipped to the
              cusrtomer maximum within 4 to 6 days. In case of any exceptions,
              due to non-availability of a certain product, we will inform the
              customer through the email id provided in the customer
              registration form. If an item in your order isn’t immediately
              available in our warehouse, then please allow 1 to 2 weeks for
              your purchase to be processed. Your order may be processed in
              multiple shipments, in which case you will be notified of the
              tracking number when each shipment occurs. Any COD orders, if
              available, will be charged extra @ INR 100 Flat.
              <br />
              <br />
              <h1>RETURN/EXHANGE POLICY</h1>
              <br />
              Koovs has a flat 7 days return policy to all our customers. You
              can conveniently return or exchange any item within 7 days from
              the date of receipt of the product. To initiate return or
              exchange, mail us at care@koovs.com.
              <br />
              <br />
              <h2>
                No returns or exchange allowed for inner wear & under garments.
              </h2>
            </p>
          </TabPanel>
          <TabPanel>
            <p>Wash inside out</p>

            <p>Wash with similar colours</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProductDetails;
