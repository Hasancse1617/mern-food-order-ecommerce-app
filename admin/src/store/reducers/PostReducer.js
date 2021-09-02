import { REMOVE_SINGLE_POST, REMOVE_POST_ERRORS, REMOVE_POST_LOADER, REMOVE_POST_MESSAGE, REMOVE_POST_REDIRECT, SET_SINGLE_POST, SET_POSTS, SET_POST_ERRORS, SET_POST_LOADER, SET_POST_MESSAGE, SET_POST_REDIRECT, POST_STATUS } from "../types/PostType";

const initState = {
    loading: false,
    postErrors: [],
    redirect: false,
    message: '',
    posts: [],
    post: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    post_status: false,
    postId: 0,
}

const PostReducer = (state=initState, action) =>{
    if(action.type === SET_POST_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_POST_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_POST_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_POST_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_POST_ERRORS){
        return{...state, postErrors: action.payload  };
    }
    else if(action.type === REMOVE_POST_ERRORS){
        return{...state, postErrors: [] };
    }
    else if(action.type === SET_POST_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_POST_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_POSTS){
        return{...state, posts: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/post/all' };
    }
    else if(action.type === SET_SINGLE_POST){
        return{...state, post: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_POST){
        return{...state, post: [], status: false };
    }
    else if(action.type === POST_STATUS){
        return{...state, post_status: action.payload.status, postId: action.payload.post_id}
    }
    else{
        return state;
    }
}
export default PostReducer;