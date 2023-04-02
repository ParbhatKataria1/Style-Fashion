import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Payment from "./Payment";

const PaymentModal = ({ subtotal, tax, totalPrice }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mobile, setMobile] = useState("");
  console.log(mobile);

  const [text, setText] = useState("");

  const today = new Date();
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const dateFormatted = today.toLocaleString("en-US", options);
  const dateFinal = dateFormatted.toString();

  console.log(text, "text");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, date: dateFinal });
  };

  // ----------- get request for cart data ------- //
  const [cartData, setcartdata] = useState([]);

  const getdata = async () => {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/cart", {
        headers: {
          Authorization: process.env.REACT_APP_TOKEN,
        },
      });
      setcartdata(data.data);
    } catch (error) {
      console.log("error in fetching cart data");
    }
  };
  console.log(cartData, "pmodel cart");

  useEffect(() => {
    getdata();
  }, []);

  //-------------adding cartdata and address-----------------//
  const handleClick = async (e) => {
    const newData = cartData.map((e) => {
      let obj = {
        status: false,
        ...e,
        ...text,
      };
      return obj;
    });
    console.log(newData, "newData");
    for (let i = 0; i < newData.length; i++) {
      let obj = { ...newData[i] };
      delete obj._id;
      delete obj.userId;
      let data = await axios.post(
        "https://vast-raincoat-lamb.cyclic.app/order/add",
        obj,
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN,
          },
        }
      );
      console.log(data.data, "sent data");
      await axios.delete(
        `https://vast-raincoat-lamb.cyclic.app/cart/delete/${newData[i]._id}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_TOKEN,
          },
        }
      );
    }
  };

  console.log(text);
  return (
    <>
      <Button
        onClick={onOpen}
        rounded={"none"}
        w={"full"}
        size={"lg"}
        py={"7"}
        bg={"black"}
        color={"white"}
        border="0px solid black"
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(1px)",
          boxShadow: "lg",
          bg: "black",
          color: "white",
        }}
      >
        BUY IT NOW
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} autoFocus={false}>
        <ModalOverlay  />
        <ModalContent boxShadow={"rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;"} rounded={"2xl"}>
          <ModalHeader>
            <Heading>Koovs</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex>
              <Box>
                <Tabs m="auto" >
                  <TabList
                  boxShadow={"#e344b0 0px 1px 0px"}
                    justifyContent={"space-between"}
                    p="0px 200px 0px 200px"
                    
                  >
                    <Tab >Mobile</Tab>
                    <Tab>Address</Tab>
                    <Tab>Pay</Tab>
                  </TabList>

                  <TabPanels textAlign={"left"} fontSize="13px">
                    <TabPanel>
                      <Box
                      boxShadow={"#e344b0 0px 5px 15px"}
                        lineHeight={"100px"}
                        textAlign={"center"}
                        border={"0px solid red"}
                        width={"60%"}
                        m={"auto"}
                        mt={18}
                      >
                        <Text
                        
                          fontSize="2xl"
                          fontWeight={500}
                          textAlign={"center"}
                        >
                          Enter Mobile Number
                        </Text>
                        <InputGroup w={"70%"} m={"auto"}>
                          <InputLeftAddon
                            children="+91"
                            border="2px solid gray"
                            
                          />
                          <Input
                          boxShadow={"#e344b0 2px 2px 2px"}
                            border="2px solid gray"
                            type="tel"
                            value={mobile}
                            fontSize={"xl"}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </InputGroup>
                        <Button
                        
                          isDisabled={mobile.length < 10}
                          w={"xs"}
                          size={"lg"}
                          py={"7"}
                          bg={"black"}
                          color={"white"}
                          border="0px solid black"
                          _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                            bg: "black",
                            color: "white",
                          }}
                        >
                          Continue
                          <ArrowForwardIcon />{" "}
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Box
                        border={"0px solid red"}
                        w="70%"
                        m="auto"
                        lineHeight={"60px"}
                        textAlign={"center"}
                      >
                        <Text
                          fontSize="2xl"
                          fontWeight={500}
                          textAlign={"left"}
                        >
                          Add New Address
                        </Text>
                        <HStack>
                          <Input
                          boxShadow={"#e344b0 0px 2px 2px"}
                            isDisabled={text.full_name == ""}
                            placeholder="City"
                            type="text"
                            name="city"
                            border="2px solid gray"
                            onChange={handleChange}
                          />
                          <Input
                          boxShadow={"#e344b0 0px 2px 2px"}
                            placeholder="State"
                            type="text"
                            name="state"
                            border="2px solid gray"
                            onChange={handleChange}
                          />
                        </HStack>
                        <HStack mt={3}>
                          <Input
                          boxShadow={"#e344b0 0px 2px 2px"}
                            placeholder="Pincode"
                            type="number"
                            name="pincode"
                            border="2px solid gray"
                            onChange={handleChange}
                          />
                          
                        </HStack>
                        <Input
                        boxShadow={"#e344b0 0px 2px 2px"}
                          placeholder="Full Address"
                          type="text"
                          name="address"
                          border="2px solid gray"
                          onChange={handleChange}
                        />
                        <Button
                        boxShadow={"#e344b0 0px 5px 15px"}
                          w={"xs"}
                          size={"lg"}
                          py={"7"}
                          bg={"black"}
                          color={"white"}
                          border="0px solid black"
                          _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                            bg: "black",
                            color: "white",
                          }}
                        
                        >
                          Submit
                        </Button>
                      </Box>
                    </TabPanel>
                    {/* payment thing */}
                    <TabPanel>
                      <Payment
                        subtotal={subtotal}
                        tax={tax}
                        totalPrice={totalPrice}
                        cartData={cartData}
                        text={text}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box w={"30%"}>
                <Heading mb={"20px"} fontSize="18px" fontWeight={500}>
                  Order Summary
                </Heading>
                <Box
                  boxShadow={"#e344b0 0px 5px 15px"}
                  borderRadius="5px"
                  p={"15px"}
                >
                  <Flex direction="column">
                    <Flex mb={"12px"} justifyContent={"space-between"}>
                      <Text>SubTotal</Text>
                      <Text>{subtotal}</Text>
                    </Flex>
                    <Divider mb={"12px"} border={"1px solid #e344b0"} />
                    <Flex mb={"12px"} justifyContent={"space-between"}>
                      <Text>Shipping</Text>
                      <Text>TBD</Text>
                    </Flex>
                    <Divider mb={"12px"} border={"1px solid #e344b0"} />
                    <Flex mb={"12px"} justifyContent={"space-between"}>
                      <Text>Estimated Tax</Text>
                      <Text>{tax}</Text>
                    </Flex>
                    <Divider mb={"12px"} border={"1px solid #e344b0"} />
                    <Flex mb={"12px"} justifyContent={"space-between"}>
                      <Text>Total</Text>
                      <Text>{totalPrice}</Text>
                    </Flex>
                    <Divider mb={"12px"} border={"1px solid #e344b0"} />
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
            boxShadow={"#e344b0 0px 5px 15px"}
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              bg={"black"}
              color={"white"}
              border="0px solid black"
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
                bg: "black",
                color: "white",
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
