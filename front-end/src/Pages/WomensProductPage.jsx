import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ProductCard } from "./ProductPage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getWomensProduct } from "../Redux/ProductReducer.js/action";
import FilterWomensProduct from "../Components/FilterationWomensProduct";
import { Link } from "react-router-dom";

const WomensProductPage = () => {
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [sortOrder, setSortOrder] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // console.log(location)
  const allParamsObj = {
    params: {
      category: searchParams.getAll("category"),
      brand: searchParams.getAll("brand"),
      max: searchParams.get("max"),
      min: searchParams.get("min"),
      page: searchParams.get("page"),
    },
  };

  const changePage = (e) => {
    let temp = typeof e !== "number" ? Number(e.target.innerText) : e;
    setPageNumber(temp);
  };

  const womensProduct = useSelector((store) => {
    // console.log("WOMENS PRODUCT", store.productReducer);
    return store?.productReducer?.womensProducts?.data;
  });

  useEffect(() => {
    dispatch(getWomensProduct(allParamsObj));
  }, [location.search]);

  const sortedWomensProduct = womensProduct?.sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return womensProduct;
    }
  });

  return (
    <Box mb="30px">
      <Text align="center" fontSize={"43px"} margin={"2rem 0.5rem"}>
        WOMEN ALL COTHING
      </Text>
      <Box maxWidth={"8xl"} margin="auto">
        {/* sorting and filteration bar */}
        <HStack
          justifyContent={"space-between"}
          gap={"1rem"}
          p={"2rem"}
          border={"0px solid"}
        >
          {/* Filteration */}
          <HStack border={"0px solid"} gap={"1rem"}>
            <FilterWomensProduct page={pageNumber} />

            {/* FEATURES */}
            <Menu>
              <MenuButton>
                <Button>Features</Button>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setSortOrder("lowToHigh");
                  }}
                >
                  Low to High
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    setSortOrder("highToLow");
                  }}
                >
                  High to Low
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>

          {/* columns grid */}
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

        {/* Product mapping */}
        <Container as={Stack} maxW={"full"} py={10} gap={"0rem"}>
          <SimpleGrid
            columns={{
              base: `${num >= 2 || num === 0 ? 1 : num}`,
              sm: `${num > 3 || num === 0 ? 3 : num}`,
              md: `${num > 1 || num !== 0 ? num : 4}`,
            }}
            spacing={8}
            className="grid-container"
          >
            {sortedWomensProduct?.map((el) => {
              return (
                <Link to={`productDetails/${el._id}`}>
                  {" "}
                  <ProductCard key={el._id} {...el} num={num} />
                </Link>
              );
            })}
          </SimpleGrid>
        </Container>

        <HStack>
          <HStack margin={"auto"}>
            <Button
              isDisabled={pageNumber === 1}
              onClick={() => changePage(pageNumber - 1)}
            >
              Prev
            </Button>

            {Array(4)
              .fill(-1)
              .map((el, ind) => {
                return (
                  <Button
                    isDisabled={ind + 1 === pageNumber}
                    onClick={changePage}
                    key={ind + 1}
                  >
                    {ind + 1}
                  </Button>
                );
              })}

            <Button
              isDisabled={pageNumber === 4}
              onClick={() => changePage(pageNumber + 1)}
            >
              Next
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export { WomensProductPage };
