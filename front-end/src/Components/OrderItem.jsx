import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && "s"}
      </Box>
    </Box>
  );
}

function ProductAddToCart({
  img,
  imgOnHover,
  title,
  salePrice,
  regularPrice,
  brand,
  status,
  orderdate,
}) {
  const [hover, sethover] = useState(false);
  const [orders, setorders] = useState([]);

  async function getdata() {
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
      console.log(data.data);
      setorders(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  console.log("1");

  useEffect(() => {
    getdata();
  }, []);

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
        {data.isNew && (
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
        )}
        <Box h="370px"></Box>
        <div border={"1px solid red"} class="image-wrapper profile-pic">
          {
            <Image
              border={"1px solid red"}
              top="0px"
              position={"absolute"}
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
        </div>

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
            <Text
              d="inline"
              bg="red.500"
              mt="10px"
              w="150px"
              textAlign={"center"}
              color={"white"}
              fontSize="13px"
              p="3px 5px"
              borderRadius={"50px"}
            >
              Status - {status}
            </Text>
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

export default ProductAddToCart;
