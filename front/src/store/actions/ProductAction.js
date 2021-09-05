import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_PRODUCT_LOADER, SET_HOT_PRODUCTS, SET_PRICE, SET_PRODUCTS, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_RELATED_PRODUCT, SET_SINGLE_PRODUCT } from '../types/ProductType';

export const fetchProducts = (sortingdata) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_PRODUCT_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.post(`/front/products`, sortingdata);
                console.log(response)
                dispatch({type: SET_PRODUCTS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_PRODUCT_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_PRODUCT_LOADER});
                dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const hotdealsProducts = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/hot-products`);
                  console.log(response)
                  dispatch({type: SET_HOT_PRODUCTS, payload: response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const fetchSingle = (code) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/single-product/${code}`);
                  console.log(response)
                  dispatch({type: SET_SINGLE_PRODUCT, payload: response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const relatedProducts = (code) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/related-products/${code}`);
                  console.log(response)
                  dispatch({type: SET_RELATED_PRODUCT, payload: response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const sizeToPrice = (code,size) =>{
      return async(dispatch,getState)=>{
            // dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {price}} = await axiosInstance.post(`/front/size-price`, {code,size});
                  dispatch({type: SET_PRICE, payload: price});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const addToCartAction = (state) =>{
      return async(dispatch,getState)=>{
            // dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {msg}} = await axiosInstance.post(`/front/add-to-cart`, state);
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_MESSAGE, payload: msg});
                  console.log(msg)
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }