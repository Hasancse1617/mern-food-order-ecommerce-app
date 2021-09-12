import { CATEGORY_STATUS, REMOVE_CATEGORY_ERRORS, REMOVE_CATEGORY_LOADER, SET_CATEGORIES, SET_CATEGORY_ERRORS, SET_CATEGORY_LOADER, SET_CATEGORY_MESSAGE, SET_CATEGORY_REDIRECT, SET_SINGLE_CATEGORY } from "../types/CategoryType";
import axiosInstance from "../../helper/axiosInstance";

export const fetchCategories = (page) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_CATEGORY_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-category/${page}`);
                
                dispatch({type: SET_CATEGORIES, payload: {response,count,perPage}});
                dispatch({type: REMOVE_CATEGORY_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_CATEGORY_LOADER});
                dispatch({type: SET_CATEGORY_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const createAction = (categoryData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_CATEGORY_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-category`,categoryData); 
                dispatch({type: REMOVE_CATEGORY_LOADER});
                dispatch({type: SET_CATEGORY_MESSAGE, payload:msg});
                dispatch({type: SET_CATEGORY_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_CATEGORY_LOADER});
                dispatch({type: SET_CATEGORY_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.get(`/delete-category/${id}`);
            dispatch({type:SET_CATEGORY_LOADER});
            dispatch({type:REMOVE_CATEGORY_ERRORS});
            dispatch({type:SET_CATEGORY_MESSAGE, payload: data.msg});    
        } catch (error) {
            dispatch({type:SET_CATEGORY_ERRORS, payload: error.response.data.errors});
        }
      
    };
}

export const fetchCategory = (id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_CATEGORY_LOADER});
          try {
                const { data } = await axiosInstance.get(`/edit-category/${id}`);
                dispatch({type:SET_SINGLE_CATEGORY, payload: data.response});
                dispatch({type: REMOVE_CATEGORY_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_CATEGORY_LOADER});
                console.log(errors);
          }
    }
}

export const updateAction = (categoryData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_CATEGORY_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/update-category/${id}`,categoryData); 
                  dispatch({type: REMOVE_CATEGORY_LOADER});
                  dispatch({type: SET_CATEGORY_MESSAGE, payload:msg});
                  dispatch({type: SET_CATEGORY_REDIRECT}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_CATEGORY_LOADER});
                  dispatch({type: SET_CATEGORY_ERRORS, payload:errors});
            }
      }
  }

export const statusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,category_id}} = await axiosInstance.post(`/status-category`, statusData);
                  dispatch({type: CATEGORY_STATUS, payload: {status,category_id}});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_CATEGORY_ERRORS, payload:errors});
            }
      }
  }