import { REMOVE_SINGLE_PRODUCT, REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, REMOVE_PRODUCT_MESSAGE, REMOVE_PRODUCT_REDIRECT, SET_SINGLE_PRODUCT, SET_PRODUCTS, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_PRODUCT_REDIRECT, SET_PRODUCT_BRAND, SET_PRODUCT_CATEGORY, SET_PRODUCT_IMAGES, SET_PRODUCT_ATTRIBUTES } from "../types/ProductType";

const initState = {
    loading: false,
    productErrors: [],
    redirect: false,
    message: '',
    products: [],
    product: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    brands:[],
    categories:[],
    images:[],
    attributes:[],
}

const ProductReducer = (state=initState, action) =>{
    if(action.type === SET_PRODUCT_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_PRODUCT_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_PRODUCT_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_PRODUCT_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_PRODUCT_ERRORS){
        return{...state, productErrors: action.payload  };
    }
    else if(action.type === REMOVE_PRODUCT_ERRORS){
        return{...state, productErrors: [] };
    }
    else if(action.type === SET_PRODUCT_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_PRODUCT_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_PRODUCTS){
        return{...state, products: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/product/all' };
    }
    else if(action.type === SET_SINGLE_PRODUCT){
        return{...state, product: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_PRODUCT){
        return{...state, product: [], status: false };
    }
    else if(action.type === SET_PRODUCT_BRAND){
        return{...state, brands: action.payload}
    }
    else if(action.type === SET_PRODUCT_CATEGORY){
        return{...state, categories: action.payload}
    }
    else if(action.type === SET_PRODUCT_IMAGES){
        return{...state, images: action.payload}
    }
    else if(action.type === SET_PRODUCT_ATTRIBUTES){
        return{...state, attributes: action.payload}
    }
    else{
        return state;
    }
}
export default ProductReducer;