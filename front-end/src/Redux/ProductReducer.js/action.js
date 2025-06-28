import { CART_COUNT, MENS_ALL_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST, WOMENS_ALL_PRODUCT_SUCCESS } from "./actionTypes";
import axios from "axios";

export const productRequest = () => {
    return { type: PRODUCT_REQUEST };
};
export const productFailure = () => {
    return { type: PRODUCT_FAILURE };
};
export const mensAllProductRequest = (payload) => {
    return { type: MENS_ALL_PRODUCT_SUCCESS, payload };
};

export const womensAllProductRequest = (payload) => {
    return { type: WOMENS_ALL_PRODUCT_SUCCESS, payload };
};

export const cartItem = (payload) => {
    return { type: CART_COUNT, payload };
};

export const getMensProduct = (allParamsObj) => (dispatch) => {
    dispatch(productRequest());
    axios
        .get(`${process.env.REACT_APP_BACKEND_API}/men`, {
            params: allParamsObj.params,
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
            },
        })
        .then((res) => {
            dispatch(mensAllProductRequest(res));
        })
        .catch(() => {
            dispatch(productFailure());
        });
};

export const getWomensProduct = (allParamsObj) => (dispatch) => {
    dispatch(productRequest());
    axios
        .get(`${process.env.REACT_APP_BACKEND_API}/women`, {
            params: allParamsObj.params,
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
            },
        })
        .then((res) => {
            dispatch(womensAllProductRequest(res));
        })
        .catch(() => {
            dispatch(productFailure());
        });
};
