import axiosInstance from "../../helper/axiosInstance";
import { SET_PRODUCT_IMAGES, SET_PRODUCT_CATEGORY, SET_PRODUCTS, REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_LOADER, SET_SINGLE_PRODUCT, SET_PRODUCT_ERRORS, SET_PRODUCT_LOADER, SET_PRODUCT_MESSAGE, SET_PRODUCT_REDIRECT, SET_PRODUCT_ATTRIBUTES } from "../types/ProductType";
import $ from 'jquery';
import { SET_UNAUTHORIZED_ACCESS } from "../types/AuthType";

export const fetchProducts = (page, user_type) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const {data: {response, count, perPage}} = await axiosInstance.get(`/all-product/${user_type}/${page}`);
                  dispatch({type: SET_PRODUCTS, payload: {response,count,perPage}});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  if(error.response.status === 403){
                      dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
}

export const createAction = (productData, user_type) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_PRODUCT_LOADER});
        try {
                const { data:{message} } = await axiosInstance.post(`/create-product/${user_type}`,productData); 
                dispatch({type: REMOVE_PRODUCT_LOADER});
                dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                dispatch({type: SET_PRODUCT_REDIRECT}); 
                console.log(message);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_PRODUCT_LOADER});
                dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const deleteAction = (id, user_type) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-product/${user_type}/${id}`);
              dispatch({type:SET_PRODUCT_LOADER});
              dispatch({type:REMOVE_PRODUCT_ERRORS});
              dispatch({type:SET_PRODUCT_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_PRODUCT_ERRORS, payload: error.response.data.errors});
              if(error.response.status === 403){
                  dispatch({type: SET_UNAUTHORIZED_ACCESS});
              }
          }
        
      };
  }

  export const fetchProduct = (id, user_type) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/edit-product/${user_type}/${id}`);
                  dispatch({type:SET_SINGLE_PRODUCT, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  if(error.response.status === 403){
                        dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
  }

  export const updateAction = (productData,id) =>{
      return async(dispatch,getState)=>{
          try {
                  const { data:{message} } = await axiosInstance.post(`/update-product/${id}`,productData); 
                  dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                  dispatch({type: SET_PRODUCT_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                  const {data: {status,product_id}} = await axiosInstance.post(`/status-product`, statusData);
                  if(status == false){
                        $('#product-'+product_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                        $('#product-'+product_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const fetchcategories = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-categories`);
                  dispatch({type:SET_PRODUCT_CATEGORY, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const addProductImages = (state,id) =>{
      return async(dispatch,getState)=>{
            console.log(state)
          try {
                  const { data:{message} } = await axiosInstance.post(`/add-product-images/${id}`, state); 
                  dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                  // dispatch({type: SET_PRODUCT_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const allImages = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-images/${id}`);
                  dispatch({type:SET_PRODUCT_IMAGES, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const deleteImageAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-product-image/${id}`);
              dispatch({type:SET_PRODUCT_LOADER});
              dispatch({type:REMOVE_PRODUCT_ERRORS});
              dispatch({type:SET_PRODUCT_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_PRODUCT_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }

  export const imagestatusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,image_id}} = await axiosInstance.post(`/status-image`, statusData);
                  if(status == false){
                        $('#image-'+image_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                        $('#image-'+image_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const addAttributes = (state,id) =>{
      return async(dispatch,getState)=>{
            console.log(state)
          try {
                  const { data:{message} } = await axiosInstance.post(`/add-product-attributes/${id}`, state); 
                  dispatch({type: SET_PRODUCT_MESSAGE, payload:message});
                  // dispatch({type: SET_PRODUCT_REDIRECT}); 
                  console.log(message);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const fetcAttributes = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_PRODUCT_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/all-atributes/${id}`);
                  dispatch({type: SET_PRODUCT_ATTRIBUTES, payload: data.response});
                  dispatch({type: REMOVE_PRODUCT_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_PRODUCT_LOADER});
                  console.log(errors);
            }
      }
  }

  export const attributestatusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,attribute_id}} = await axiosInstance.post(`/status-attribute`, statusData);
                  if(status == false){
                     $('#attribute-'+attribute_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                     $('#attribute-'+attribute_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_PRODUCT_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const deleteAttributeAction = (id) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-product-attribute/${id}`);
              dispatch({type:SET_PRODUCT_LOADER});
              dispatch({type:REMOVE_PRODUCT_ERRORS});
              dispatch({type:SET_PRODUCT_MESSAGE, payload: data.message});    
          } catch (error) {
              dispatch({type:SET_PRODUCT_ERRORS, payload: error.response.data.errors});
          }
        
      };
  }