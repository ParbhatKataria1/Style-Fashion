import { MENS_ALL_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST, WOMENS_ALL_PRODUCT_SUCCESS } from "./actionTypes"
import axios from 'axios';

export const productRequest = ()=>{
    return {type :PRODUCT_REQUEST}
}
export const productFailure = ()=>{
    return {type :PRODUCT_FAILURE}
}
export const mensAllProductRequest = (payload) =>{
    return {type:MENS_ALL_PRODUCT_SUCCESS,payload}
}

export const womensAllProductRequest = (payload) =>{
    return {type:WOMENS_ALL_PRODUCT_SUCCESS,payload}
}

export const getMensProduct = (dispatch) =>{
    dispatch(productRequest());
    axios.get("https://vast-raincoat-lamb.cyclic.app/men",{
        headers: {
            Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
        },
    }).then((res)=>{
        console.log(res.data,"from action .js")
        dispatch(mensAllProductRequest(res.data))
    }).catch(()=>{
        dispatch(productFailure());
    })
}
export const getWomensProduct = (dispatch) =>{
    dispatch(productRequest());
    axios.get("https://vast-raincoat-lamb.cyclic.app/women",{
        headers: {
            Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDI0YTg3YmQwM2ZiYThkMTdjZGNlYTIiLCJpYXQiOjE2ODAxNjQzMjh9.HxbaR7TJuAHUlSYsAmOhxqryMwRYZSTnxn3_SrF_A7Q",
        },
    }).then((res)=>{
        dispatch(womensAllProductRequest(res))
    }).catch(()=>{
        dispatch(productFailure());
    })
}