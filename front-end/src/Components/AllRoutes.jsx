import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../Pages/Cart";
import DashBoard from "../Pages/DashBoard";
import { Home } from "../Pages/Home";
import { MensProductPage } from "../Pages/MensProductPage";
import { WomensProductPage } from "../Pages/WomensProductPage";
import ManageProduct from "../Pages/ManageProduct";
import ProductDetails from "../Pages/ProductDetails";
import TrackOrder from "../Pages/TrackOrder";
import AddProducts from "../Pages/AddProduct";
import Payment from "../Components/Payment";
import PrivateRoute from "./PrivateRoutes";
import Ordered from "../Pages/Ordered";
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
        <Route path="/ordered" element={<Ordered />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route
          path="womensAllCloth/productDetails/:id"
          element={<ProductDetails />}
        />
        <Route
          path="mensAllCloth/productDetails/:id"
          element={<ProductDetails />}
        />
        {/* <PrivateRoute path="/cart" component={Cart} /> */}
        <Route path="/cart" element={<Cart />} />
        {/* <PrivateRoute path="/cart" component={Cart} /> */}
      </Routes>
    </div>
  );
};

export default AllRoutes;
