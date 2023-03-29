import { Box, Button, Container, HStack, SimpleGrid, Stack, Text, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { artistCollabs } from "../db"
import { ProductCard } from "./ProductPage"

const Mens_ProductPage = ()=>{
    const [num,setNum]=useState(0);
    function changeColumns(numColumns) {
       return numColumns
      }
    return <Box>
        <Text align='center' fontSize={'43px'} margin={'2rem 0.5rem'}>
            MEN ALL COTHING
        </Text>
        <Box maxWidth={'8xl'} margin='auto'>
            <HStack justifyContent={'flex-end'} gap={'1rem'} pr={'2rem'} border={'0px solid'}>
                {/* <Tooltip  label='1 column' placement='top' borderRadius={'5px'}>
                <Button onClick={()=>{setNum(1)}}>1</Button>
                </Tooltip> */}
                <Tooltip label='2 columns' placement='top' borderRadius={'5px'}>
                <Button onClick={()=>{setNum(2)}}>2</Button>
                </Tooltip>
                <Tooltip display={{base:'none',sm:'block',md:'block'}} label='3 columns' placement='top' borderRadius={'5px'}>
                <Button display={{base:'none',sm:'block',md:'block'}} onClick={()=>{setNum(3)}}>3</Button>
                </Tooltip>
                <Tooltip display={{base:'none',sm:'none',md:'block'}} label='4 columns' placement='top' borderRadius={'5px'}>
                <Button onClick={()=>{setNum(4)}}  display={{base:'none',sm:'none',md:'block'}}  >4</Button>
                </Tooltip>
                <Tooltip display={{base:'none',sm:'none',md:'block'}} label='5 columns' placement='top' borderRadius={'5px'}>
                <Button onClick={()=>{setNum(5)}} display={{base:'none',sm:'none',md:'block'}} >5</Button>
                </Tooltip>
            </HStack>
            <Container as={Stack} maxW={'full'} py={10} gap={'0rem'}>
            
                <SimpleGrid columns={{ base: `${num>0 ? num : 2}`, sm: `${num>0 ? num : 3}`, md: `${num>0 ? num : 5}` }} spacing={8}  className="grid-container" >
                   {
                    artistCollabs.map((el)=>{
                        return <ProductCard key={(Math.random()*1000)+el.title} {...el} />
                    })
                    }
                </SimpleGrid>
            </Container>
        </Box>
    </Box>
}

export {Mens_ProductPage}