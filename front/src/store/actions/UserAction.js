import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_USER_LOADER, SET_TOKEN, SET_USER_ERRORS, SET_USER_LOADER, SET_USER_MESSAGE } from "../types/UserType";

export const register = (userData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_USER_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/front/create-user`,userData); 
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_MESSAGE, payload:msg});   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const loginUser = (userData) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_USER_LOADER});
          try {
                  const { data:{msg, token} } = await axiosInstance.post(`/front/login-user`,userData); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_MESSAGE, payload: msg});
                  localStorage.setItem("userToken", token);
                  dispatch({type: SET_TOKEN, payload: token}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const verifyAccount = (token) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_USER_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/front/verify-user/${token}`); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_MESSAGE, payload:msg});   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

  