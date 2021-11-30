import { REMOVE_PERMISSIONS, REMOVE_SINGLE_USER, REMOVE_USER_ERRORS, REMOVE_USER_LOADER, REMOVE_USER_MESSAGE, REMOVE_USER_REDIRECT, SET_PERMISSIONS, SET_ROLES, SET_SINGLE_ROLE, SET_SINGLE_USER, SET_USERS, SET_USER_ERRORS, SET_USER_LOADER, SET_USER_MESSAGE, SET_USER_REDIRECT } from "../types/UserType";

const initState = {
    loading: false,
    userErrors: [],
    redirect: false,
    message: '',
    users: [],
    user: [],
    count: '',
    perPage: '',
    pageLink: '',
    status: false,
    roles: [],
    permissions: [],
    singlerole: [],
    rolePermissions: [],
}

const UserReducer = (state=initState, action) =>{
    if(action.type === SET_USER_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_USER_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_USER_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_USER_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_USER_ERRORS){
        return{...state, userErrors: action.payload  };
    }
    else if(action.type === REMOVE_USER_ERRORS){
        return{...state, userErrors: [] };
    }
    else if(action.type === SET_USER_REDIRECT){
        return{...state, redirect: true };
    }
    else if(action.type === REMOVE_USER_REDIRECT){
        return{...state, redirect: false };
    }
    else if(action.type === SET_USERS){
        return{...state, users: action.payload.response, count: action.payload.count, perPage: action.payload.perPage, pageLink: '/admin/user/all' };
    }
    else if(action.type === SET_SINGLE_USER){
        return{...state, user: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_USER){
        return{...state, status: false };
    }
    else if(action.type === SET_ROLES){
        return{...state, roles: action.payload.response, rolePermissions: action.payload.permissions };
    }
    else if(action.type === SET_PERMISSIONS){
        return{...state, permissions: action.payload };
    }
    else if(action.type === SET_SINGLE_ROLE){
        return{...state, singlerole: action.payload, status: true };
    }
    else if(action.type === REMOVE_PERMISSIONS){
        return{...state, permissions: [], status: false };
    }
    else{
        return state;
    }
}
export default UserReducer;