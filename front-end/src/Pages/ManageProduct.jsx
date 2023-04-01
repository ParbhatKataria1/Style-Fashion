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
import { ProductCard } from "../Components/ProductItemAdmin";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { easeOut } from "framer-motion";

const ManageProduct = () => {
  return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
  const [category, setcategory] = useState("men");
  const [data, setdata] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const page = searchParams.get("page");
  console.log(searchParams, "search", page);

  async function getData() {
    try {
      let data = await axios.get(
        `https://vast-raincoat-lamb.cyclic.app/${category}?${
          page == undefined ? 1 : page
        }`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAzNDA4NTV9.R4pvDG4y_6mMweYjUCpaHLJ8n3JDc5TnUB0d8aSPNKI",
          },
        }
      );
      console.log(data.data, "data");
      setdata(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }

  useEffect(() => {
    getData();
  }, [category, page]);

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
          gap="6"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
        >
          {data.map((el) => {
            return (
              <GridItem>
                <ProductCard
                  img={el.images[0]}
                  imgOnHover={el.images[3]}
                  title={el.title}
                  salePrice={el.price}
                  regularPrice={Math.floor(el.price * 1.2)}
                  brand={el.brand}
                  type={el.type}
                  id={el._id}
                  size={el.size}
                  category={el.category}
                  color={el.color}
                  images={el.images}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default ManageProduct;
