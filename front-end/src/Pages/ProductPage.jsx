import { HStack, IconButton, Link, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { Tooltip } from '@chakra-ui/react';

const ProductCard = ({ images, img, imgOnHover, brand, price, title, salePrice, regularPrice ,num}) => {

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };

  return <VStack m={'0.5rem'} boxShadow='rgba(0, 0, 0, 0.04) 0px 3px 5px' p={'0.5rem'}>
    <Link href="#">
      <div className="image-wrapper profile-pic">
        <img src={img ? img : images[0]} 
             className="image" 
             alt="normal" 
             height={'280px'} 
             width={num===2?"400px":num===3?"300px":"full"}/>
        <img src={imgOnHover ? imgOnHover : images[1]} className="image-hover" alt="hover" />
        <div className="edit">
          <Tooltip label='Add to Wishlist' placement='left' borderRadius={'5px'}>
            <IconButton
              onClick={handleWishlistClick}
              borderRadius={'50%'}
              _hover={{
                bg: 'black',
                color: 'white'
              }}
              bg={isWishlisted ? 'black' : 'white'}
              color={isWishlisted ? 'white' : 'black'}
              icon={<BsHeart />} />
          </Tooltip>
        </div>
      </div>

      <Text fontSize={'12px'} color={'grey'} mt={2}>
        {brand ? brand : "KOOVS"}
      </Text>
      <Text fontSize={'14.5px'} mt={2} fontWeight={600}>{title}</Text>

      <HStack mt={2} fontSize={'14px'}>
        <Text>{salePrice ? salePrice : `Rs.${price}`}</Text>
        {
          regularPrice ? (<Text textDecoration={'line-through'}>Rs.{regularPrice}</Text>) : (<></>)
        }
      </HStack>
    </Link>
  </VStack>
}

export { ProductCard }