import { StarIcon } from "@chakra-ui/icons";
import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useColorModeValue, Text, Box, Flex, VStack, Image, HStack, Heading, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartItem } from "../Redux/ProductReducer.js/action";

const CartSlider = ({ changeState }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const [cartData, setcartdata] = useState([]);

      const cartItem = useSelector((store) => {
            // console.log("MENS PRODUCT", store.productReducer);
            return store?.productReducer?.cartItem;
          });


    async function getdata() {
        let data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
            headers: {
                Authorization: process.env.REACT_APP_TOKEN,
            },
        });
        setcartdata(data.data);
        //

    }

    useEffect(() => {
        getdata();
    }, [cartItem]);
    console.log(cartData);
    let price = 0;
    if(Array.isArray(cartData))
        for(let i =0; i<cartData.length;i++){
            let curr = cartData[0];
            price += curr?.['price']*curr?.['qty'];
        }


    console.log('cartData', cartData)

    return (
        <>
            <Button
                ref={btnRef}
                onClick={() => {
                    onOpen();
                    changeState();
                }}
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
                View Cart Summery
            </Button>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size={"sm"}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize={"2xl"}>Shopping Cart</DrawerHeader>

                    <DrawerBody>
                        <Slider aria-label="slider-ex-10" colorScheme="green" defaultValue={100}>
                            <StarIcon color={"green"} mb={1} ml={370} fontSize={20} />
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>

                        <Text>Congrats! You are eligible for FREE Shipping</Text>
                        <Box overflowX="auto" mt={5} border="0px solid black" maxW="7xl" h={"400px"}>
                            {/* component */}
                            {cartData &&
                                cartData.map((el) => {
                                    return (
                                        <Box key={el._id}>
                                            <SideCartItem id={el._id} image={el.images[0]} title={el.title} quantity={el.qty} price={el.price} size={el.sizes} color={el.color} getData={getdata} />
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
                                
                                <Text fontWeight={500}> {price}</Text>
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

function SideCartItem({ id, image, title, quantity, price, size, color, getData }) {
    const [qty, setQty] = useState(quantity);

    const handleQuantity = (val) => {
        setQty((p) => p + val);
    };
    const dispatch = useDispatch();
    const updateqty = async () => {
        try {
            await axios.patch(`${process.env.REACT_APP_BACKEND_API}/cart/update/${id}`,  { qty: +qty }, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            await getData();
        } catch (error) {
            console.log("error in update qty");
        } finally{
             dispatch(cartItem(Math.random()));
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_API}/cart/delete/${id}`, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            await getData();
        } catch (error) {
            console.log("error in delete", error);
        } finally{
             dispatch(cartItem(Math.random()));
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
                    <Button size={"sm"} isDisabled={qty == 1} onClick={() => handleQuantity(-1)}>
                        -
                    </Button>
                    <Button size={"sm"}>{qty}</Button>
                    <Button size={"sm"} isDisabled={quantity == 10} onClick={() => handleQuantity(1)}>
                        +
                    </Button>

                    <Text onClick={handleDelete} fontSize={15} cursor="pointer" textDecoration={"underline"}>
                        Remove
                    </Text>
                </HStack>
            </Box>
        </Flex>
    );
}
