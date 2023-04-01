import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import "./../";
import { BsSearch } from "react-icons/bs";

// import of slider

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// google

import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode("light");
  const [searchPage, setSearchPage] = useState(false);
  const [menPage, setMenPage] = useState(false);
  const [womenPage, setWomenPage] = useState(false);
  const searchRef = useRef(null);
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const btnRef = React.useRef();

  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      console.log("Clicked outside container");
      // Handle the click outside the container here
      setSearchPage(false);
    } else {
      console.log("Clicked inside container");
    }
    if (
      menRef.current &&
      !menRef.current.contains(event.target) &&
      event.target.name != "men"
    ) {
      setMenPage(false);
      console.log("none");
    }
    if (
      womenRef.current &&
      !womenRef.current.contains(event.target) &&
      event.target.name != "women"
    ) {
      setWomenPage(false);
      console.log("none");
    }
  }

  function handleOption(value, e) {
    if (value == "men") {
      setMenPage(true);
      setWomenPage(false);
      console.log("men");
    } else if (value == "women") {
      setMenPage(false);
      setWomenPage(true);
      console.log("woemn");
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(user, "this");
  return (
    <Box borderBottom="2px solid black">
      {/* <Button onClick={toggleColorMode}></Button> */}
      <Box
        boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px;"}
        h={{ base: "130px", md: "90px" }}
        border="1px solid red"
      >
        <Flex
          position={"fixed"}
          bg="white"
          top="0px"
          zIndex={"50"}
          h={{ base: "130px", md: "90px" }}
          left="50%"
          w="100%"
          justifyContent={"center"}
          transform="translate(-50%)"
        >
          <Flex
            bg="white"
            w="95%"
            justifyContent={"space-between"}
            mt="20px"
            pb="15px"
          >
            <DrawerExample
              btnRef={btnRef}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />

            <Button
              display={{ base: "unset", xl: "none" }}
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              <HamburgerIcon />
            </Button>

            <Flex
              display={{ base: "none", xl: "flex" }}
              justifyContent={"space-between"}
              border="1px solid red"
              w="37%"
            >
              <Flex
                h="40px"
                px={4}
                justifyContent="space-between"
                cursor="pointer"
                alignItems="center"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ borderColor: "gray.100" }}
                _expanded={{ borderColor: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Text
                  name="men"
                  onClick={(e) => {
                    handleOption("men", e);
                  }}
                >
                  Mens
                </Text>
                <ChevronDownIcon />
              </Flex>

              <Flex
                h="40px"
                px={4}
                justifyContent="space-between"
                cursor="pointer"
                alignItems="center"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ borderColor: "gray.100" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Text
                  name="women"
                  onClick={(e) => {
                    handleOption("women", e);
                  }}
                >
                  Womens
                </Text>
                <ChevronDownIcon />
              </Flex>

              <Flex
                h="40px"
                px={4}
                justifyContent="space-between"
                cursor="pointer"
                alignItems="center"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ borderColor: "gray.100" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Text border={"1px solid green"} w="100px">
                  Artist Collab
                </Text>
                <ChevronDownIcon />
              </Flex>

              <Flex
                h="40px"
                px={4}
                justifyContent="space-between"
                cursor="pointer"
                alignItems="center"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ borderColor: "gray.100" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                <Text>Collections</Text>
                <ChevronDownIcon />
              </Flex>
            </Flex>
            <Flex
              justifyContent={{ base: "end", md: "center" }}
              alignItems="end"
              border="1px solid red"
              w={{ base: "60%", md: "20%" }}
            >
              <Image
                id="1"
                border="1px solid red"
                mb={{ base: "0px", md: "-35px" }}
                pb="0px"
                w="130px"
                src="unit6Logo.png"
              ></Image>
            </Flex>
            <Flex
              alignItems={"center"}
              border="1px solid red"
              display={{ base: "none", md: "flex" }}
              w="37%"
              justifyContent={{ lg: "space-between", xl: "end" }}
            >
              <RightOption
                setSearchPage={setSearchPage}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                user={user}
                logout={logout}
              />
            </Flex>
          </Flex>

          <Box w="100%" top="90px" position={"fixed"}>
            <Flex
              w="100%"
              alignItems={"center"}
              zIndex="200"
              display={{ base: "flex", md: "none" }}
              border="1px solid red"
              // w="37%"
              justifyContent="space-around"
            >
              <RightOption
                setSearchPage={setSearchPage}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                user={user}
                logout={logout}
              />
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box>
        {searchPage && (
          <Box
            opacity="3"
            pt="15px"
            ref={searchRef}
            bg="white"
            w="100%"
            position={"fixed"}
            top="0px"
            zIndex={"10"}
          >
            <Flex
              w="90%"
              h="70px"
              m="auto"
              alignItems={"center"}
              direction={{ base: "column", md: "row" }}
              justifyContent={"space-between"}
            >
              <Flex>
                <Image
                  border="1px solid red"
                  mb="-25px"
                  pb="0px"
                  w="130px"
                  src="unit6Logo.png"
                ></Image>
              </Flex>
              <Flex w={{ base: "100%", md: "40%" }}>
                <InputGroup>
                  <Input type="text" placeholder="Search" />
                  <InputRightElement
                    pointerEvents="none"
                    children={<BsSearch color="gray.300" />}
                  />
                </InputGroup>
              </Flex>
              <Flex
                w={{ base: "100%", md: "40%" }}
                mt={{ base: "10px", md: "0px" }}
                alignItems={"center"}
                justifyContent={{ base: "space-between", md: "end" }}
              >
                <Flex mx="10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <Text ml="5px">WishList</Text>
                </Flex>
                <Flex mx="10px">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-17l-3.431 14h-2.102l2.541-11h-16.812l4.615 13h13.239l3.474-14h2.178l.494-2h-4.196z" />
                  </svg>
                  <Text ml="5px">Cart</Text>
                </Flex>
                <Flex mx="10px">
                  {!isAuthenticated && (
                    <Button size="sm" onClick={() => loginWithRedirect()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                      </svg>
                      <Text ml="10px">Sign In</Text>
                    </Button>
                  )}

                  {isAuthenticated && (
                    <Flex p="9px">
                      <Image
                        borderRadius={"50%"}
                        w="25px"
                        src={user.picture}
                      ></Image>
                      <Text fontWeight={"bold"} ml="8px">
                        {user.given_name}
                      </Text>
                      <Flex
                        cursor={"pointer"}
                        textDecoration="underline"
                        ml="5px"
                        alignItems="center"
                        fontWeight={"bold"}
                        fontSize={"10px"}
                        onClick={() =>
                          logout({
                            logoutParams: { returnTo: window.location.origin },
                          })
                        }
                      >
                        /logout
                      </Flex>
                    </Flex>
                  )}
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
                  </svg> */}
                </Flex>
              </Flex>
            </Flex>

            <Box
              w="90%"
              m="auto"
              mt={{ base: "120px", md: "20px" }}
              pt="20px"
              overflowX={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Carousel responsive={responsive}>
                {Array(8)
                  .fill(0)
                  .map((el) => {
                    return (
                      <div key={`${Math.random() + Date.now()}`}>
                        <Box w="400px">
                          <Image
                            borderRadius={"8px"}
                            w="200px"
                            src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/KOOVS_20OCT22-0187.jpg?v=1677062982&width=300"
                          />
                          <Box
                            textAlign={"left"}
                            fontSize={"14px"}
                            fontWeight={"bold"}
                          >
                            <Text mt="7px">Ned Joggers</Text>
                            <Text mt="7px">Rs. 1,490.00</Text>
                          </Box>
                        </Box>
                      </div>
                    );
                  })}
              </Carousel>
            </Box>
          </Box>
        )}
        <Box
          h={`${searchPage ? "100vh" : "0vh"}`}
          bg={`${searchPage ? "black" : "none"}`}
          opacity=".25"
        ></Box>
      </Box>
      {menPage && (
        <Box
          w="100%"
          position={"fixed"}
          top="90px"
          ref={menRef}
          name="men"
          zIndex={"100"}
          bg="white"
          onClick={(e) => {
            handleOption("men", e);
          }}
        >
          <MensOption />
        </Box>
      )}
      {womenPage && (
        <Box
          w="100%"
          position={"fixed"}
          top="90px"
          zIndex={"100"}
          bg="white"
          ref={womenRef}
          name="women"
          onClick={(e) => {
            handleOption("women", e);
          }}
        >
          <WomensOption />
        </Box>
      )}
    </Box>
  );
};

const RightOption = ({
  setSearchPage,
  isAuthenticated,
  loginWithRedirect,
  user,
  logout,
}) => {
  return (
    <Flex
      w={{ md: "100%", xl: "70%" }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Flex
        border={"1px solid red"}
        cursor="pointer"
        onClick={() => {
          setSearchPage(true);
        }}
        mx="10px"
        justifyContent={"space-around"}
      >
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
        </svg>
      </Flex>
      <Flex mx="10px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
        <Text ml="5px">WishList</Text>
      </Flex>
      <Flex mx="10px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path d="M10 20.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-17l-3.431 14h-2.102l2.541-11h-16.812l4.615 13h13.239l3.474-14h2.178l.494-2h-4.196z" />
        </svg>
        <Text ml="5px">Cart</Text>
      </Flex>
      <Flex mx="10px">
        {!isAuthenticated && (
          <Button size="sm" onClick={() => loginWithRedirect()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z" />
            </svg>
            <Text ml="10px">Sign In</Text>
          </Button>
        )}
        {isAuthenticated && (
          <Flex p="9px">
            <Image borderRadius={"50%"} w="25px" src={user.picture}></Image>
            <Text fontWeight={"bold"} ml="8px">
              {user.given_name}
            </Text>
            <Flex
              cursor={"pointer"}
              textDecoration="underline"
              ml="5px"
              alignItems="center"
              fontWeight={"bold"}
              fontSize={"10px"}
              onClick={() =>
                logout({
                  logoutParams: { returnTo: window.location.origin },
                })
              }
            >
              /logout
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

function DrawerExample({ isOpen, onOpen, onClose, btnRef }) {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
            <Flex
              mt="8px"
              h="40px"
              px={4}
              justifyContent="space-between"
              cursor="pointer"
              alignItems="center"
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ borderColor: "gray.100" }}
              _expanded={{ borderColor: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <Text>Mens</Text>
              <ChevronRightIcon />
            </Flex>

            <Flex
              h="40px"
              mt="8px"
              px={4}
              justifyContent="space-between"
              cursor="pointer"
              alignItems="center"
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ borderColor: "gray.100" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <Text>Womens</Text>
              <ChevronRightIcon />
            </Flex>

            <Flex
              mt="8px"
              h="40px"
              px={4}
              justifyContent="space-between"
              cursor="pointer"
              alignItems="center"
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ borderColor: "gray.100" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <Text border={"1px solid green"} w="100px">
                Artist Collab
              </Text>
              <ChevronRightIcon />
            </Flex>

            <Flex
              mt="8px"
              h="40px"
              px={4}
              justifyContent="space-between"
              cursor="pointer"
              alignItems="center"
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ borderColor: "gray.100" }}
              _expanded={{ bg: "blue.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <Text>Collections</Text>
              <ChevronRightIcon />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const MensOption = () => {
  return (
    //     Jackets & Coats
    // Hoodies & Sweatshirts
    // Sweatpants
    // Shorts
    // Co-ord sets
    <>
      <Box w="90%" m="auto">
        <Flex pt="20px" justifyContent={"space-between"} textAlign={"left"}>
          <Box>
            <Text fontWeight={"bold"}>Clothing</Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              New In
            </Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              T-Shirts
            </Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Jackets & Coats
            </Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Hoodies & Sweatshirts
            </Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sweatpants
            </Text>
            <Text
              pt="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Shorts
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Co-ord sets
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              fontWeight={"bold"}
            >
              Footers
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              View all
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sneakers
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Slides
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              mt="8px"
              fontWeight={"bold"}
            >
              Accessories
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sunglasses
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Caps & Hats
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Pins
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              mt="8px"
              fontWeight={"bold"}
            >
              Brands
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Essentials by koovs
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              BALL Copenhagen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Bravesoul
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              The couture club
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Arkk copenhagen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              SHU
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Nike
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Tigerbear
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Keen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              5ive
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Kangol
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Comatoes
            </Text>
          </Box>
          <Box w="30%">
            <Image
              w="100%"
              src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Screenshot_2022-11-10_at_5.37.53_PM.png?v=1668083230&width=533"
            ></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const WomensOption = () => {
  return (
    //     Jackets & Coats
    // Hoodies & Sweatshirts
    // Sweatpants
    // Shorts
    // Co-ord sets
    <>
      <Box w="90%" m="auto">
        <Flex pt="20px" justifyContent={"space-between"} textAlign={"left"}>
          <Box>
            <Text fontWeight={"bold"}>Clothing</Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              New In
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              View All
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Lounge & sleep wear
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Lingerie & innerwear
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              T-Shirts
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              SweatShirts
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sports Bra
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              fontWeight={"bold"}
            >
              Shoes
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              New In
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sneakers
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Heels
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Boots
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              mt="8px"
              fontWeight={"bold"}
            >
              Brands
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Tigerbear
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Bravesoul
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Koovs sport
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Koovs
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Public Desire
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Keen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Shu
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Arkk copenhagen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Nike
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Ball Copenhagen
            </Text>
          </Box>
          <Box>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              transition={"all .2s ease"}
              mt="8px"
              fontWeight={"bold"}
            >
              Accessories
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Sunglasses
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Pins
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Caps & Hats
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              The couture club
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              Arkk copenhagen
            </Text>
            <Text
              p="5px"
              borderRadius={"4px"}
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              transition={"all .2s ease"}
              mt="8px"
            >
              SHU
            </Text>
          </Box>
          <Box w="30%">
            <Image
              w="100%"
              src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Screenshot_2022-11-10_at_6.09.16_PM.png?v=1668083985&width=533"
            ></Image>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
