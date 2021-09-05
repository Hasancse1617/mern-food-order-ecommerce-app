import { SET_POST_CATEGORIES, SET_RECENT_POSTS, SET_CATEGORY_POSTS, REMOVE_POST_LOADER, SET_POSTS, SET_POST_ERRORS, SET_POST_LOADER, SET_POST, SET_POST_MESSAGE, SET_POST_COMMENTS } from "../types/PostType";
import axiosInstance from '../../helper/axiosInstance';

export const fetchPosts = () =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_POST_LOADER});
          try {
                const {data: {response}} = await axiosInstance.get(`/front/posts`);
                dispatch({type: SET_POSTS, payload: response});
                dispatch({type: REMOVE_POST_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_POST_LOADER});
                dispatch({type: SET_POST_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const singlePost = (url) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/single-post/${url}`);
                  dispatch({type: SET_POST, payload: response});
                  dispatch({type: REMOVE_POST_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const fetchCatPosts = (url,page) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: {response,count,perPage}} = await axiosInstance.get(`/front/cat-posts/${url}/${page}`);
                  console.log(response)
                  dispatch({type: SET_CATEGORY_POSTS, payload: {response, count, perPage}});
                  dispatch({type: REMOVE_POST_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const fetchSearchPosts = (search,page) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: {response,count,perPage}} = await axiosInstance.get(`/front/search-posts/${search}/${page}`);
                  console.log(response)
                  dispatch({type: SET_CATEGORY_POSTS, payload: {response, count, perPage}});
                  dispatch({type: REMOVE_POST_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const recentPosts = (url) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/recent-posts/${url}`);
                  console.log(response)
                  dispatch({type: SET_RECENT_POSTS, payload: response});
                  dispatch({type: REMOVE_POST_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const postCategories = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_POST_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/post-categories`);
                  console.log(response)
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

  export const addComment = (commentData) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_POST_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/front/add-comment`,commentData); 
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_MESSAGE, payload:msg});   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const fetchComments = (url) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_POST_LOADER});
          try {
                  const { data:{response, totalComment} } = await axiosInstance.get(`/front/all-comment/${url}`); 
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_COMMENTS, payload: {response, totalComment}});   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}

export const addReply = (commentData) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_POST_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/front/add-reply`,commentData); 
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_MESSAGE, payload:msg});   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_POST_LOADER});
                  dispatch({type: SET_POST_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }