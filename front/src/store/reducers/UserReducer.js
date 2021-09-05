import jwt_decode from 'jwt-decode';
import { REMOVE_USER_ERRORS, REMOVE_USER_LOADER, REMOVE_USER_MESSAGE, SET_TOKEN, SET_USER_ERRORS, SET_USER_LOADER, SET_USER_MESSAGE, LOGOUT } from "../types/UserType"

const initState = {
    loading: false,
    userErrors: [],
    token: '',
	user: '',
    message: ''
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('userToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('userToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { user } = decoded;
		initState.user = user;
	}
}

const UserReducer = (state=initState, action) =>{
    if(action.type === SET_USER_LOADER){
        return{...state, loading: true}
    }
    else if(action.type === REMOVE_USER_LOADER){
        return{...state, loading: false}
    }
    else if(action.type === SET_USER_ERRORS){
        return{...state, userErrors: action.payload}
    }
    else if(action.type === REMOVE_USER_ERRORS){
        return{...state, userErrors: []}
    }
    else if(action.type === SET_USER_MESSAGE){
        return{...state, message: action.payload}
    }
    else if(action.type === REMOVE_USER_MESSAGE){
        return{...state, message: ''}
    }
    else if(action.type === SET_TOKEN){
        const decoded = verifyToken(action.payload);
		const { user } = decoded;
        return{...state, token: action.payload, user: user}
    }
    else if (action.type === LOGOUT) {
		return { ...state, token: '', user: '' };
	}
    else{
        return state;
    }
}
export default UserReducer;