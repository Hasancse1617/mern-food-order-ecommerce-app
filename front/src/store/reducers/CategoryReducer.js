import { REMOVE_CATEGORY_LOADER, SET_CATEGORIES, SET_CATEGORY_LOADER } from "../types/CategoryType"

const initState = {
    loading: false,
    categories: [],
}

const CategoryReducer = (state=initState, action) =>{
    if(action.type === SET_CATEGORY_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_CATEGORY_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_CATEGORIES){
        return{...state, categories: action.payload}
    }
    else{
        return state;
    }
}
export default CategoryReducer;