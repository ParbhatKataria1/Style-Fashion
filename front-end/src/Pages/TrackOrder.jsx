import {
  Heading,
  Box,
  Select,
  Flex,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminSidePage from "../Components/AdminSidePage";
import ProductAddToCart from "../Components/OrderItem";
import { ProductCard } from "../Components/ProductItemAdmin";
import axios from "axios";

const TrackOrder = () => {
  return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
  const [order, setorder] = useState([]);

  async function toggleStatus(id, status) {
    console.log(id, "dga");
    let data = await axios.post(
      `https://vast-raincoat-lamb.cyclic.app/order/update/${id}`,
      { status: !status },
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0ODgxZDg3MWRiODU3OTRhMDRkM2IiLCJpYXQiOjE2ODAxODU4Mjh9.ZStaoEyCnTJ89Et2eNzqKNnAFKNYaqp85IIyMgMPhwE",
        },
      }
    );
    getOrderData();
  }

  async function getOrderData() {
    try {
      let data = await axios.get(
        "https://vast-raincoat-lamb.cyclic.app/order",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0ODgxZDg3MWRiODU3OTRhMDRkM2IiLCJpYXQiOjE2ODAxODU4Mjh9.ZStaoEyCnTJ89Et2eNzqKNnAFKNYaqp85IIyMgMPhwE",
          },
        }
      );
      console.log(data.data, "data");
      setorder(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  console.log(order);
  useEffect(() => {
    getOrderData();
  }, []);
  return (
    <Box>
      <Box w="100%" bg="white" m="auto">
        <Flex justifyContent={"space-between"}>
          <Text
            display={{ base: "none", md: "unset" }}
            fontSize={"20px"}
            fontWeight="bold"
          >
            Manage Item{" "}
          </Text>
          <Flex>
            <Flex mr="20px">
              <Select placeholder="Products Category">
                <option value="option1">Mens</option>
                <option value="option2">Womens</option>
              </Select>
            </Flex>

            <Flex alignItems={"center"}>
              <Select placeholder="Sort Items">
                <option value="option1">Low To High</option>
                <option value="option2">High To Low</option>
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
                <GridItem>
                  <ProductAddToCart
                    img={el.images[0]}
                    imgOnHover={el.images[1]}
                    title={el.title}
                    salePrice={el.price}
                    regularPrice={Math.floor(+el.price * 0.9)}
                    brand={el.brand}
                    status={el.status}
                    orderdate={el.date}
                    id={el._id}
                    toggleStatus={toggleStatus}
                  />
                </GridItem>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};

export default TrackOrder;
