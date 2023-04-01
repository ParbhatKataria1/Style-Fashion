import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Select,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AdminSidePage from "../Components/AdminSidePage";
import { ProductCard } from "../Components/ProductItemAdmin";
import { useEffect, useState } from "react";
import axios from "axios";

const Ordered = () => {
  return <AdminSidePage children={<Content />} page="DashBoard" />;
};

const Content = () => {
  const [order, setorder] = useState([]);

  async function getOrderData() {
    try {
      let data = await axios.get(
        "https://vast-raincoat-lamb.cyclic.app/allorder",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyNjcwMzB9.vBtu-FuZY6dLvnhM_moYg82aT8qiBZFKBysscF9ISUQ",
          },
        }
      );
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
    getOrderData();
  }, []);
  console.log(order, "order");
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
                    type={el.type}
                  />
                </GridItem>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
};
export default Ordered;

function ProductAddToCart({
  img,
  imgOnHover,
  title,
  salePrice,
  regularPrice,
  brand,
  status,
  orderdate,
  id,
  type,
  toggleStatus,
}) {
  const [hover, sethover] = useState(false);
  const [orders, setorders] = useState([]);
  console.log("img", status);

  return (
    <Flex
      w="100%"
      onMouseEnter={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
      //   p={50}
      border="1px solid red"
      //   w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="100%"
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
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
        <Flex
          border={"1px solid red"}
          position="relative"
          class="image-wrapper profile-pic"
        >
          {
            <Image
              textAlign={"center"}
              border={"1px solid red"}
              top="0px"
              // position={"absolute"}
              h="370px"
              w="100%"
              objectFit={"cover"}
              transition="opacity 0.5s ease-in-out"
              src={
                "https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3234.jpg?v=1671078617&width=600"
              }
              className="image"
              opacity={hover ? "0" : "1"}
              alt="normal"
            />
          }
          <Image
            top="0px"
            position={"absolute"}
            h="370px"
            w="100%"
            objectFit={"cover"}
            transition="opacity 0.5s ease-in-out"
            src={imgOnHover}
            className="image"
            opacity={hover ? "1" : "0"}
            alt="normal"
          />
        </Flex>

        <Box p="6">
          <Box
            textAlign={"left"}
            fontSize="xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            Brand - {brand}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Title - {title}
            </Box>
          </Flex>
          <Box mt="15px" textAlign={"left"}>
            <Text>OrderDate - {orderdate}</Text>
            <Flex
              d="inline"
              bg={!status ? "red.500" : "green.500"}
              mt="10px"
              w="150px"
              justifyContent={"space-between"}
              color={"white"}
              fontSize="16px"
              borderRadius={"10px"}
              fontWeight={"bold"}
              p="8px"
            >
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
              <Flex
                ml="10px"
                mt="20px"
                alignItems={"center"}
                as="span"
                color={"gray.600"}
                fontSize="md"
                textAlign={"left"}
              >
                Price : Rs {salePrice} | Original Price : Rs {regularPrice}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
