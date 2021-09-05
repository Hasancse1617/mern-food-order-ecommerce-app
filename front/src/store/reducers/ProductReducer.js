import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, REMOVE_PRODUCT_MESSAGE, SET_HOT_PRODUCTS, SET_PRICE, SET_PRODUCTS, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_RELATED_PRODUCT, SET_SINGLE_PRODUCT } from "../types/ProductType"

const initState = {
    loading: false,
    products: [],
    count: '',
    perPage: '',
    hotProducts: [],
    product: [],
    relatedproducts: [],
    attrprice: 0,
    productErrors: [],
    message: "",
}

const ProductReducer = (state=initState, action) =>{
    if(action.type === SET_PRODUCT_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_PRODUCT_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_PRODUCTS){
        return{...state, products: action.payload.response, count: action.payload.count, perPage: action.payload.perPage };
    }
    else if(action.type === SET_HOT_PRODUCTS){
        return{...state, hotProducts: action.payload}
    }
    else if(action.type === SET_SINGLE_PRODUCT){
        return{...state, product: action.payload}
    }
    else if(action.type === SET_RELATED_PRODUCT){
        return{...state, relatedproducts: action.payload}
    }
    else if(action.type === SET_PRICE){
        return{...state, attrprice: action.payload}
    }
    else if(action.type === SET_PRODUCT_ERRORS){
        return{...state, productErrors: action.payload}
    }
    else if(action.type === REMOVE_PRODUCT_ERRORS){
        return{...state, productErrors: []}
    }
    else if(action.type === SET_PRODUCT_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === REMOVE_PRODUCT_MESSAGE){
        return{...state, message: ''}
    }
    else{
        return state;
    }
}
export default ProductReducer;