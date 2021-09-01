import { BLOG_STATUS, REMOVE_BLOG_ERRORS, REMOVE_BLOG_LOADER, SET_BLOGS, SET_BLOG_ERRORS, SET_BLOG_LOADER, SET_BLOG_MESSAGE, SET_BLOG_REDIRECT, SET_SINGLE_BLOG } from "../types/BlogType";
import axiosInstance from "../../helper/axiosInstance";

export const fetchBlogs = (page) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_BLOG_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-blog/${page}`);
                
                dispatch({type: SET_BLOGS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_BLOG_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BLOG_LOADER});
                dispatch({type: SET_BLOG_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const createAction = (blogData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_BLOG_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-blog`,blogData); 
                dispatch({type: REMOVE_BLOG_LOADER});
                dispatch({type: SET_BLOG_MESSAGE, payload:msg});
                dispatch({type: SET_BLOG_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BLOG_LOADER});
                dispatch({type: SET_BLOG_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.get(`/delete-blog/${id}`);
            dispatch({type:SET_BLOG_LOADER});
            dispatch({type:REMOVE_BLOG_ERRORS});
            dispatch({type:SET_BLOG_MESSAGE, payload: data.msg});    
        } catch (error) {
            dispatch({type:SET_BLOG_ERRORS, payload: error.response.data.errors});
        }
      
    };
}

export const fetchBlog = (id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_BLOG_LOADER});
          try {
                const { data } = await axiosInstance.get(`/edit-blog/${id}`);
                dispatch({type:SET_SINGLE_BLOG, payload: data.response});
                dispatch({type: REMOVE_BLOG_LOADER});
                console.log(data.response)
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_BLOG_LOADER});
                console.log(errors);
          }
    }
}

export const updateAction = (blogData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_BLOG_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/update-blog/${id}`,blogData); 
                  dispatch({type: REMOVE_BLOG_LOADER});
                  dispatch({type: SET_BLOG_MESSAGE, payload:msg});
                  dispatch({type: SET_BLOG_REDIRECT}); 
                  console.log(msg);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_BLOG_LOADER});
                  dispatch({type: SET_BLOG_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const statusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,blog_id}} = await axiosInstance.post(`/status-blog`, statusData);
                  dispatch({type: BLOG_STATUS, payload: {status,blog_id}});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_BLOG_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }