import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import {Provider} from 'react-redux';
import { store } from './Redux/ProductReducer.js/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ChakraProvider>
      <Auth0Provider
        domain="dev-xtr2nsfklsrd66w8.us.auth0.com"
        clientId="sl3rV7phfia6e8uEGyQAngcChsH7GPRz"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}>
        }}
      >
        {/* <Provider> */}
          <BrowserRouter>
            <Provider store={store}>
             <App />
            </Provider>
          </BrowserRouter>
        {/* </Provider> */}
      </Auth0Provider>
    </ChakraProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
