import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Box,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const PaymentModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [mobile, setMobile] = useState("");
  console.log(mobile);
  return (
    <>
      <Button
        onClick={onOpen}
        rounded={"none"}
        w={"full"}
        size={"lg"}
        py={"7"}
        bg={"black"}
        color={"white"}
        border="0px solid black"
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(1px)",
          boxShadow: "lg",
          bg: "black",
          color: "white",
        }}
      >
        BUY IT NOW
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Koovs</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid>
              <Box>
                <Tabs m="auto">
                  <TabList
                    justifyContent={"space-between"}
                    p="0px 200px 0px 200px"
                  >
                    <Tab>Mobile</Tab>
                    <Tab>Address</Tab>
                    <Tab>Pay</Tab>
                  </TabList>

                  <TabPanels textAlign={"left"} fontSize="13px">
                    <TabPanel>
                      <Box
                        lineHeight={"100px"}
                        textAlign={"center"}
                        border={"0px solid red"}
                        width={"60%"}
                        m={"auto"}
                        mt={18}
                      >
                        <Text
                          fontSize="2xl"
                          fontWeight={500}
                          textAlign={"center"}
                        >
                          Enter Mobile Number
                        </Text>
                        <InputGroup w={"70%"} m={"auto"}>
                          <InputLeftAddon children="+91" />
                          <Input
                            type="tel"
                            value={mobile}
                            fontSize={"xl"}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </InputGroup>
                        <Button isDisabled={mobile.length < 10} size={"lg"}>
                          Continue
                          <ArrowForwardIcon />{" "}
                        </Button>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <Input placeholder="Pincode" />
                      <HStack>
                        <Input placeholder="City" />
                        <Input placeholder="State" />
                      </HStack>
                      <HStack>
                        <Input placeholder="Full Name" />
                        <Input placeholder="Email Address" />
                      </HStack>
                      <Input placeholder="Full Address" />
                    </TabPanel>
                    <TabPanel>jyy</TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
              <Box></Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
