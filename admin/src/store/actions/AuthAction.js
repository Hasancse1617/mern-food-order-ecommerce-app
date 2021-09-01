import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_LOGIN_LOADER, SET_LOGIN_ERRORS, SET_LOGIN_LOADER, SET_LOGIN_MESSAGE, SET_TOKEN } from '../types/AuthType';
import axios from 'axios'

export const AuthLogin = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_LOGIN_LOADER});
            const {data} = await axiosInstance.post('/login',state);
            dispatch({type: REMOVE_LOGIN_LOADER});
            localStorage.setItem("myToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_LOGIN_LOADER});
            const {data} = await axiosInstance.post('/forgot-password',state);
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_LOGIN_LOADER});
            const {data} = await axiosInstance.post(`/reset-password/${token}`,state);
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const googleLogin = (tokenId) =>{
    return async (dispatch) =>{
        console.log(tokenId)
        try {
            dispatch({type: SET_LOGIN_LOADER});
            const {data} = await axiosInstance.post('/google-login',{idToken:tokenId});
            dispatch({type: REMOVE_LOGIN_LOADER});
            localStorage.setItem("myToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const facebookLogin = (id,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_LOGIN_LOADER});
            const {data} = await axiosInstance.post('/facebook-login',{userID:id, accessToken:token});
            dispatch({type: REMOVE_LOGIN_LOADER});
            localStorage.setItem("myToken", data.token);
            dispatch({type: SET_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_LOGIN_LOADER});
            dispatch({type: SET_LOGIN_ERRORS, payload: error.response.data.errors});
        }
    }
}