import { useState } from "react";
import {
    Input,
    Button,
    FormControl,
    FormLabel,
    Select,
    Flex,
    Stack,
    Heading,
    Box,
} from "@chakra-ui/react";


const AddProducts = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(null);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [images1, setImages1] = useState([]);
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("Mens");


    const product = {
        title,
        price,
        size,
        color,
        images1,
        brand,
        type
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "men") {
            fetch("https://vast-raincoat-lamb.cyclic.app/men/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI1OTE2ZWJmODY5NWUwMTgxODBiMWIiLCJpYXQiOjE2ODAxOTI4Mjl9.EdEOpRxiFT2fuOQ2XA8sLgus8Lm_uffNBSGmsClLslc"
                },
                body: JSON.stringify(product)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    alert(res.msg)
                })
                .catch(err => console.log(err.message))
        }
        else if (type === "women") {
            fetch("https://vast-raincoat-lamb.cyclic.app/women/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI1OTE2ZWJmODY5NWUwMTgxODBiMWIiLCJpYXQiOjE2ODAxOTI4Mjl9.EdEOpRxiFT2fuOQ2XA8sLgus8Lm_uffNBSGmsClLslc"
                },
                body: JSON.stringify(product)
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    alert(res.msg)
                })
                .catch(err => console.log(err.message))
        }
    }


    return (
        <Box style={{ marginLeft: "120px", width: "1000px" }}>
            <Heading fontWeight={"thiner"} as="h2" size="xl" mb={"30px"}>
                Add products
            </Heading>
            <Box>
                <Flex direction={"column"} h="100vh">
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Price</FormLabel>
                            <Input
                                type="text"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                required
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Size</FormLabel>
                            <Select
                                value={size}
                                onChange={(event) => setSize(event.target.value)}
                            >
                                <option value="xs">extra small</option>
                                <option value="s">small</option>
                                <option value="m">medium</option>
                                <option value="l">large</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Color</FormLabel>
                            <Select
                                value={color}
                                onChange={(event) => setColor(event.target.value)}
                            >
                                <option value="white">white</option>
                                <option value="blue">blue</option>
                                <option value="red">red</option>
                                <option value="yellow">yellow</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image 1</FormLabel>
                            <Input
                                type="url"
                                value={images1[0]}
                                onChange={(event) => setImages1([event.target.value])}
                                isRequired
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image 2</FormLabel>
                            <Input
                                type="url"
                                value={images1[1]}
                                onChange={(event) => setImages1([event.target.value])}
                                isRequired
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image 3</FormLabel>
                            <Input
                                type="url"
                                value={images1[2]}
                                onChange={(event) => setImages1([event.target.value])}
                                isRequired
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>type</FormLabel>
                            <Select
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <option value="Mens">Men</option>
                                <option value="Womens">Women</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Brand</FormLabel>
                            <Input
                                type="text"
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                            />
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

export default AddProducts;