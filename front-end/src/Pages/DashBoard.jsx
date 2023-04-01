import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminSidePage from "../Components/AdminSidePage";
import ProductItem from "../Components/ProductItemAdmin";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let labels = ["January", "February", "March", "April", "May", "June", "July"];

const DashBoard = () => {
  return <AdminSidePage children={<Content />} />;
};

const Content = () => {
  const [mens, setmens] = useState([]);
  const [women, setwomens] = useState([]);

  const dataPie = {
    labels: ["Men", "Women", "Total"],
    datasets: [
      {
        label: "Category Products",
        data: [mens.length, women.length, mens.length + women.length],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(94, 162, 25, 0.2)",
        ],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  async function getMenData() {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/men", {
        params: {
          limit: 100,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyNjM5Njh9.C_59KLK7uaLeOhjmfsCx4MvAI7lDUPm_rFjqMHVospw",
        },
      });
      console.log(data.data);
      setmens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  let parentArr = [];
  async function getWomenData() {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/men", {
        params: {
          limit: 100,
        },
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI2YTNjMTQxMWI4ZTYxMGVhMzJmNTciLCJpYXQiOjE2ODAyNjM5Njh9.C_59KLK7uaLeOhjmfsCx4MvAI7lDUPm_rFjqMHVospw",
        },
      });
      // console.log(data.data);
      setwomens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  // console.log(mens.length, women.length, "length");
  if (mens.length && women.length) {
    let menobj = {},
      womenobj = {};
    for (let i = 0; i < mens.length; i++) {
      let val = mens[i].brand;
      // console.log(mens[i].brand);
      menobj[val] = menobj[val] ? menobj[val] + 1 : 1;
    }
    for (let i = 0; i < women.length; i++) {
      let val = women[i].brand;
      womenobj[val] = womenobj[val] ? womenobj[val] + 1 : 1;
    }
    console.log(menobj, womenobj, "object");
    parentArr = [];
    for (let key in menobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = womenobj[key] ? womenobj[key] : 0;
      parentArr.push([key, val1, val2]);
    }
    for (let key in womenobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = womenobj[key] ? womenobj[key] : 0;
      if (val1 == 0) parentArr.push([key, val1, val2]);
    }
  }

  let data = {
    labels,
    datasets: [
      {
        label: "Mens",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Womens",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  console.log(parentArr, "thisis par");
  useEffect(() => {
    getMenData();
    getWomenData();
  }, []);
  console.log();
  data.labels = parentArr.filter((el) => {
    return el[0];
  });
  console.log(labels, "labels");
  return (
    <Box h="100vh">
      <Heading>DashBoard</Heading>
      <Flex mt="40px" justifyContent={"space-around"}>
        <Box w="750px">
          <Bar options={options} data={data} />
          <Text fontWeight={"bold"}>
            Distribution of Items Among Various Brands
          </Text>
        </Box>
        <Flex direction={"column"} alignItems="space-between" w="270px">
          <Pie data={dataPie} />
          <Text fontWeight={"bold"} mt="40px">
            Distribution of Items Among Mens and Womens
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashBoard;
