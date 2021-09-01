import { REMOVE_CATEGORY_LOADER, SET_CATEGORIES, SET_CATEGORY_ERRORS, SET_CATEGORY_LOADER } from "../types/CategoryType";
import axiosInstance from '../../helper/axiosInstance';

export const fetchCategories = () =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_CATEGORY_LOADER});
          try {
                const {data: {response}} = await axiosInstance.get(`/front/categories`);
                console.log(response)
                dispatch({type: SET_CATEGORIES, payload: response});
                dispatch({type: REMOVE_CATEGORY_LOADER});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_CATEGORY_LOADER});
                dispatch({type: SET_CATEGORY_ERRORS, payload:errors});
                console.log(errors);
          }
    }
}