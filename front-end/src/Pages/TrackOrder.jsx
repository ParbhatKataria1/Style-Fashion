import {
  Heading,
  Box,
  Select,
  Flex,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import AdminSidePage from "../Components/AdminSidePage";
import ProductAddToCart from "../Components/OrderItem";
import { ProductCard } from "../Components/ProductItemAdmin";

const TrackOrder = () => {
  return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
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
            lg: "repeat(4, 1fr)",
          }}
        >
          {Array(15)
            .fill(0)
            .map((el) => {
              return (
                <GridItem>
                  <ProductAddToCart
                    img="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-4536.jpg?v=1677145377&width=360"
                    imgOnHover="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/KOOVS_20OCT22-0735-7.jpg?v=1677062022&width=360"
                    title="24Hr Couture Graphic T-Shirt"
                    salePrice="1200"
                    regularPrice="1300"
                    brand="THE COUTURE CLUB"
                    status="pending"
                    orderdate="12th March 23:33"
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
