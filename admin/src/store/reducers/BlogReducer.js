import { REMOVE_SINGLE_BLOG, REMOVE_BLOG_ERRORS, REMOVE_BLOG_LOADER, REMOVE_BLOG_MESSAGE, REMOVE_BLOG_REDIRECT, SET_SINGLE_BLOG, SET_BLOGS, SET_BLOG_ERRORS, SET_BLOG_LOADER, SET_BLOG_MESSAGE, SET_BLOG_REDIRECT, BLOG_STATUS } from "../types/BlogType";

const initState = {
    loading: false,
    blogErrors: [],
    redirect: false,
    message: '',
    blogs: [],
    blog: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    blog_status: false,
    blogId: 0,
}

const BlogReducer = (state=initState, action) =>{
    if(action.type === SET_BLOG_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_BLOG_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_BLOG_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_BLOG_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_BLOG_ERRORS){
        return{...state, blogErrors: action.payload  };
    }
    else if(action.type === REMOVE_BLOG_ERRORS){
        return{...state, blogErrors: [] };
    }
    else if(action.type === SET_BLOG_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_BLOG_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_BLOGS){
        return{...state, blogs: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/blog/all' };
    }
    else if(action.type === SET_SINGLE_BLOG){
        return{...state, blog: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_BLOG){
        return{...state, blog: [], status: false };
    }
    else if(action.type === BLOG_STATUS){
        return{...state, blog_status: action.payload.status, blogId: action.payload.blog_id}
    }
    else{
        return state;
    }
}
export default BlogReducer;