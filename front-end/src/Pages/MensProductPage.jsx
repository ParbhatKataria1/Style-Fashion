import {
  Button,
  Container,
  SimpleGrid,
  Text,
  Tooltip,
  Drawer,
  Input,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { BsDash } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { artistCollabs } from "../homePagedb";
import { ProductCard } from "./ProductPage";
// import FilterDrawer from "../Components/FilterationDrawer"
import axios from "axios";
import FilterDrawer from "../Components/FilterationDrawer";

const MensProductPage = () => {
  const [num, setNum] = useState(0);
  const [mens, setmens] = useState([]);
  async function getMenData() {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/men", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
        },
      });
      console.log(data.data);
      setmens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }

  useEffect(() => {
    getMenData();
  }, []);

  console.log(mens);
  console.log("num", num);
  return (
    <Box>
      <Text align="center" fontSize={"43px"} margin={"2rem 0.5rem"}>
        MEN ALL COTHING
      </Text>
      <Box maxWidth={"8xl"} margin="auto">
        <HStack
          justifyContent={"space-between"}
          gap={"1rem"}
          pr={"2rem"}
          border={"0px solid"}
        >
          <Stack>
            <FilterDrawer />
          </Stack>
          <HStack>
            <Tooltip
              display={{ base: "none", sm: "block", md: "block" }}
              label="2 columns"
              placement="top"
              borderRadius={"5px"}
            >
              <Button
                display={{ base: "none", sm: "block", md: "block" }}
                onClick={() => {
                  setNum(2);
                }}
              >
                2
              </Button>
            </Tooltip>
            <Tooltip
              display={{ base: "none", sm: "block", md: "block" }}
              label="3 columns"
              placement="top"
              borderRadius={"5px"}
            >
              <Button
                display={{ base: "none", sm: "block", md: "block" }}
                onClick={() => {
                  setNum(3);
                }}
              >
                3
              </Button>
            </Tooltip>
            <Tooltip
              display={{ base: "none", sm: "none", md: "block" }}
              label="4 columns"
              placement="top"
              borderRadius={"5px"}
            >
              <Button
                onClick={() => {
                  setNum(4);
                }}
                display={{ base: "none", sm: "none", md: "block" }}
              >
                4
              </Button>
            </Tooltip>
            <Tooltip
              display={{ base: "none", sm: "none", md: "block" }}
              label="5 columns"
              placement="top"
              borderRadius={"5px"}
            >
              <Button
                onClick={() => {
                  setNum(5);
                }}
                display={{ base: "none", sm: "none", md: "block" }}
              >
                5
              </Button>
            </Tooltip>
          </HStack>
        </HStack>
        <Container as={Stack} maxW={"full"} py={10} gap={"0rem"}>
          <SimpleGrid
            columns={{
              base: `${num > 2 || num === 0 ? 1 : num}`,
              sm: `${num > 3 || num === 0 ? 3 : num}`,
              md: `${num > 1 || num !== 0 ? num : 4}`,
            }}
            spacing={8}
            className="grid-container"
          >
            {mens.map((el) => {
              return (
                <ProductCard key={Math.random() * 1000 + el.title} {...el} />
              );
            })}
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

export { MensProductPage };
