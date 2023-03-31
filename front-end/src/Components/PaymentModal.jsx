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
import {useEffect} from "react";

const PaymentModal = () => {
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

  // console.log(dateFinal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, date: dateFinal });
  };

  // ----------- get request for cart data ------- //
  const [cartData, setcartdata] = useState([]);

  const getdata= async()=> {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/cart", {
        headers: {
          Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyODkwNzl9.mgQQ4nvjKKLtspr0V2ORDqpYztzyKGjJA65L4HBlbKU",
        },
      });
      setcartdata(data.data);
    } catch (error) {
      console.log("error in fetching cart data");
    }
  }
  console.log(cartData,"pmodel cart");

  useEffect(()=>{
getdata()
  },[])


//-------------adding cartdata and address-----------------//
 




  const handleClick = async (e) => {

    const newData = cartData.map(e=>{
      return {
        ...e,
        ...text
      }
    })
    console.log(newData,"newData")
    for(let i=0;i<newData.length;i++){
      let data = await axios.post(
        "https://vast-raincoat-lamb.cyclic.app/order/add",
        newData[i],
        {
          headers: {
            Authorization:
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyODkwNzl9.mgQQ4nvjKKLtspr0V2ORDqpYztzyKGjJA65L4HBlbKU",
          },
        }
      );
      console.log(data.data, "sent data")
    }
    // setText("");
    await axios.delete(`https://vast-raincoat-lamb.cyclic.app/cart`,{
      headers: {
        Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyODkwNzl9.mgQQ4nvjKKLtspr0V2ORDqpYztzyKGjJA65L4HBlbKU",
      },
    })
   

    
    // console.log(data);
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
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Koovs</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid>
              <Box>
                <Tabs m="auto">
                  <TabList
                    justifyContent={"space-between"}
                    p="0px 200px 0px 200px"
                  >
                    <Tab>Mobile</Tab>
                    <Tab>Address</Tab>
                    <Tab>Pay</Tab>
                  </TabList>

                  <TabPanels textAlign={"left"} fontSize="13px">
                    <TabPanel>
                      <Box
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
                          <InputLeftAddon children="+91" />
                          <Input
                            type="tel"
                            value={mobile}
                            fontSize={"xl"}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </InputGroup>
                        <Button isDisabled={mobile.length < 10} size={"lg"}>
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
                        {/* <Input placeholder="Full Name" type="text" name="full_name" onChange={handleChange} /> */}
                        <HStack>
                          <Input
                            isDisabled={text.full_name == ""}
                            placeholder="City"
                            type="text"
                            name="city"
                            onChange={handleChange}
                          />
                          <Input
                            placeholder="State"
                            type="text"
                            name="state"
                            onChange={handleChange}
                          />
                        </HStack>
                        <HStack mt={3}>
                          <Input
                            placeholder="Pincode"
                            type="number"
                            name="pincode"
                            onChange={handleChange}
                          />
                          {/* <Input placeholder="Email Address" type="email" name="email" onChange={handleChange}/> */}
                        </HStack>
                        <Input
                          placeholder="Full Address"
                          type="text"
                          name="address"
                          onChange={handleChange}
                        />
                        <Button size={"lg"} onClick={handleClick}>
                          Submit
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel></TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box></Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
