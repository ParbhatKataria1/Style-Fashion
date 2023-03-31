import { MENS_ALL_PRODUCT_SUCCESS, PRODUCT_FAILURE, PRODUCT_REQUEST, WOMENS_ALL_PRODUCT_SUCCESS } from "./actionTypes";

const initialState = {
    isLoading:false,
    mensProduct:[],
    womensProducts:[],
    isError:false
}

export const productReducer = (state = initialState , {type,payload})=>{
    switch(type){
        case PRODUCT_REQUEST:
            return {...state,isLoading:true}
        case PRODUCT_FAILURE:
            return {...state,isLoading:false,isError:true}    
        case MENS_ALL_PRODUCT_SUCCESS:
            return {...state,isLoading:false,mensProduct:payload}
        case WOMENS_ALL_PRODUCT_SUCCESS:
            return {...state,isLoading:false,womensProducts:payload}   
        default : return state    
    }
}