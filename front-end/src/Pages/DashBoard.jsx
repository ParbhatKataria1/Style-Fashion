import { Box, Flex, Heading } from "@chakra-ui/react";
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

const DashBoard = () => {
  return <AdminSidePage children={<Content />} />;
};

const Content = () => {
  const [mens, setmens] = useState([]);
  const [women, setwomens] = useState([]);
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
  let parentArr = [];
  async function getWomenData() {
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
  if (mens.length && women.length) {
    let menobj = {},
      womenobj = {};
    for (let i = 0; i < mens.length; i++) {
      let val = menobj[mens[i].type];
      menobj[val] = menobj[val] ? menobj[val] + 1 : 1;
    }
    for (let i = 0; i < women.length; i++) {
      let val = womenobj[mens[i].type];
      womenobj[val] = womenobj[val] ? womenobj[val] + 1 : 1;
    }
    parentArr = [];
    for (let key in menobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = women[key] ? women[key] : 0;
      parentArr.push([key, val1, val2]);
    }
    for (let key in menobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = women[key] ? women[key] : 0;
      if (val1 == 0) parentArr.push([key, val1, val2]);
    }
  }

  useEffect(() => {
    getMenData();
    getWomenData();
  }, []);
  console.log();

  return (
    <Box h="100vh">
      <Heading>DashBoard</Heading>
      <Flex mt="40px" justifyContent={"space-around"}>
        <Box w="700px">
          <Bar options={options} data={data} />
        </Box>
        <Box>
          <Pie data={dataPie} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DashBoard;

export const options = {
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
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const dataPie = {
  labels: ["Men", "Women"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};
