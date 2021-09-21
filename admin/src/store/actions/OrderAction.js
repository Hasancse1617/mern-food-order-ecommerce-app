import { REMOVE_ORDER_LOADER, SET_ORDERS, SET_ORDER_ERRORS, SET_ORDER_LOADER, SET_ORDER_LOGS, SET_SINGLE_ORDER } from "../types/OrderType";
import axiosInstance from "../../helper/axiosInstance";

export const fetchOrders = (page) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_ORDER_LOADER});
          try {
                const {data: {response, count, perPage}} = await axiosInstance.get(`/all-order/${page}`);
                dispatch({type: SET_ORDERS, payload: {response,count,perPage}});
                dispatch({type: REMOVE_ORDER_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_ORDER_LOADER});
                dispatch({type: SET_ORDER_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}

export const fetchOrder = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_ORDER_LOADER});
            try {
                  const {data: {response}} = await axiosInstance.get(`/single-order/${id}`);
                  dispatch({type: SET_SINGLE_ORDER, payload: response});
                  dispatch({type: REMOVE_ORDER_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_ORDER_LOADER});
                  dispatch({type: SET_ORDER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}

export const updateOrderStatus = (state) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_ORDER_LOADER});
            try {
                  const {data: {msg, order_id}} = await axiosInstance.post(`/update-order-status`, state);
                  // dispatch({type: REMOVE_ORDER_LOADER});
                  dispatch(fetchOrder(order_id));
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_ORDER_LOADER});
                  dispatch({type: SET_ORDER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}