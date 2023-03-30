import React from "react";
import AdminSidePage from "../Components/AdminSidePage";
import AddProduct from "./AddProduct";

const DashBoard = () => {
  return (
    <div style={{display:"flex",gap:"0px"}}>
      <AdminSidePage />
      <AddProduct/>
    
    </div>
  );
};

export default DashBoard;
