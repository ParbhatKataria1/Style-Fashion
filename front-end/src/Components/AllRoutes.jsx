import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "../Pages/DashBoard";
import {Home} from "../Pages/Home";
import { MensProductPage } from "../Pages/MensProductPage";
import { WomensProductPage } from "../Pages/WomensProductPage";
import ManageProduct from "../Pages/ManageProduct";
import TrackOrder from "../Pages/TrackOrder";


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/mensAllCloth" element={ <MensProductPage/> }/>
        <Route path="/womensAllCloth" element={ <WomensProductPage/> }/>
        <Route path="/manageProduct" element={<ManageProduct />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
