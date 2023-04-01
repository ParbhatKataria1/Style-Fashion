import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsHeart } from "react-icons/bs";
import { Tooltip } from "@chakra-ui/react";
import axios from "axios";
const ProductCard = ({
  img,
  brand,
  setreload,
  imgOnHover,
  title,
  salePrice,
  type,
  size,
  color,
  images,
  category,
  id,
  regularPrice,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hover, sethover] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleDelete = () => {
    console.log("deleting");
    setreload((prev) => !prev);

    axios
      .delete(`https://vast-raincoat-lamb.cyclic.app/${type}/delete/${id}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAzNDA4NTV9.R4pvDG4y_6mMweYjUCpaHLJ8n3JDc5TnUB0d8aSPNKI",
        },
      })
      .then((res) => {
        console.log(res);
        setreload((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <BasicUsage
        brand={brand}
        title={title}
        price={salePrice}
        type={type}
        color={color}
        images={images}
        size={size}
        category={category}
        id={id}
        isOpen={isOpen}
        setreload={setreload}
        onOpen={onOpen}
        onClose={onClose}
      />
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        position="relative"
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
        border={"3px solid green"}
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
          zIndex="10"
        >
          - 50%
        </Box>
        <Box
          border={"4px solid pink"}
          position="relative"
          w=""
          class="image-wrapper profile-pic"
        >
          <Image
            // border={"1px solid red"}
            top="0px"
            zIndex={"10"}
            w="230px"
            // border="5px solid blue"
            // position={"absolute"}
            objectFit={"contain"}
            transition="opacity 0.5s ease-in-out"
            src={img}
            className="image"
            opacity={hover ? "0" : "1"}
            alt="normal"
          />
          <Image
            objectFit={"contain"}
            position={"absolute"}
            top="0px"
            transition="opacity 0.5s ease-in-out"
            src={imgOnHover}
            className="image"
            opacity={hover ? "1" : "0"}
            alt="normal"
          />
        </Box>

        <Stack w="100%" border={"1px solid red"}>
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
              Product ID : {id}
            </Text>
            <Divider />
            <Flex mt="20px">
              <Button size="sm" onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={onOpen} ml="10px" size="sm">
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

function BasicUsage({
  brand,
  title,
  price,
  type,
  color,
  images,
  size,
  category,
  id,
  isOpen,
  onOpen,
  onClose,
  setreload,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProducts
              brand1={brand}
              title1={title}
              price1={price}
              type1={type}
              setreload={setreload}
              color1={color}
              images={images}
              category1={category}
              size1={size}
              id={id}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const AddProducts = ({
  brand1,
  title1,
  price1,
  type1,
  color1,
  setreload,
  size1,
  images,
  category1,
  id,
}) => {
  const [title, setTitle] = useState(title1);
  const [price, setPrice] = useState(price1);
  const [size, setSize] = useState([...size1]);
  const [color, setColor] = useState([...color1]);
  const [images1, setImages1] = useState(images[0]);
  const [images2, setImages2] = useState(images[1]);
  const [images3, setImages3] = useState(images[2]);
  const [category, setcategory] = useState(category1);
  const [brand, setBrand] = useState(brand1);
  const [type, setType] = useState(type1);
  // console.log(images1, images2, images3, "this is the image");

  // function
  const handleSubmit = async (e) => {
    let obj = {
      title,
      price,
      size,
      color,
      images: [images1, images2, images3],
      category,
      brand,
      type,
    };
    console.log(id);
    e.preventDefault();
    setreload((prev) => !prev);
    try {
      await axios.patch(
        `https://vast-raincoat-lamb.cyclic.app/${type}/update/${id}`,
        obj,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0ODgxZDg3MWRiODU3OTRhMDRkM2IiLCJpYXQiOjE2ODAyOTQ3Njh9.LIvUk9OHcPtD4ghNFfeujJAp5Cjsv3zmK-a9IeHNmMs",
          },
        }
      );
    } catch (error) {
      console.log("error in updating the data");
    }
  };

  return (
    <Box>
      <Box>
        <Flex direction={"column"}>
          <form onSubmit={handleSubmit}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </FormControl>

              <FormControl ml="20px">
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  value={price}
                  onChange={(event) => setPrice(+event.target.value)}
                  required
                />
              </FormControl>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <FormControl>
                <FormLabel>Size</FormLabel>
                <Select
                  value={size}
                  onChange={(event) => setSize([event.target.value])}
                >
                  <option value="xs">extra small</option>
                  <option value="s">small</option>
                  <option value="m">medium</option>
                  <option value="l">large</option>
                </Select>
              </FormControl>

              <FormControl ml={"20px"}>
                <FormLabel>Color</FormLabel>
                <Select
                  value={color}
                  onChange={(event) => setColor([event.target.value])}
                >
                  <option value="white">white</option>
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="yellow">yellow</option>
                </Select>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>Image 1</FormLabel>
              <Input
                type="url"
                value={images1}
                onChange={(event) => setImages1(event.target.value)}
                isRequired
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image 2</FormLabel>
              <Input
                type="url"
                value={images2}
                onChange={(event) => setImages2(event.target.value)}
                isRequired
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image 3</FormLabel>
              <Input
                type="url"
                value={images3}
                onChange={(event) => setImages3(event.target.value)}
                isRequired
              />
            </FormControl>
            <Flex>
              <FormControl>
                <FormLabel>type</FormLabel>
                <Select
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </Select>
              </FormControl>

              <FormControl ml={4}>
                <FormLabel>Brand</FormLabel>
                <Select
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                >
                  <option value="Koovs">Koovs</option>
                  <option value="Nike">Nike</option>
                  <option value="5ive">5ive</option>
                  <option value="The Coutour club">The Coutour club</option>
                </Select>
              </FormControl>
            </Flex>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={category}
                onChange={(event) => setcategory(event.target.value)}
              >
                <option value="shirt">Shirt</option>
                <option value="pants">Pants</option>
                <option value="track pants">Track Pants</option>
                <option value="t-shirt">T-Shirt</option>
                <option value="hoodies">Hoodies</option>
                <option value="Palazzo">Palazzo</option>
                <option value="Kurta">Kurta</option>
                <option value="jeans">Jeans</option>
              </Select>
            </FormControl>
            <Stack mt={4} spacing={4}>
              <Button type="submit" colorScheme="green">
                + Add Product
              </Button>
            </Stack>
          </form>
        </Flex>
      </Box>
    </Box>
  );
};
