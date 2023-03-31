import { Button, Container, SimpleGrid, Text, Tooltip ,Drawer,Input,Box,HStack,Stack, Image} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductPage";
import FilterDrawer from "../Components/FilterationDrawer"
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { getMensProduct } from "../Redux/ProductReducer.js/action";

const MensProductPage = () => {
    const [num, setNum] = useState(0);
    const dispatch = useDispatch();
    const mensProduct = useSelector((store)=>{
        return store.productReducer.mensProduct;
    });
    
    const loading = useSelector((store)=>{
        console.log("MENS PRODUCT",store.productReducer.isLoading);
        return store.productReducer.isLoading;
    });

    useEffect(()=>{
        dispatch(getMensProduct)
    },[]);


    return <Box>
        <Text align='center' fontSize={'43px'} margin={'2rem 0.5rem'}>
            MEN ALL COTHING
        </Text>
        <Box maxWidth={'8xl'} margin='auto'>
            <HStack justifyContent={'space-between'} gap={'1rem'} pr={'2rem'} border={'0px solid'}>
                <Stack>
                    <FilterDrawer />
                </Stack>
                <HStack>
                    <Tooltip display={{ base: 'none', sm: 'block', md: 'block' }} label='2 columns' placement='top' borderRadius={'5px'}>
                        <Button display={{ base: 'none', sm: 'block', md: 'block' }} onClick={() => { setNum(2) }}>2</Button>
                    </Tooltip>
                    <Tooltip display={{ base: 'none', sm: 'block', md: 'block' }} label='3 columns' placement='top' borderRadius={'5px'}>
                        <Button display={{ base: 'none', sm: 'block', md: 'block' }} onClick={() => { setNum(3) }}>3</Button>
                    </Tooltip>
                    <Tooltip display={{ base: 'none', sm: 'none', md: 'block' }} label='4 columns' placement='top' borderRadius={'5px'}>
                        <Button onClick={() => { setNum(4) }} display={{ base: 'none', sm: 'none', md: 'block' }}  >4</Button>
                    </Tooltip>
                    <Tooltip display={{ base: 'none', sm: 'none', md: 'block' }} label='5 columns' placement='top' borderRadius={'5px'}>
                        <Button onClick={() => { setNum(5) }} display={{ base: 'none', sm: 'none', md: 'block' }} >5</Button>
                    </Tooltip>
                </HStack>
            </HStack>
            <Container as={Stack} maxW={'full'} py={10} gap={'0rem'}>

                <SimpleGrid columns={{
                    base: `${num > 2 || num === 0 ? 1 : num}`,
                    sm: `${num > 3 || num === 0 ? 3 : num}`,
                    md: `${num > 1 || num !== 0 ? num : 4}`
                }}
                    spacing={8}
                    className="grid-container" >
                    {   
                        loading ? (
                            <Image src="https://media2.giphy.com/media/SbR06CH9zLmJeuI30y/200w.webp?cid=ecf05e47fnp61f56gwapnolgiwyyhkpxyc75d37gco1doz5d&rid=200w.webp&ct=s" alt="loading" margin={'auto'}/>
                        ):(
                            mensProduct.map((el) => {
                                return <ProductCard key={(Math.random() * 1000) + el.title} {...el} />
                            })
                        )
                    }
                </SimpleGrid>
            </Container>
        </Box>
    </Box>
}

export {MensProductPage}
