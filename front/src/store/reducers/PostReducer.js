import { REMOVE_POST_LOADER, REMOVE_POST_MESSAGE, SET_CATEGORY_POSTS, SET_POST, SET_POSTS, SET_POST_CATEGORIES, SET_POST_COMMENTS, SET_POST_LOADER, SET_POST_MESSAGE, SET_RECENT_POSTS } from "../types/PostType"

const initState = {
    loading: false,
    posts: [],
    post: [],
    catPosts: [],
    recentposts: [],
    categories: [],
    count: '',
    perPage: '',
    message: '',
    comments: [],
    totalComment: 0,
}

const PostReducer = (state=initState, action) =>{
    if(action.type === SET_POST_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_POST_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_POSTS){
        return{...state, posts: action.payload}
    }
    else if(action.type === SET_POST){
        return{...state, post: action.payload}
    }
    else if(action.type === SET_CATEGORY_POSTS){
        return{...state, catPosts: action.payload.response, count: action.payload.count, perPage: action.payload.perPage}
    }
    else if(action.type === SET_RECENT_POSTS){
        return{...state, recentposts: action.payload}
    }
    else if(action.type === SET_POST_CATEGORIES){
        return{...state, categories: action.payload}
    }
    else if(action.type === SET_POST_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === REMOVE_POST_MESSAGE){
        return{...state, message: ''}
    }
    else if(action.type === SET_POST_COMMENTS){
        return{...state, comments: action.payload.response, totalComment: action.payload.totalComment}
    }
    else{
        return state;
    }
}
export default PostReducer;