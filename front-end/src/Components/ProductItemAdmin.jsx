import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import axios from 'axios';
const ProductCard = ({
  img,
  brand,
  imgOnHover,
  title,
  salePrice,
  type,
  id,
  regularPrice,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hover, sethover] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleDelete = () =>{
    console.log("deleting")
    if(type==="men"){
      axios.delete(`https://vast-raincoat-lamb.cyclic.app/men/delete/${id}`)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else if(type==="women"){
      axios.delete(`https://vast-raincoat-lamb.cyclic.app/women/delete/${id}`)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        position="relative"
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
        border={"1px solid red"}
      >
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
        <div border={"1px solid red"} class="image-wrapper profile-pic">
          {
            <Image
              border={"1px solid red"}
              top="0px"
              position={"absolute"}
              h="230px"
              objectFit={"contain"}
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
            h="230px"
            objectFit={"contain"}
            transition="opacity 0.5s ease-in-out"
            src={imgOnHover}
            className="image"
            opacity={hover ? "1" : "0"}
            alt="normal"
          />
        </div>

        <Stack w="100%" border={"1px solid red"} ml="160px">
          <CardBody>
            <Heading textAlign="left" size="md">
              Brand - {brand}
            </Heading>

            <Text textAlign="left" fontSize={"19px"} py="2">
              Title - {title}
            </Text>
            <Divider />
            <Flex pt="10px" fontSize={"15px"}>
              <Text> Price - Rs {salePrice}.00</Text>
              {regularPrice ? (
                <Text ml="5px"> | Original Price Rs {regularPrice}.00</Text>
              ) : (
                <></>
              )}
            </Flex>

            <Text
              textAlign="left"
              pt="10px"
              fontSize={"14px"}
              fontWeight="bold"
            >
              Product ID : jigohed33aihpgdia
            </Text>
            <Divider />
            <Flex mt="20px">
              <Button size="sm" onClick={handleDelete}>Delete</Button>
              <Button ml="10px" size="sm">
                Update
              </Button>
              <Button ml="10px" size="sm">
                Info
              </Button>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
};

export { ProductCard };
