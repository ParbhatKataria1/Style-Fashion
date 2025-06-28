import {  Box, Select, Flex, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import  { useEffect, useState } from "react";
import AdminSidePage from "../Components/AdminSidePage";
import { ProductCard } from "../Components/ProductItemAdmin";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ManageProduct = () => {
    return <AdminSidePage children={<Content />} page="DashBoard" />;
};
const Content = () => {
    let [data, setdata] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({});
    const [reload, setreload] = useState(false);
    const qpage = searchParams.get("page");
    const [page, setpage] = useState(qpage || 1);

    const sortParam = searchParams.get("sort");
    const [sort, setsort] = useState(sortParam);

    const [type, settype] = useState("men");

    async function getData() {
        try {
            let data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/${type}`, {
                params: {
                    page: qpage == undefined ? 1 : qpage,
                },
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            console.log(data.data, "data");
            setdata(data.data);
        } catch (error) {
            console.log("error in fetching the data");
        }
    }

    function changePage(e) {
        let temp = typeof e != "number" ? Number(e.target.innerText) : e;
        // console.log(e.target.innerText);
        // router.query.page = temp;
        setSearchParams({
            page: temp,
        });
        // router.push(router);
        // console.log(router.query, 'dagdafda')
        setpage(temp);
    }

    useEffect(() => {
        let obj = {};
        if (sort) obj.sort = sort;
        if (type) obj.type = type;
        if (page) obj.page = page;
        setSearchParams(obj);
        getData();
    }, [page, reload, sort, type]);

    if (sort) {
        let temp;
        if (sort == "asc")
            temp = data.sort(function (a, b) {
                return +a.price - +b.price;
            });
        if (sort == "desc")
            temp = data.sort(function (a, b) {
                return +b.price - +a.price;
            });
        data = temp;
    }

    return (
        <Box>
            <Box w="100%" bg="white" m="auto">
                <Flex justifyContent={"space-between"}>
                    <Text display={{ base: "none", md: "unset" }} fontSize={"20px"} fontWeight="bold">
                        Manage Item{" "}
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
                    gap="6"
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(2, 1fr)",
                    }}
                >
                    {data.map((el) => {
                        return (
                            <GridItem mt="30px">
                                <ProductCard img={el.images[0]} imgOnHover={el.images[1]} title={el.title} salePrice={el.price} regularPrice={Math.floor(el.price * 1.2)} brand={el.brand} type={el.type} id={el._id} size={el.size} category={el.category} color={el.color} images={el.images} setreload={setreload} />
                            </GridItem>
                        );
                    })}
                </Grid>
            </Box>
            <Box>
                <Flex alignItems={"center"} w={"98%"} justifyContent={"center"} m={"auto"}>
                    {
                        <Button isDisabled={page !== 1 ? false : true} className="prevBtn" data-testid="prevBtn" onClick={() => changePage(page - 1)}>
                            Prev
                        </Button>
                    }

                    {/* render the buttons here, directly. Ensure, each button has the "data-testid='btn'" prop. Add the className, activeBtn, if the current button is the activePage*/}

                    {Array(4)
                        .fill(-1)
                        .map((el, ind) => {
                            return (
                                <Button isDisabled={ind + 1 == page ? true : false} m="9px" onClick={changePage} key={ind + 1}>
                                    {ind + 1}
                                </Button>
                            );
                        })}

                    {
                        <Button isDisabled={page != 4 ? false : true} className="nextBtn" data-testid="nextBtn" onClick={() => changePage(page + 1)}>
                            Next
                        </Button>
                    }
                </Flex>
            </Box>
        </Box>
    );
};

export default ManageProduct;
