import jwt_decode from 'jwt-decode';
import { LOGOUT, REMOVE_LOGIN_ERRORS, REMOVE_LOGIN_LOADER, REMOVE_LOGIN_MESSAGE, REMOVE_UNAUTHORIZED_ACCESS, SET_LOGIN_ERRORS, SET_LOGIN_LOADER, SET_LOGIN_MESSAGE, SET_TOKEN, SET_UNAUTHORIZED_ACCESS } from '../types/AuthType';


const initState = {
    loading: false,
	loginErrors: [],
	token: '',
	user: '',
	message:'',
	unauthorized:'',
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('myToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('myToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { user } = decoded;
		initState.user = user;
	}
}

const AuthReducer = (state = initState, action) => {

    if (action.type === SET_LOGIN_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_LOGIN_LOADER) {
		return { ...state, loading: false };
	} else if (action.type === SET_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { user } = decoded;
		return {
			...state,
			token: action.payload,
			user: user,
			loginErrors: [],
			registerErrors: [],
		};
	} 
	else if (action.type === LOGOUT) {
		return { ...state, token: '', user: '' };
	} 
	else if (action.type === SET_LOGIN_ERRORS) {
		return {...state,loginErrors: action.payload};
	} 
	else if (action.type === REMOVE_LOGIN_ERRORS) {
		return {...state,loginErrors: []};
	}
	else if (action.type === SET_LOGIN_MESSAGE) {
		return {...state,message: action.payload};
	}
	else if (action.type === REMOVE_LOGIN_MESSAGE) {
		return {...state,message: ''};
	}
	else if(action.type === SET_UNAUTHORIZED_ACCESS){
        return{...state, unauthorized: true };
    }
    else if(action.type === REMOVE_UNAUTHORIZED_ACCESS){
        return{...state, unauthorized: false };
    }
	else {
		return state;
	}
}

export default AuthReducer;