import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, REMOVE_PRODUCT_MESSAGE, REMOVE_PRODUCT_SECRET, SET_CART_ITEMS, SET_DELIVERY_ADDRESS, SET_HOT_PRODUCTS, SET_POPULAR_PRODUCT, SET_PRICE, SET_PRODUCTS, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_PRODUCT_SECRET, SET_RELATED_PRODUCT, SET_SINGLE_PRODUCT, SET_TOTAL_AMOUNT } from "../types/ProductType"

const initState = {
    loading: false,
    products: [],
    count: '',
    perPage: '',
    hotProducts: [],
    product: [],
    relatedproducts: [],
    popularproducts: [],
    attrprice: 0,
    productErrors: [],
    message: "",
    cartItems: [],
    totalCartItem: 0,
    totalAmount: 0,
    deleveryAddress: [],
    clientSecret: "",
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
    else if(action.type === SET_POPULAR_PRODUCT){
        return{...state, popularproducts: action.payload}
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
    else if(action.type === SET_CART_ITEMS){
        return{...state, cartItems: action.payload.response, totalCartItem: action.payload.totalCartItem}
    }
    else if(action.type === SET_TOTAL_AMOUNT){
        return{...state, totalAmount: action.payload}
    }
    else if(action.type === SET_DELIVERY_ADDRESS){
        return{...state, deleveryAddress: action.payload}
    }
    else if(action.type === SET_PRODUCT_SECRET){
        return{...state, clientSecret: action.payload}
    }
    else if(action.type === REMOVE_PRODUCT_SECRET){
        return{...state, clientSecret: ''}
    }
    else{
        return state;
    }
}
export default ProductReducer;