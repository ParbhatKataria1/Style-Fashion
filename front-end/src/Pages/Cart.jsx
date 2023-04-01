import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Divider,
  Button,
  HStack,
  Input,
  Text,
  Image,
  Accordion,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import PaymentModal from "../Components/PaymentModal";

import React, { useEffect, useState } from "react";

import { Select, TagLabel } from "@chakra-ui/react";

let init = {
  totalPrice: 0,
  subtotal: 0,
  tax: 0,
};

const PaymentOption = ({ cartData }) => {
  const subtotal = 30;
  const tax = 44;
  let totalPrice = 0;
  console.log(cartData,"payment")
  cartData.forEach((el)=>{
    return totalPrice =totalPrice + el.qty*el.price;
  })
  console.log(totalPrice)

  return (
    <>
      <Box w={"25%"}>
        <Heading mb={"20px"} fontSize="18px" fontWeight={500}>
          Order Summary
        </Heading>
        <Box border={"1px solid lightgray"} borderRadius="5px" p={"15px"}>
          <Flex direction="column">
            <Flex mb={"12px"} justifyContent={"space-between"}>
              <Text>SubTotal</Text>
              <Text>${totalPrice}</Text>
            </Flex>
            <Divider mb={"12px"} />
            <Flex mb={"12px"} justifyContent={"space-between"}>
              <Text>Shipping</Text>
              <Text>TBD</Text>
            </Flex>
            <Divider mb={"12px"} />
            <Flex mb={"12px"} justifyContent={"space-between"}>
              <Text>Estimated Tax</Text>
              <Text>${tax}</Text>
            </Flex>
            <Divider mb={"12px"} />
            <Flex mb={"12px"} justifyContent={"space-between"}>
              <Text>Total</Text>
              <Text>${totalPrice+44}</Text>
            </Flex>
            <Divider mb={"12px"} />
          
            <PaymentModal/>
           
           
          </Flex>
        </Box>
      </Box>
    </>
  );
};

const Cart = () => {
  const [cartData, setcartdata] = useState([]);

  async function getdata() {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/cart", {
        headers: {
          Authorization:process.env.REACT_APP_TOKEN
            ,
        },
      });
      setcartdata(data.data);
    } catch (error) {
      console.log("error in fetching cart data");
    }
  }
console.log(cartData,"cart data");


const updateQty = async(id,qty)=>{
  try {
    await axios.patch(`https://vast-raincoat-lamb.cyclic.app/cart/update/${id}`,qty,{
      headers: {
        Authorization:
        process.env.REACT_APP_TOKEN,
      },
    })
    getdata();
    console.log("update fun",id,qty);
  } catch (error) {
    console.log("error in update qty");
  }
}

const handleDelete = async(id)=>{
  try {
    await axios.delete(`https://vast-raincoat-lamb.cyclic.app/cart/delete/${id}`,{
      headers: {
        Authorization:
        process.env.REACT_APP_TOKEN,
      },
    })
    getdata();
    
  } catch (error) {
    console.log("error in delete");
  }
}



  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Box pt={"20px"} w="95%" m="auto">
        <Flex justifyContent={"space-between"}>
          <Box w={"70%"}>
            <Box p={"10px"} mt="20px">
              {/* <Flex
                justifyContent={"space-between"}
                borderTop={"1px solid lightgray"}
                borderBottom={"1px solid lightgray"}
                m="10px"
                p="10px 10px"
              >
                <Box>
                  <Text>Item</Text>
                </Box>
                <Box>
                  {" "}
                  <Text>Description</Text>{" "}
                </Box>
                <Box>
                  <Text>Item Price</Text>
                </Box>
                <Box>
                  <Text>Quanitity</Text>
                </Box>
                <Box>
                  <Text>Total Price</Text>
                </Box>
                <Box></Box>
              </Flex> */}
              {cartData?.map((item) => {
                return (
                  <Box key={item.id}>
                    <CartItem cartItem={item} updateQty={updateQty} handleDelete={handleDelete}/>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <PaymentOption
             cartData={cartData}
          />
        </Flex>
      </Box>
    </>
  );
};

export default Cart;

const CartItem = ({ cartItem, updateQty,handleDelete }) => {
  // console.log(cartItem)
  

const [qty,setQty] = useState(cartItem.qty)
  const changeTheData = (e)=>{
    setQty(e.target.value);
    updateQty(cartItem._id,qty);
  }
console.log((qty));





  return (
    <Box mb={"10px"} border="1px solid lightgray" borderRadius={"5px"}>
      <Flex
        justifyContent={"flex-start"}
        borderTop={"1px solid lightgray"}
        borderBottom={"1px solid lightgray"}
        p="10px"
      >
        <Box
          w="30%"
          mr="70px"
          borderRadius={"5px"}
          border={"1px solid black"}
          bg="black"
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
        >
          <Flex
            w="100%"
            justifyContent={"center"}
            alignItems="center"
            h="200px"
          >
            <Image
              h={"100%"}
              objectFit="cover"
                src={cartItem.images[0]}
                alt={cartItem.title}
            ></Image>
          </Flex>
        </Box>
        <Divider
          variant="solid"
          h="200px"
          colorScheme="purple"
          orientation="vertical"
        />
        <Box mr="40px" w={"20%"}>
          <Text fontWeight={500}>{cartItem.title}</Text>
          <Text>
            style:
            {/* {cartItem.productdetails.styleno} */}
          </Text>
          <Text>Color : {cartItem.color}</Text>
          <Text>Size :{cartItem.sizes}</Text>
        </Box>
        <Box mr="60px">
          {/* <Text>Item Price</Text> */}
          <Text>${cartItem.price}</Text>
        </Box>
        <Box mr="30px">
          {/* <Text>Quanitity</Text> */}
          <Select
            placeholder={qty}
            onChange={changeTheData}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </Select>
        </Box>

        <Box mr="70px">
          {/* <Text>Total Price</Text> */}
          <Text>${parseInt(cartItem.price) * +cartItem.qty}</Text>
        </Box>
        <Box
          cursor={"pointer"}
           onClick={() => handleDelete(cartItem._id)}
          w="5%"
        >
          <svg
            w="10px"
            h="10px"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
          </svg>
        </Box>
      </Flex>
    </Box>
  );
};
