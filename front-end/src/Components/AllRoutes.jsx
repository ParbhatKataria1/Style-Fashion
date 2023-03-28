import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import Home from "../Pages/Home";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
