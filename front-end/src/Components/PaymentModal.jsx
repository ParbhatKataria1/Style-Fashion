import { Box, HStack, Input,  Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Payment from "./Payment";

const PaymentModal = ({ subtotal, tax, totalPrice }) => {


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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value, date: dateFinal });
    };

    // ----------- get request for cart data ------- //
    const [cartData, setcartdata] = useState([]);

    const getdata = async () => {
        try {
            let data = await axios.get(`${process.env.REACT_APP_BACKEND_API}/cart`, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            setcartdata(data.data);
        } catch (error) {
            console.log("error in fetching cart data");
        }
    };

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
        for (let i = 0; i < newData.length; i++) {
            let obj = { ...newData[i] };
            delete obj._id;
            delete obj.userId;
            let data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/order/add`, obj, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
            await axios.delete(`${process.env.REACT_APP_BACKEND_API}/cart/delete/${newData[i]._id}`, {
                headers: {
                    Authorization: process.env.REACT_APP_TOKEN,
                },
            });
        }
    };

    return (
        <>
            <Box border={"0px solid red"} w="100%" m="auto" lineHeight={"60px"} textAlign={"center"}>
                <Text fontSize="2xl" fontWeight={500} textAlign={"left"}>
                    Add New Address
                </Text>
                <HStack w={"100%"}>
                    <Input isDisabled={text.full_name == ""} placeholder="City" type="text" name="city" border="2px solid gray" onChange={handleChange} />
                    <Input placeholder="State" type="text" name="state" border="2px solid gray" onChange={handleChange} />
                </HStack>
                <HStack mt={3}>
                    <Input placeholder="Pincode" type="number" name="pincode" border="2px solid gray" onChange={handleChange} />
                </HStack>
                <Input placeholder="Full Address" type="text" name="address" border="2px solid gray" onChange={handleChange} />
            </Box>
            <Box w="100%" onClick={handleClick}>
                <Payment />
            </Box>
        </>
    );
};

export default PaymentModal;
