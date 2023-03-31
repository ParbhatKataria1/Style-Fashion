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
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const CartSlider = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [cartData, setcartdata] = useState([]);

  async function getdata() {
    let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/cart", {
      headers: {
        Authorization:
        process.env.TOKEN,
      },
    });
    setcartdata(data.data);
  }

  useEffect(() => {
    getdata();
  }, []);
  console.log(cartData);
  const { qty, price } = cartData;
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
              <StarIcon color={"green"} mb={1} ml={370} fontSize={20} />
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
              {/* component */}
              {cartData &&
                cartData.map((el) => {
                  return (
                    <Box key={el.id}>
                      <SideCartItem
                        image={el.images[0]}
                        title={el.title}
                        quantity={el.qty}
                        price={el.price}
                        size={el.sizes}
                        color={el.color}
                        getdata={getdata}
                      />
                    </Box>
                  );
                })}
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
                <Text fontWeight={500}> {qty * price}</Text>
              </VStack>
            </Flex>
            <Link to="/cart">
            
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
              View Cart
            </Button>
            </Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartSlider;

function SideCartItem({
  id,
  image,
  title,
  quantity,
  price,
  size,
  color,
  getData,
}) {
  const [qty, setQty] = useState(quantity);

  const handleQuantity = (val) => {
    setQty((p) => p + val);
  };

  const updateqty = async () => {
    try {
      await axios.patch(
        `https://vast-raincoat-lamb.cyclic.app/cart/update/${id}`,
        qty,
        {
          headers: {
            Authorization:
            process.env.TOKEN,
          },
        }
      );
      getData();
    } catch (error) {
      console.log("error in update qty");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://vast-raincoat-lamb.cyclic.app/cart/delete/${id}`,
        {
          headers: {
            Authorization:
            process.env.TOKEN,
          },
        }
      );
      getData();
    } catch (error) {
      console.log("error in delete");
    }
  };

  useEffect(() => {
    updateqty();
  }, [qty]);

  return (
    <Flex gap={2} width={"100%"} border="0px solid black" h={"150px"}>
      <Box w={"30%"}>
        <Image width={"94%"} src={image} />
      </Box>
      <Box w="70%" border="0px solid black" lineHeight={6}>
        <Heading fontSize={14}>{title}</Heading>
        <HStack>
          <Heading fontSize={14}>Size:</Heading>
          <Text fontWeight={500} fontSize={12}>
            {size}
          </Text>
        </HStack>
        <HStack>
          <Heading fontSize={14}>Color:</Heading>
          <Text fontWeight={500} fontSize={12}>
            {color}
          </Text>
        </HStack>
        <Text fontWeight={400} fontSize={16}>
          {price}
        </Text>

        <HStack mt={2}>
          <Button
            size={"sm"}
            isDisabled={qty == 1}
            onClick={() => handleQuantity(-1)}
          >
            -
          </Button>
          <Button size={"sm"}>{qty}</Button>
          <Button
            size={"sm"}
            isDisabled={quantity == 10}
            onClick={() => handleQuantity(1)}
          >
            +
          </Button>

          <Text
            onClick={handleDelete}
            fontSize={15}
            cursor="pointer"
            textDecoration={"underline"}
          >
            Remove
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
}
