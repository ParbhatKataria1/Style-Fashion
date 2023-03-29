import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import AdminSidePage from "../Components/AdminSidePage";
import ProductItem from "../Components/ProductItemAdmin";

const DashBoard = () => {
  return <AdminSidePage children={<Content />} />;
};

const Content = () => {
  <Box>
    <Heading>DashBoard</Heading>
    <Box>
      <Box></Box>
    </Box>
  </Box>;
};

export default DashBoard;
