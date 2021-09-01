import { REMOVE_SINGLE_CATEGORY, REMOVE_CATEGORY_ERRORS, REMOVE_CATEGORY_LOADER, REMOVE_CATEGORY_MESSAGE, REMOVE_CATEGORY_REDIRECT, SET_SINGLE_CATEGORY, SET_CATEGORIES, SET_CATEGORY_ERRORS, SET_CATEGORY_LOADER, SET_CATEGORY_MESSAGE, SET_CATEGORY_REDIRECT, CATEGORY_STATUS } from "../types/CategoryType";

const initState = {
    loading: false,
    categoryErrors: [],
    redirect: false,
    message: '',
    categories: [],
    category: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    category_status: false,
    categoryId: 0,
}

const CategoryReducer = (state=initState, action) =>{
    if(action.type === SET_CATEGORY_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_CATEGORY_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_CATEGORY_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_CATEGORY_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_CATEGORY_ERRORS){
        return{...state, categoryErrors: action.payload  };
    }
    else if(action.type === REMOVE_CATEGORY_ERRORS){
        return{...state, categoryErrors: [] };
    }
    else if(action.type === SET_CATEGORY_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_CATEGORY_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_CATEGORIES){
        return{...state, categories: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/category/all' };
    }
    else if(action.type === SET_SINGLE_CATEGORY){
        return{...state, category: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_CATEGORY){
        return{...state, category: [], status: false };
    }
    else if(action.type === CATEGORY_STATUS){
        return{...state, category_status: action.payload.status, categoryId: action.payload.category_id}
    }
    else{
        return state;
    }
}
export default CategoryReducer;