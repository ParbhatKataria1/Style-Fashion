import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../Pages/Cart";
import DashBoard from "../Pages/DashBoard";
import {Home} from "../Pages/Home";
import { MensProductPage } from "../Pages/MensProductPage";
import { WomensProductPage } from "../Pages/WomensProductPage";
import ManageProduct from "../Pages/ManageProduct";
import ProductDetails from "../Pages/ProductDetails";
import TrackOrder from "../Pages/TrackOrder";
import AddProducts from "../Pages/AddProduct";
import Payment from "../Components/Payment";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addProduct" element={<AddProducts />} />
        <Route path="/mensAllCloth" element={<MensProductPage />} />
        <Route path="/womensAllCloth" element={<WomensProductPage />} />
        <Route path="/manageProduct" element={<ManageProduct />} />
        <Route path="/trackOrder" element={<TrackOrder />} />

        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/help" element={<Payment />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
