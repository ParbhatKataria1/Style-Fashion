import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductPage";
import FilterDrawer from "../Components/FilterationDrawer";
import axios from "axios";
const WomensProductPage = () => {
  const [num, setNum] = useState(0);
  const [women, setwomens] = useState([]);
  async function getWomenData() {
    try {
      let data = await axios.get(
        "https://vast-raincoat-lamb.cyclic.app/women",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAzNDA4NTV9.R4pvDG4y_6mMweYjUCpaHLJ8n3JDc5TnUB0d8aSPNKI",
          },
        }
      );
      console.log(data.data);
      setwomens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }

  useEffect(() => {
    getWomenData();
  }, []);

  return (
    <Box>
      <Text align="center" fontSize={"43px"} margin={"2rem 0.5rem"}>
        WOMEN ALL COTHING
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
            <Tooltip label="2 columns" placement="top" borderRadius={"5px"}>
              <Button
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
            {women.map((el) => {
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

export { WomensProductPage };
