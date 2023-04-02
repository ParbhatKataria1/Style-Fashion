import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { artistCollabs, shopMens, shopWomens, varsityJackets } from '../homePagedb';
import { Box, Container, IconButton, Stack, Text, HStack, Link, Image, SimpleGrid } from '@chakra-ui/react';
import { ProductCard } from '../Pages/ProductPage';
import { BiRightArrowAlt } from "react-icons/bi";
const Home = () => {

    const responsive = {
        xxLargeDesktop: {
            breakpoint: { max: 4000, min: 3500 },
            items: 5,
            slidesToSlide: 2
        },
        superLargeDesktop: {
            breakpoint: { max: 3500, min: 1024 },
            items: 4,
            slidesToSlide: 2
        },
        desktop: {
            breakpoint: { max: 1024, min: 700 },
            items: 3,
            slidesToSlide: 2
        },
        tablet: {
            breakpoint: { max: 700, min: 450 },
            items: 2,
            slidesToSlide: 2

        },
        mobile: {
            breakpoint: { max: 450, min: 0 },
            items: 1
        }
    };

    return <Box>
        {/* top div */}
        <Container as={Stack} maxW={'6xl'} py={10} gap={'2rem'}>
            <Image src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/10_ARTIST_DESKTOP5.jpg?v=1676618119&width=100% " alt="1" display={{ base: 'none', sm: 'none', md: 'block' }} width="full"/>
            <Image src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/George_thomas_artworks4.jpg?v=1676617973 " alt="1" display={{ md: 'none' }} />
        </Container>

        {/* //shop women's */}
        <Container as={Stack} maxW={'full'} py={10} gap={'2rem'}>
            <Text align={'flex-start'} ml={3} fontWeight={'600'} fontSize={'35px'}>
                Shop Women's
            </Text>
            <Carousel
                as={Stack}
                gap={20}
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                ssr={true}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all 0.5s"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["superLargeDesktop","desktop","tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    shopWomens.map((el) => {
                        return <div className='shopCard_menwomen'>
                            <Link href='/womensAllCloth'>
                                <img src={el.img} alt={el.title} />
                                <HStack justifyContent={'space-between'} px={1.5} py={1}>
                                    <Text>{el.title}</Text>
                                    <IconButton icon={<BiRightArrowAlt size={'25px'} />} borderRadius={'50%'} bg={'blackAlpha.600'} color={'white'} _hover={{ bg: 'black' }} />
                                </HStack>
                            </Link>
                        </div>
                    })
                }
            </Carousel>
        </Container>

        {/* shop men's */}
        <Container as={Stack} maxW={'full'} py={10} gap={'2rem'}>
            <Text align={'flex-start'} ml={3} fontWeight={'600'} fontSize={'35px'}>
                Shop Men's
            </Text>
            <Carousel responsive={responsive}
                padding={'1rem'}
                swipeable={true}
                draggable={true}
                showDots={true}
                ssr={true}
                infinite={true}
                autoPlaySpeed={1000}
                focusOnSelect={true}
                keyBoardControl={true}
                customTransition="all 0.5s"
                transitionDuration={500}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["superLargeDesktop","desktop","tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    shopMens.map((el) => {
                        return <div className='shopCard_menwomen'>
                            <Link href="/mensAllCloth">
                                <img src={el.img} alt={el.title} />
                                <HStack justifyContent={'space-between'} px={1.5} py={1}>
                                    <Text>{el.title}</Text>
                                    <IconButton icon={<BiRightArrowAlt size={'25px'} />} borderRadius={'50%'} bg={'blackAlpha.600'} color={'white'} _hover={{ bg: 'black' }} />
                                </HStack>
                            </Link>
                        </div>
                    })
                }
            </Carousel>
        </Container>

        {/* ImageChanging product div */}
        <Container as={Stack} maxW={'full'} py={10} gap={'1rem'}>
            <Text textAlign={'center'} fontWeight={'600'} fontSize={'30px'}>
                Varsity Jackets
            </Text>
            <Text textAlign={'center'} >The couture club</Text>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                {
                    varsityJackets.map((el) => {
                        return <ProductCard key={(Math.random() * 1000) + el.title} {...el} />
                    })
                }
            </SimpleGrid>
        </Container>

        {/* Artist collabs */}
        <Container as={Stack} maxW={'full'} py={10} gap={'1rem'}>
            <Text textAlign={'center'} fontWeight={'600'} fontSize={'30px'}>
                Artist Collabs
            </Text>
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={8}>
                {
                    artistCollabs.map((el) => {
                        return <ProductCard key={(Math.random() * 1000) + el.title} {...el} />
                    })
                }
            </SimpleGrid>
        </Container>
    </Box>
}


export { Home }
