import { useState } from "react";
import { Input, Button, FormControl, FormLabel, Select, Flex, Stack, Heading, Box } from "@chakra-ui/react";
import axios from "axios";
import AdminSidePage from "../Components/AdminSidePage";

const AddProducts = () => {
    return <AdminSidePage children={<Content />} />;
};

const Content = ({}) => {
    const [title, setTitle] = useState();
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [images1, setImages1] = useState();
    const [images2, setImages2] = useState();
    const [images3, setImages3] = useState();
    const [category, setcategory] = useState();
    const [brand, setBrand] = useState();
    const [type, setType] = useState();
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
        console.log(obj);
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_API}/${type}/add`, obj, {
                headers: {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0ODgxZDg3MWRiODU3OTRhMDRkM2IiLCJpYXQiOjE2ODAyOTQ3Njh9.LIvUk9OHcPtD4ghNFfeujJAp5Cjsv3zmK-a9IeHNmMs",
                },
            });
            console.log("done");
        } catch (error) {
            console.log("error in updating the data");
        }
    };

    return (
        <Box m="20px">
            <Heading mb="20px">Add Product</Heading>
            <Box>
                <Flex direction={"column"}>
                    <form onSubmit={handleSubmit}>
                        <Flex alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
                            </FormControl>

                            <FormControl ml="20px">
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="text"
                                    //   value={}
                                    onChange={(event) => setPrice(+event.target.value)}
                                    required
                                />
                            </FormControl>
                        </Flex>
                        <Flex justifyContent={"space-between"}>
                            <FormControl>
                                <FormLabel>Size</FormLabel>
                                <Select value={size} onChange={(event) => setSize([event.target.value])}>
                                    <option value="xs">extra small</option>
                                    <option value="s">small</option>
                                    <option value="m">medium</option>
                                    <option value="l">large</option>
                                </Select>
                            </FormControl>

                            <FormControl ml={"20px"}>
                                <FormLabel>Color</FormLabel>
                                <Select value={color} onChange={(event) => setColor([event.target.value])}>
                                    <option value="white">white</option>
                                    <option value="blue">blue</option>
                                    <option value="red">red</option>
                                    <option value="yellow">yellow</option>
                                </Select>
                            </FormControl>
                        </Flex>

                        <FormControl>
                            <FormLabel>Image 1</FormLabel>
                            <Input type="url" value={images1} onChange={(event) => setImages1(event.target.value)} isRequired />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image 2</FormLabel>
                            <Input type="url" value={images2} onChange={(event) => setImages2(event.target.value)} isRequired />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Image 3</FormLabel>
                            <Input type="url" value={images3} onChange={(event) => setImages3(event.target.value)} isRequired />
                        </FormControl>
                        <Flex>
                            <FormControl>
                                <FormLabel>type</FormLabel>
                                <Select value={type} onChange={(event) => setType(event.target.value)}>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                </Select>
                            </FormControl>

                            <FormControl ml={4}>
                                <FormLabel>Brand</FormLabel>
                                <Select value={brand} onChange={(event) => setBrand(event.target.value)}>
                                    <option value="Koovs">Koovs</option>
                                    <option value="Nike">Nike</option>
                                    <option value="5ive">5ive</option>
                                    <option value="The Coutour club">The Coutour club</option>
                                </Select>
                            </FormControl>
                        </Flex>

                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select value={category} onChange={(event) => setcategory(event.target.value)}>
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

export default AddProducts;
