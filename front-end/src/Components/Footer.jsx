import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  Image,
  useColorModeValue,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { MdMailOutline, MdOutlineSupportAgent } from "react-icons/md";
import { BsTruck, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
// import AppStoreBadge from '@/components/AppStoreBadge';
// import PlayStoreBadge from '@/components/PlayStoreBadge';

const brandImage = [
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/koovs_logo_for_brand_page-03.jpg?v=1668331785&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/essentials_logo-02.jpg?v=1668331830&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/kangol_logo-01.jpg?v=1668331868&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logo-01.png?v=1668331907&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logo-02.png?v=1668331923&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Ball_logo.jpg?v=1668332152&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/logo-04.jpg?v=1668332188&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/logo-02.jpg?v=1668332226&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logos_n-08.jpg?v=1668332439&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logos_n-07.jpg?v=1668332432&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logos_n-09.jpg?v=1668332464&width=360',
  'https://cdn.shopify.com/s/files/1/0677/1464/6315/files/brand_logos_3951c2d8-141f-43a4-8065-9cca52dac9dd.jpg?v=1668332482&width=360'
]

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({children, label,href}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box>
      <hr/>
      <Box>
      <Container as={Stack} maxW={'6xl'} py={10} gap={'2rem'}>
        <Text align={'center'} fontWeight={'600'} fontSize={'40px'} mb={'2rem'}>
            Brands on StyleVibe
        </Text>
        <hr/>
        <SimpleGrid columns={{ base: 3, sm: 4, md: 8 }} spacing={8} >
          {
            brandImage.map((el,i)=>{
              return <Stack>
              <Image src={el} alt={'i'} />
              </Stack>
            })
          }
        </SimpleGrid>
      </Container>
      </Box>
      <hr/>
      <Container as={Stack} maxW={'6xl'} py={10} align={'center'}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={12} justifyContent={'space-evenly'} >

          <Stack align={'flex-start'} bg={useColorModeValue('gray.50', 'gray.900')} borderRadius={'10px'} padding={'0.5rem'}>
            <Text fontWeight={600}
            fontSize={{  sm:'16px', md: '17px' }}
            ><IconButton
               bg={useColorModeValue('gray.50', 'gray.900')}
               _hover={{
                bg: useColorModeValue('gray.50', 'gray.900'),
              }}
               icon={<BsTruck/>}/>
               Free Shipping</Text>
            <Text fontSize={{  sm:'13px', md: '15px' }} color={'#718096'}>For orders above INR 1500</Text>
          </Stack>

          <Stack align={'flex-start'} bg={useColorModeValue('gray.50', 'gray.900')} borderRadius={'10px'} padding={'0.5rem'}>
            <Text  fontWeight={600} fontSize={{  sm:'16px', md: '17px' }}><IconButton
               bg={useColorModeValue('gray.50', 'gray.900')}
               _hover={{
                bg: useColorModeValue('gray.50', 'gray.900'),
              }}
               icon={<GiReceiveMoney/>}/>
               Money Gaurantee</Text>
            <Text fontSize={{  sm:'13px', md: '15px' }} color={'#718096'}>Within 30 days for an exchange.</Text>
          </Stack>

          <Stack align={'flex-start'} bg={useColorModeValue('gray.50', 'gray.900')} borderRadius={'10px'} padding={'0.5rem'}>
            <Text fontWeight={600} fontSize={{sm:'16px', md: '17px' }}>
              <IconButton
              bg={useColorModeValue('gray.50', 'gray.900')}
              _hover={{
               bg: useColorModeValue('gray.50', 'gray.900'),
             }}
               icon={<MdOutlineSupportAgent/>}/>
              Online Support</Text>
            <Text fontSize={{  sm:'13px', md: '15px' }}  color={'#718096'}>10 AM - 6 PM, Mon - Sat</Text>
          </Stack>

          <Stack align={'flex-start'} bg={useColorModeValue('gray.50', 'gray.900')} borderRadius={'10px'} padding={'0.5rem'}>
            <Text fontWeight={600} fontSize={{ sm:'16px', md: '17px' }}>
            <IconButton
               bg={useColorModeValue('gray.50', 'gray.900')}
               _hover={{
                bg: useColorModeValue('gray.50', 'gray.900'),
              }}
               icon={<BsFillCreditCard2FrontFill/>}/>
              Flexible Payment
              </Text>
            <Text fontSize={{  sm:'13px', md: '15px' }}  color={'#718096'}>Pay with Multiple Credit Cards</Text>
          </Stack>

        </SimpleGrid>
      </Container>
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align={'flex-start'}>
            <ListHeader>About</ListHeader>
            <Link href={'#'} color={'#718096'}>Our Story</Link>
            <Link href={'#'} color={'#718096'}>Contact Us</Link>
            <Link href={'#'} color={'#718096'}>Careers</Link>
            <Link href={'#'} color={'#718096'}>Privacy policy</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'} color={'#718096'}>Payment</Link>
            <Link href={'#'} color={'#718096'}>Return/Exchange</Link>
            <Link href={'#'} color={'#718096'}>Shipment</Link>
            <Link href={'#'} color={'#718096'}>Terms & conditions</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Customer care</ListHeader>
            <Link href={'#'} color={'#718096'}>Timings: 10AM - 6PM(Mon -Sat)</Link>
            <Link href={'#'} color={'#718096'}>Call: +91 7011263423</Link>
            <Link href={'#'} color={'#718096'}>E-Mail: care@stylevibes.com</Link>
          </Stack>

          <Stack align={'flex-start'}>
            {/* <ListHeader>Install App</ListHeader> */}
            {/* <AppStoreBadge />
            <PlayStoreBadge /> */}
            <ListHeader>Subscribe</ListHeader>
            <Text color={'#718096'}>Enter your email below to be the first to know about new collections and product launches.</Text>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<MdMailOutline/>}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}>
          <Text  color={'#718096'}>© NEWBRAVE VENTURE PRIVATE LIMITED</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  </Box>
  );
}