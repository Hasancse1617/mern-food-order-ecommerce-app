import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_REVIEW_LOADER, SET_REVIEWS, SET_REVIEW_ERRORS, SET_REVIEW_LOADER, SET_REVIEW_MESSAGE, SET_WISHLISTS } from "../types/ReviewType";

export const reviewAction = (state) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_REVIEW_LOADER});
          try {
                const {data: {msg}} = await axiosInstance.post(`/front/add-review`, state);
                dispatch({type: SET_REVIEW_MESSAGE, payload: msg});
                dispatch({type: REMOVE_REVIEW_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_REVIEW_LOADER});
                dispatch({type: SET_REVIEW_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const fetchReview = (state) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_REVIEW_LOADER});
          try {
                const {data: {response}} = await axiosInstance.post(`/front/all-review`, state);
                dispatch({type: SET_REVIEWS, payload: response});
                dispatch({type: REMOVE_REVIEW_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_REVIEW_LOADER});
                dispatch({type: SET_REVIEW_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const addToHeart = (state) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_REVIEW_LOADER});
            try {
                  const {data: {msg}} = await axiosInstance.post(`/front/add-heart`, state);
                  dispatch({type: SET_REVIEW_MESSAGE, payload: msg});
                  dispatch({type: REMOVE_REVIEW_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_REVIEW_LOADER});
                  dispatch({type: SET_REVIEW_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const fetchWishlists = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_REVIEW_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/front/all-wishlist/${id}`);
                  dispatch({type: SET_WISHLISTS, payload: response});
                  dispatch({type: REMOVE_REVIEW_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_REVIEW_LOADER});
                  dispatch({type: SET_REVIEW_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  export const deleteWishlist = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_REVIEW_LOADER});
            try {
                  const {data: {msg}} = await axiosInstance.get(`/front/delete-wishlist/${id}`);
                  dispatch({type: SET_REVIEW_MESSAGE, payload: msg});
                  dispatch({type: REMOVE_REVIEW_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_REVIEW_LOADER});
                  dispatch({type: SET_REVIEW_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}