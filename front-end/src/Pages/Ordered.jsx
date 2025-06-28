import { Box, Flex, Grid, GridItem, Image, Select, Switch, Text, useColorModeValue } from "@chakra-ui/react";
import AdminSidePage from "../Components/AdminSidePage";
import { ProductCard } from "../Components/ProductItemAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Ordered = () => {
    return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
    let [order, setorder] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const sortParam = searchParams.get("sort");
    const [sort, setsort] = useState(sortParam);

    const typeParam = searchParams.get("type");
    const [type, settype] = useState(typeParam);

    async function getOrderData() {
        try {
            let data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/allorder`, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            data = data.data;
            data = data.filter((el) => {
                return el.status;
            });
            console.log(data, "data");
            setorder(data);
        } catch (error) {
            console.log("error in fetching the data");
        }
    }
    useEffect(() => {
        let obj = {};
        if (sort) obj.sort = sort;
        if (type) obj.type = type;
        setSearchParams(obj);
        getOrderData();
    }, [sort, type]);
    console.log(order, "order");

    if (sort) {
        let data;
        if (sort == "asc")
            data = order.sort(function (a, b) {
                return +a.price - +b.price;
            });
        if (sort == "desc")
            data = order.sort(function (a, b) {
                return +b.price - +a.price;
            });
        order = data;
    }
    if (type) {
        let data = order.filter((el) => {
            return el.type == type;
        });
        order = data;
    }
    return (
        <Box>
            <Box w="100%" bg="white" m="auto">
                <Flex justifyContent={"space-between"}>
                    <Text display={{ base: "none", md: "unset" }} fontSize={"20px"} fontWeight="bold">
                        Delivered Items
                    </Text>
                    <Flex>
                        <Flex mr="20px">
                            <Select
                                placeholder="Products Category"
                                cursor={"pointer"}
                                onChange={(e) => {
                                    settype(e.target.value);
                                }}
                            >
                                <option value="men">Mens</option>
                                <option value="women">Womens</option>
                            </Select>
                        </Flex>

                        <Flex alignItems={"center"}>
                            <Select
                                cursor={"pointer"}
                                placeholder="Sort Items"
                                onChange={(e) => {
                                    setsort(e.target.value);
                                }}
                            >
                                <option value="asc">Low To High</option>
                                <option value="desc">High To Low</option>
                            </Select>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box>
                <Grid
                    mt="10px"
                    gap="6"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                >
                    {order.length &&
                        order.map((el) => {
                            return (
                                <GridItem>
                                    <ProductAddToCart img={el.images[0]} imgOnHover={el.images[1]} title={el.title} salePrice={el.price} regularPrice={Math.floor(+el.price * 0.9)} brand={el.brand} status={el.status} orderdate={el.date} id={el._id} type={el.type} />
                                </GridItem>
                            );
                        })}
                </Grid>
            </Box>
        </Box>
    );
};
export default Ordered;

function ProductAddToCart({ img, imgOnHover, title, salePrice, regularPrice, brand, status, orderdate, id, type, toggleStatus }) {
    const [hover, sethover] = useState(false);
    const [orders, setorders] = useState([]);
    console.log("img", status);

    return (
        <Flex
            w="100%"
            onMouseEnter={() => sethover(true)}
            onMouseLeave={() => sethover(false)}
            //   p={50}
            //   w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box w="100%" bg={useColorModeValue("white", "gray.800")} maxW="sm" borderWidth="1px" rounded="lg" shadow="lg" position="relative">
                {/* {data.isNew && (
          <Box
            border={"1px solid red"}
            bg="red"
            color={"white"}
            position={"absolute"}
            p="4px 8px"
            fontSize={"9px"}
            fontWeight="bold"
            borderRadius={"50px"}
            top="10px"
            left="10px"
            zIndex={10}
          >
            - 50%
          </Box>
        )} */}
                {/* <Box h="370px"></Box> */}
                <Flex position="relative" class="image-wrapper profile-pic">
                    {
                        <Image
                            textAlign={"center"}
                            top="0px"
                            // position={"absolute"}
                            h="370px"
                            w="100%"
                            objectFit={"cover"}
                            transition="opacity 0.5s ease-in-out"
                            src={img}
                            className="image"
                            opacity={hover ? "0" : "1"}
                            alt="normal"
                        />
                    }
                    <Image top="0px" position={"absolute"} h="370px" w="100%" objectFit={"cover"} transition="opacity 0.5s ease-in-out" src={imgOnHover} className="image" opacity={hover ? "1" : "0"} alt="normal" />
                </Flex>

                <Box p="6">
                    <Box textAlign={"left"} fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                        Brand - {brand}
                    </Box>
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box fontSize="xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                            Title - {title}
                        </Box>
                    </Flex>
                    <Box mt="15px" textAlign={"left"}>
                        <Text>OrderDate - {orderdate}</Text>
                        <Flex d="inline" bg={!status ? "red.500" : "green.500"} mt="10px" w="150px" justifyContent={"space-between"} color={"white"} fontSize="16px" borderRadius={"10px"} fontWeight={"bold"} p="8px">
                            {status ? "Delivered" : "Pending"}
                            <Box
                                onClick={() => {
                                    toggleStatus(id, status);
                                }}
                            >
                                {/* <Switch
                  ml="10px"
                  size="md"
                  isDisabled={status}
                  id="email-alerts"
                /> */}
                            </Box>
                        </Flex>
                    </Box>

                    <Flex justifyContent="space-between" alignContent="center">
                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                        <Flex fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
                            <Flex ml="10px" mt="20px" alignItems={"center"} as="span" color={"gray.600"} fontSize="md" textAlign={"left"}>
                                Price : Rs {salePrice} | Original Price : Rs {regularPrice}
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}
