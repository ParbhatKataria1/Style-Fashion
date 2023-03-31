import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminSidePage from "../Components/AdminSidePage";
import axios from "axios";
import labels from "labels";

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
  async function getMenData() {
    try {
      let data = await axios.get("https://vast-raincoat-lamb.cyclic.app/men", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNzg5Njd9.RkGF0-COY3dl_FeiJ5evmEcpBs-bkwgzPWhXmPKOnJY",
        },
      });
      // console.log(data.data);
      setmens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  let parentArr = [];
  async function getWomenData() {
    try {
      let data = await axios.get(
        "https://vast-raincoat-lamb.cyclic.app/women",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
          },
        }
      );
      // console.log(data.data);
      setwomens(data.data);
    } catch (error) {
      console.log("error in fetching the data");
    }
  }
  console.log(mens.length, women.length, "length");
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
    console.log(menobj, womenobj);
    parentArr = [];
    for (let key in menobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = womenobj[key] ? womenobj[key] : 0;
      parentArr.push([key, val1, val2]);
    }
    for (let key in womenobj) {
      let val1 = menobj[key] ? menobj[key] : 0;
      let val2 = womenobj[key] ? womenobj[key] : 0;
      if (val1 === 0) parentArr.push([key, val1, val2]);
    }
  }
  console.log(parentArr, "thisis par");
  useEffect(() => {
    getMenData();
    getWomenData();
  }, []);
  console.log();
  labels = parentArr.filter((el) => {
    return el[0];
  });
  console.log(labels, "labels");
  return (
    <div>
      <AdminSidePage />
    </div>
  );
};

export default DashBoard;
