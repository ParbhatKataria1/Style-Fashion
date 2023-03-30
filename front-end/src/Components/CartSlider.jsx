import { StarIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorModeValue,
  Text,
  Box,
  Flex,
  VStack,
  Image,
  HStack,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CartSlider = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (val) => {
    setQuantity((p) => p + val);
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
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
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"2xl"}>Shopping Cart</DrawerHeader>

          <DrawerBody>
            
            <Slider
              aria-label="slider-ex-10"
              colorScheme="green"
              defaultValue={100}
            >
              <StarIcon color={"green"} mb={1} ml={370}  fontSize={20} />
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            
            <Text>Congrats! You are eligible for FREE Shipping</Text>
            <Box
              overflowX="auto"
              mt={5}
              border="0px solid black"
              maxW="7xl"
              h={"400px"}
            >
              <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
                <Box w={"30%"}>
                  <Image
                    width={"94%"}
                    src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=352"
                  />
                </Box>
                <Box w="70%" border="0px solid black" lineHeight={6}>
                  <Heading fontSize={14}>The Ritual T-shirt</Heading>
                  <HStack>
                    <Heading fontSize={14}>Size:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      S
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={14}>Color:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      Black
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={16}>
                    Rs. 1,490.00
                  </Text>

                  <HStack mt={2}>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 1}
                      onClick={() => handleQuantity(-1)}
                    >
                      -
                    </Button>
                    <Button size={"sm"}>{quantity}</Button>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 10}
                      onClick={() => handleQuantity(1)}
                    >
                      +
                    </Button>

                    <Text
                      fontSize={15}
                      cursor="pointer"
                      textDecoration={"underline"}
                    >
                      Remove
                    </Text>
                  </HStack>
                </Box>
              </Flex>

              <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
                <Box w={"30%"}>
                  <Image
                    width={"94%"}
                    src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=352"
                  />
                </Box>
                <Box w="70%" border="0px solid black" lineHeight={6}>
                  <Heading fontSize={14}>The Ritual T-shirt</Heading>
                  <HStack>
                    <Heading fontSize={14}>Size:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      S
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={14}>Color:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      Black
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={16}>
                    Rs. 1,490.00
                  </Text>

                  <HStack mt={2}>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 1}
                      onClick={() => handleQuantity(-1)}
                    >
                      -
                    </Button>
                    <Button size={"sm"}>{quantity}</Button>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 10}
                      onClick={() => handleQuantity(1)}
                    >
                      +
                    </Button>

                    <Text
                      fontSize={15}
                      cursor="pointer"
                      textDecoration={"underline"}
                    >
                      Remove
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
                <Box w={"30%"}>
                  <Image
                    width={"94%"}
                    src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=352"
                  />
                </Box>
                <Box w="70%" border="0px solid black" lineHeight={6}>
                  <Heading fontSize={14}>The Ritual T-shirt</Heading>
                  <HStack>
                    <Heading fontSize={14}>Size:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      S
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={14}>Color:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      Black
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={16}>
                    Rs. 1,490.00
                  </Text>

                  <HStack mt={2}>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 1}
                      onClick={() => handleQuantity(-1)}
                    >
                      -
                    </Button>
                    <Button size={"sm"}>{quantity}</Button>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 10}
                      onClick={() => handleQuantity(1)}
                    >
                      +
                    </Button>

                    <Text
                      fontSize={15}
                      cursor="pointer"
                      textDecoration={"underline"}
                    >
                      Remove
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
                <Box w={"30%"}>
                  <Image
                    width={"94%"}
                    src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=352"
                  />
                </Box>
                <Box w="70%" border="0px solid black" lineHeight={6}>
                  <Heading fontSize={14}>The Ritual T-shirt</Heading>
                  <HStack>
                    <Heading fontSize={14}>Size:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      S
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={14}>Color:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      Black
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={16}>
                    Rs. 1,490.00
                  </Text>

                  <HStack mt={2}>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 1}
                      onClick={() => handleQuantity(-1)}
                    >
                      -
                    </Button>
                    <Button size={"sm"}>{quantity}</Button>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 10}
                      onClick={() => handleQuantity(1)}
                    >
                      +
                    </Button>

                    <Text
                      fontSize={15}
                      cursor="pointer"
                      textDecoration={"underline"}
                    >
                      Remove
                    </Text>
                  </HStack>
                </Box>
              </Flex>
              <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
                <Box w={"30%"}>
                  <Image
                    width={"94%"}
                    src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/ritual3.jpg?v=1679580399&width=352"
                  />
                </Box>
                <Box w="70%" border="0px solid black" lineHeight={6}>
                  <Heading fontSize={14}>The Ritual T-shirt</Heading>
                  <HStack>
                    <Heading fontSize={14}>Size:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      S
                    </Text>
                  </HStack>
                  <HStack>
                    <Heading fontSize={14}>Color:</Heading>
                    <Text fontWeight={500} fontSize={12}>
                      Black
                    </Text>
                  </HStack>
                  <Text fontWeight={400} fontSize={16}>
                    Rs. 1,490.00
                  </Text>

                  <HStack mt={2}>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 1}
                      onClick={() => handleQuantity(-1)}
                    >
                      -
                    </Button>
                    <Button size={"sm"}>{quantity}</Button>
                    <Button
                      size={"sm"}
                      isDisabled={quantity == 10}
                      onClick={() => handleQuantity(1)}
                    >
                      +
                    </Button>

                    <Text
                      fontSize={15}
                      cursor="pointer"
                      textDecoration={"underline"}
                    >
                      Remove
                    </Text>
                  </HStack>
                </Box>
              </Flex>
            </Box>
            <Flex mt={5} justifyContent="space-between">
              <VStack>
                <Text>Shipping:</Text>
                <Text fontWeight={500} fontSize={19}>
                  Subtotal
                </Text>
              </VStack>
              <VStack>
                <Text>FREE</Text>
                <Text fontWeight={500}>Rs. 32,960.00</Text>
              </VStack>
            </Flex>
            <Button
              rounded={"none"}
              w={"full"}
              mt={4}
              size={"md"}
              py={"7"}
              bg={"black"}
              color={"white"}
              border="1px solid black"
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(1px)",
              }}
            >
              Place Order
            </Button>
            <Text
              _hover={{ cursor: "pointer" }}
              textAlign={"center"}
              mt={5}
              textDecoration="underline"
            >
              View Cart
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartSlider;
