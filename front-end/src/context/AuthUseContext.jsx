import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const MyContext = React.createContext();

function MyProvider(props) {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <MyContext.Provider
      value={{
        user,
        loginWithRedirect,
        isAuthenticated,
        logout,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}
export default MyProvider;
