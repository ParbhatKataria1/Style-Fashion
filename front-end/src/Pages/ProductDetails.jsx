import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Select,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import CartSlider from "../Components/CartSlider";
import "../ProductDetails..css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PaymentModal from "../Components/PaymentModal";
import { shopMens } from "../homePagedb";
import { Link, useParams } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

const token = process.env.TOKEN;

const ProductDetails = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // const {id} = useParams();

  const [size, setSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState("");
  const [state, setState] = useState(false);
  const params = useParams();
  const id = params.id;

  const getData = async () => {
    try {
      let data = await axios.get(
        `https://vast-raincoat-lamb.cyclic.app/men/${id}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN,
          },
        }
      );

      setProduct(data.data, "this is the data we want");
    } catch (error) {
      console.log("there is an error in fetching data");
    }
  };
  console.log(product[0]);

  // const {title,price,brand} = product;
  // console.log(title,price,brand);

  function changeState() {
    setState((prev) => !prev);
  }

  useEffect(() => {
    getData();
  }, [state]);

  const handleSizeClick = (val) => {
    setSize(val);
  };

  const handleQuantity = (val) => {
    setQuantity((p) => p + val);
  };

  const handleClick = async () => {
    let { brand, images, price, title, type } = product[0];
    let cartData = {
      brand,
      images,
      price,
      title,
      type,
      qty: quantity,
      sizes: size,
      color,
    };
    // console.log(cartData, "cartdata");

    try {
      let data = await axios.post(
        "https://vast-raincoat-lamb.cyclic.app/cart/add",
        cartData,
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN,
          },
        }
      );
      console.log(data.data, "pdetail onclick cartdata");
      alert("Item added to cart");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(images, "this is the imamges");
  return (
    <div>
      {product ? (
        product.map((el) => {
          return (
            <Container maxW={"7xl"} border="0px solid red" mt={"20px"}>
              <Flex w={"100%"}>
                <Box
                  className="Image"
                  h={{ base: "100%", sm: "300px", lg: "650px" }}
                  border="0px solid black"
                  w={"38.1%"}
                >
                  <Carousel images={el.images} />
                </Box>

                <Box
                  className="Details"
                  h={{ base: "100%", sm: "300px", lg: "650px" }}
                  border="0px solid black"
                  w={"50%"}
                >
                  <Stack
                    textAlign={"left"}
                    spacing={{ base: 6, md: 10 }}
                    ml="25px"
                  >
                    <Box as={"header"}>
                      <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: "2xl", sm: "4xl", lg: "2xl" }}
                      >
                        {el.title}
                      </Heading>
                      <Text mt={3} mb={-10} fontWeight={500} fontSize={"xl"}>
                        ₹ {el.price}
                      </Text>
                      <Text mt={10}>Tax included.</Text>
                    </Box>

                    <Stack
                      textAlign={"left"}
                      spacing={{ base: 4, sm: 6 }}
                      direction={"column"}
                    >
                      <Text
                        alignSelf={"flex-start"}
                        border={"0px solid red"}
                        fontSize={"md"}
                        color="black"
                        fontWeight={"400"}
                      >
                        20 people are viewing this right now
                      </Text>

                      <Text fontSize={"md"} fontWeight={"500"}>
                        Size: {size}
                      </Text>

                      <Flex
                        border={"0px solid red"}
                        justifyContent="flex-start"
                        gap={3}
                        maxW={"sm"}
                        alignItems="center"
                      >
                        <Button onClick={() => handleSizeClick("S")}>S</Button>
                        <Button onClick={() => handleSizeClick("M")}>M</Button>
                        <Button onClick={() => handleSizeClick("L")}>L</Button>
                        <Button onClick={() => handleSizeClick("XL")}>
                          XL
                        </Button>
                      </Flex>

                      <Text fontSize={"md"} fontWeight={"500"}>
                        Color: {color}
                        <Select onChange={(e) => setColor(e.target.value)}>
                          {el.color.map((ele) => {
                            return <option value={ele}>{ele}</option>;
                          })}
                        </Select>
                      </Text>

                      <Flex
                        height={"40px"}
                        w="40px"
                        border={"1px solid black"}
                        rounded="full"
                      >
                        <Box
                          height={"30px"}
                          w="30px"
                          border={"1px solid black"}
                          rounded="full"
                          bgColor={color}
                          margin="auto"
                          alignItems={"center"}
                        ></Box>
                      </Flex>
                    </Stack>
                    <Text>Quantity</Text>
                    <Flex gap={2}>
                      <Button
                        isDisabled={quantity == 1}
                        onClick={() => handleQuantity(-1)}
                      >
                        -
                      </Button>
                      <Button>{quantity}</Button>
                      <Button
                        isDisabled={quantity == 10}
                        onClick={() => handleQuantity(1)}
                      >
                        +
                      </Button>
                      <Button
                        onClick={handleClick}
                        w={"7xl"}
                        border="0px solid red"
                      >
                        Add To Cart
                      </Button>
                    </Flex>
                    {/* Add to cart button */}

                    <CartSlider changeState={changeState} />
                  </Stack>
                </Box>
              </Flex>
            </Container>
          );
        })
      ) : (
        <Heading>No product Found</Heading>
      )}

      <Tabs width={"82%"} m="auto" mt={"20"} mb="50">
        <TabList justifyContent={"space-between"} p="0px 200px 0px 200px">
          <Tab>Product description</Tab>
          <Tab>Shipping & Return</Tab>
          <Tab>Material & Care</Tab>
        </TabList>

        <TabPanels textAlign={"left"} fontSize="13px">
          <TabPanel>
            <p>
              This is a limited edition pre-order product and will be delivered
              on or before 5th April 2023
            </p>
            <br />
            <p>
              Introducing the Ritual t-shirt, a stunning collaboration between
              our brand and the talented artist Boomrangg. This t-shirt
              represents the power of music and its ability to bring people
              together in a shared experience that transcends time and space.
              The striking design features intricate illustrations of
              instruments and symbols, creating a hypnotic and almost mystical
              effect that will surely turn heads.
            </p>
            <br />
            <p>
              Crafted from high-quality, soft and breathable cotton, this
              t-shirt is as comfortable as it is stylish. Whether you're going
              to a music festival, concert, or just hanging out with friends,
              the Ritual t-shirt is the perfect choice for any occasion. It's
              available in a range of sizes, so you can find the perfect fit for
              you.
            </p>
            <br />
            <p>
              Wear it with your favorite jeans or shorts, and you're ready to
              go. This t-shirt is more than just a piece of clothing; it's a
              statement about your love for music and your appreciation for art.
              So why wait? Order your Ritual t-shirt today and join the koovs
              cult!
            </p>
          </TabPanel>
          <TabPanel className="tabs" textAlign={"center"}>
            <p>
              <br />
              India-wide Shipping Average time: 4-6 days after the order
              confirmation.
              <br />
              <br />
              <h1>SHIPPING POLICY</h1>
              <br />
              Any product bought from https://koovs.com, will be shipped to the
              cusrtomer maximum within 4 to 6 days. In case of any exceptions,
              due to non-availability of a certain product, we will inform the
              customer through the email id provided in the customer
              registration form. If an item in your order isn’t immediately
              available in our warehouse, then please allow 1 to 2 weeks for
              your purchase to be processed. Your order may be processed in
              multiple shipments, in which case you will be notified of the
              tracking number when each shipment occurs. Any COD orders, if
              available, will be charged extra @ INR 100 Flat.
              <br />
              <br />
              <h1>RETURN/EXHANGE POLICY</h1>
              <br />
              Koovs has a flat 7 days return policy to all our customers. You
              can conveniently return or exchange any item within 7 days from
              the date of receipt of the product. To initiate return or
              exchange, mail us at care@koovs.com.
              <br />
              <br />
              <h2>
                No returns or exchange allowed for inner wear & under garments.
              </h2>
            </p>
          </TabPanel>
          <TabPanel>
            <p>Wash inside out</p>

            <p>Wash with similar colours</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* carousel */}
      {/* <Container as={Stack} maxW={'full'} py={10} gap={'2rem'}>
            <Text align={'flex-start'} ml={3} fontWeight={'600'} fontSize={'35px'}>
                    Shop Men's
            </Text>
            <Carousel responsive={responsive}
            // customRightArrow={<CustomLeftArrow />}
            padding={'1rem'}
            swipeable={true}
            draggable={true}
            showDots={true}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={1000}
            focusOnSelect={true}
            keyBoardControl={true}
            customTransition="all 0.5s"
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["superLargeDesktop","desktop","tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
                {
                    shopMens.map((el)=>{
                        return <div className='shopCard_menwomen'>
                            <Link href="/mensAllCloth">
                            <img src={el.img} alt={el.title} />
                            <HStack justifyContent={'space-between'} px={1.5} py={1}>
                            <Text>{el.title}</Text>
                            <IconButton icon={<BiRightArrowAlt  size={'25px'}/>} borderRadius={'50%'} bg={'blackAlpha.600'} color={'white'}  _hover={{bg:'black'}}/>
                            </HStack>
                            </Link>
                        </div>
                    })
                }
            </Carousel>
       </Container> */}
    </div>
  );
};

export default ProductDetails;
