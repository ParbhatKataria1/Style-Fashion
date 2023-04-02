import React from "react";
import { Navigate, Route } from "react-router-dom";
import { MyContext } from "../context/AuthUseContext";

const PrivateRoute = ({ component: Component }) => {
  const { user, loginWithRedirect, isAuthenticated, logout } =
    React.useContext(MyContext);
  console.log("private router", isAuthenticated);
  return <Route render={(props) => <Navigate to="/" />} />;
};
export default PrivateRoute;
