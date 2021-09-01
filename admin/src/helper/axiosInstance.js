import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';
import { LOGOUT } from '../store/types/AuthType';

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // Create instance
  const axiosInstance = axios.create(defaultOptions);

  //check token expire or not every request
  const VerifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem('myToken');
      store.dispatch({type: LOGOUT});
      return null;
    } else {
      return decodeToken;
    }
  };

  // Set the AUTH token for any request
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('myToken');
    if(token){
      const verify = VerifyToken(token);
    }else{
       store.dispatch({type: LOGOUT});
    }
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default axiosInstance;