import {  Box, Select, Flex, Text, Grid, GridItem } from "@chakra-ui/react";
import  { useEffect, useState } from "react";
import AdminSidePage from "../Components/AdminSidePage";
import ProductAddToCart from "../Components/OrderItem";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const TrackOrder = () => {
    return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
    let [order, setorder] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams({});
    const sortParam = searchParams.get("sort");
    const [sort, setsort] = useState(sortParam);

    const typeParam = searchParams.get("type");
    const [type, settype] = useState(typeParam);

    async function toggleStatus(id, status) {
        console.log(id, "dga");
        let data = await axios.patch(
            `${process.env.REACT_APP_BACKEND_API}/allorder/update/${id}`,
            { status: !status },
            {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            }
        );

        getOrderData();
    }

    async function getOrderData() {
        try {
            let data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/allorder`, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            console.log(data.data, "data");
            setorder(data.data);
        } catch (error) {
            console.log("error in fetching the data");
        }
    }
    console.log(order);

    useEffect(() => {
        let obj = {};
        if (sort) obj.sort = sort;
        if (type) obj.type = type;
        setSearchParams(obj);
        getOrderData();
    }, [sort, type]);

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
    console.log(order);
    return (
        <Box>
            <Box w="100%" bg="white" m="auto">
                <Flex justifyContent={"space-between"}>
                    <Text display={{ base: "none", md: "unset" }} fontSize={"20px"} fontWeight="bold">
                        Track Order
                    </Text>
                    <Flex>
                        <Flex mr="20px">
                            <Select
                                cursor={"pointer"}
                                onChange={(e) => {
                                    settype(e.target.value);
                                }}
                                placeholder="Products Category"
                            >
                                <option value="men">Mens</option>
                                <option value="women">Womens</option>
                            </Select>
                        </Flex>

                        <Flex alignItems={"center"}>
                            <Select
                                cursor={"pointer"}
                                onChange={(e) => {
                                    setsort(e.target.value);
                                }}
                                placeholder="Sort Items"
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
                    gap="4"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                >
                    {order.length &&
                        order.map((el) => {
                            return (
                                <GridItem mt="30px">
                                    <ProductAddToCart img={el.images[0]} imgOnHover={el.images[1]} title={el.title} salePrice={el.price} regularPrice={Math.floor(+el.price * 0.9)} brand={el.brand} status={el.status} orderdate={el.date} id={el._id} type={el.type} discount={el.discount} toggleStatus={toggleStatus} />
                                </GridItem>
                            );
                        })}
                </Grid>
            </Box>
        </Box>
    );
};

export default TrackOrder;
