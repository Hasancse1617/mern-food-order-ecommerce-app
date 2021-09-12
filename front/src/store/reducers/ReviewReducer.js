import { REMOVE_REVIEW_ERRORS, REMOVE_REVIEW_LOADER, REMOVE_REVIEW_MESSAGE, SET_REVIEWS, SET_REVIEW_ERRORS, SET_REVIEW_LOADER, SET_REVIEW_MESSAGE, SET_WISHLISTS } from "../types/ReviewType"

const initState = {
    loading: false,
    reviewErrors: [],
    message: '',
    reviews: [],
    wishlists: [],
}
const ReviewReducer = (state=initState,action) =>{
    if(action.type === SET_REVIEW_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_REVIEW_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_REVIEW_ERRORS){
        return{...state, reviewErrors: action.payload}
    }
    else if(action.type === REMOVE_REVIEW_ERRORS){
        return{...state, reviewErrors: []}
    }
    else if(action.type === SET_REVIEW_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === REMOVE_REVIEW_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === SET_REVIEWS){
        return{...state, reviews: action.payload}
    }
    else if(action.type === SET_WISHLISTS){
        return{...state, wishlists: action.payload}
    }
    else{
        return state;
    }
}
export default ReviewReducer;