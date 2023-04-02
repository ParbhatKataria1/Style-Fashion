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
      <Box
        border={"0px solid red"}
        w="100%"
        m="auto"
        lineHeight={"60px"}
        textAlign={"center"}
      >
        <Text fontSize="2xl" fontWeight={500} textAlign={"left"}>
          Add New Address
        </Text>
        <HStack w={"100%"}>
          <Input
            isDisabled={text.full_name == ""}
            placeholder="City"
            type="text"
            name="city"
            border="2px solid gray"
            onChange={handleChange}
          />
          <Input
            placeholder="State"
            type="text"
            name="state"
            border="2px solid gray"
            onChange={handleChange}
          />
        </HStack>
        <HStack mt={3}>
          <Input
            placeholder="Pincode"
            type="number"
            name="pincode"
            border="2px solid gray"
            onChange={handleChange}
          />
        </HStack>
        <Input
          placeholder="Full Address"
          type="text"
          name="address"
          border="2px solid gray"
          onChange={handleChange}
        />
      </Box>
      <Box w="100%" onClick={handleClick}>
        <Payment />
      </Box>
    </>
  );
};

export default PaymentModal;
