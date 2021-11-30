import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_COUPON_ERRORS, REMOVE_COUPON_LOADER, SET_COUPONS, SET_COUPON_ERRORS, SET_COUPON_LOADER, SET_COUPON_MESSAGE, SET_COUPON_REDIRECT, SET_SINGLE_COUPON } from "../types/CouponType";
import $ from 'jquery';
import { SET_UNAUTHORIZED_ACCESS } from "../types/AuthType";

export const fetchCoupons = (page, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_COUPON_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-coupon/${user_type}/${page}`);
                
                dispatch({type: SET_COUPONS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_COUPON_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_COUPON_LOADER});
                dispatch({type: SET_COUPON_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const createAction = (couponData, user_type) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_COUPON_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-coupon/${user_type}`,couponData); 
                dispatch({type: REMOVE_COUPON_LOADER});
                dispatch({type: SET_COUPON_MESSAGE, payload:msg});
                dispatch({type: SET_COUPON_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_COUPON_LOADER});
                dispatch({type: SET_COUPON_ERRORS, payload:errors});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const deleteAction = (id, user_type) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.get(`/delete-coupon/${user_type}/${id}`);
            dispatch({type:SET_COUPON_LOADER});
            dispatch({type:REMOVE_COUPON_ERRORS});
            dispatch({type:SET_COUPON_MESSAGE, payload: data.msg});    
        } catch (error) {
            dispatch({type:SET_COUPON_ERRORS, payload: error.response.data.errors});
            if(error.response.status === 403){
                dispatch({type: SET_UNAUTHORIZED_ACCESS});
            }
        }
      
    };
}

export const fetchCoupon = (id, user_type) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_COUPON_LOADER});
          try {
                const { data } = await axiosInstance.get(`/edit-coupon/${user_type}/${id}`);
                dispatch({type: SET_SINGLE_COUPON, payload: data.response});
                dispatch({type: REMOVE_COUPON_LOADER});
                console.log(data.response)
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_COUPON_LOADER});
                if(error.response.status === 403){
                   dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
          }
    }
}

export const updateAction = (couponData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_COUPON_LOADER});
          try {
                  const { data:{msg} } = await axiosInstance.post(`/update-coupon/${id}`,couponData); 
                  dispatch({type: REMOVE_COUPON_LOADER});
                  dispatch({type: SET_COUPON_MESSAGE, payload:msg});
                  dispatch({type: SET_COUPON_REDIRECT}); 
                  console.log(msg);   
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_COUPON_LOADER});
                  dispatch({type: SET_COUPON_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
  }

export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                  const {data: {status,coupon_id}} = await axiosInstance.post(`/status-coupon`, statusData);
                  console.log(status,coupon_id);
                  if(status == false){
                        $('#coupon-'+coupon_id).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${status}></i>`);
                  }else{
                        $('#coupon-'+coupon_id).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${status}></i>`);
                  }
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_COUPON_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}