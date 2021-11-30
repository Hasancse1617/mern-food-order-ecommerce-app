import { SET_POST_CATEGORIES, REMOVE_POST_ERRORS, REMOVE_POST_LOADER, SET_POSTS, SET_POST_ERRORS, SET_POST_LOADER, SET_POST_MESSAGE, SET_POST_REDIRECT, SET_SINGLE_POST } from "../types/PostType";
import axiosInstance from "../../helper/axiosInstance";
import $ from 'jquery';
import { SET_UNAUTHORIZED_ACCESS } from "../types/AuthType";

export const fetchPosts = (page, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_POST_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-post/${user_type}/${page}`);
                
                dispatch({type: SET_POSTS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_POST_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_POST_LOADER});
                dispatch({type: SET_POST_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const fetchcategories = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: { response }} = await axiosInstance.get(`/categories`);
                  
                  dispatch({type: SET_POST_CATEGORIES, payload: response});
                  dispatch({type: REMOVE_POST_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const createAction = (postData, user_type) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_POST_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-post/${user_type}`,postData); 
                dispatch({type: REMOVE_POST_LOADER});
                dispatch({type: SET_POST_MESSAGE, payload:msg});
                dispatch({type: SET_POST_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_POST_LOADER});
                dispatch({type: SET_POST_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const deleteAction = (id, user_type) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.get(`/delete-post/${user_type}/${id}`);
            dispatch({type:SET_POST_LOADER});
            dispatch({type:REMOVE_POST_ERRORS});
            dispatch({type:SET_POST_MESSAGE, payload: data.msg});    
        } catch (error) {
            dispatch({type:SET_POST_ERRORS, payload: error.response.data.errors});
            if(error.response.status === 403){
                  dispatch({type: SET_UNAUTHORIZED_ACCESS});
            }
        }
      
    };
}

export const fetchPost = (id, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_POST_LOADER});
          try {
                const { data } = await axiosInstance.get(`/edit-post/${user_type}/${id}`);
                dispatch({type:SET_SINGLE_POST, payload: data.response});
                dispatch({type: REMOVE_POST_LOADER});
                console.log(data.response)
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_POST_LOADER});
                if(error.response.status === 403){
                    dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const updateAction = (postData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
      //     dispatch({type: SET_POST_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/update-post/${id}`,postData); 
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_MESSAGE, payload:msg});
                  dispatch({type: SET_POST_REDIRECT}); 
                  console.log(msg);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const statusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,post_id}} = await axiosInstance.post(`/status-post`, statusData);
                  if(status == false){
                      $('#post-'+post_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                      $('#post-'+post_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }