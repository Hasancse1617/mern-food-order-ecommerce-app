import axiosInstance from "../../helper/axiosInstance";
import { SET_TOKEN, SET_UNAUTHORIZED_ACCESS } from "../types/AuthType";
import { REMOVE_USER_ERRORS, REMOVE_USER_LOADER, SET_PERMISSIONS, SET_ROLES, SET_SINGLE_ROLE, SET_SINGLE_USER, SET_USERS, SET_USER_ERRORS, SET_USER_LOADER, SET_USER_MESSAGE, SET_USER_REDIRECT } from "../types/UserType";

export const fetchUsers = (page,user_type) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_USER_LOADER});
            try {
                  const {data: {response, count, perPage}} = await axiosInstance.get(`/all-user/${user_type}/${page}`);
                  
                  dispatch({type: SET_USERS, payload: {response,count,perPage}});
                  dispatch({type: REMOVE_USER_LOADER});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  if(error.response.status === 403){
                        dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
  }

export const createAction = (userData,user_type) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_USER_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/create-user/${user_type}`,userData); 
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_MESSAGE, payload:msg});
                dispatch({type: SET_USER_REDIRECT}); 
                console.log(msg);   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_USER_LOADER});
                dispatch({type: SET_USER_ERRORS, payload:errors});
                if(error.response.status === 403){
                  dispatch({type: SET_UNAUTHORIZED_ACCESS});
                }
                console.log(errors);
          }
    }
}

export const deleteAction = (id,user_type) =>{
      return async (dispatch, getState)=>{
              try {
              const {data} = await axiosInstance.get(`/delete-user/${user_type}/${id}`);
              dispatch({type:SET_USER_LOADER});
              dispatch({type:REMOVE_USER_ERRORS});
              dispatch({type:SET_USER_MESSAGE, payload: data.msg});    
          } catch (error) {
              dispatch({type:SET_USER_ERRORS, payload: error.response.data.errors});
              if(error.response.status === 403){
                  dispatch({type: SET_UNAUTHORIZED_ACCESS});
              }
          }
        
      };
  }

  export const fetchUser = (id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data } = await axiosInstance.get(`/edit-user/${id}`);
                  dispatch({type:SET_SINGLE_USER, payload: data.response});
                  dispatch({type: REMOVE_USER_LOADER});
                  console.log(data.response)
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  console.log(errors);
            }
      }
  }
  
  export const updateUserProfile = (userData,id) =>{
        return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                    const { data } = await axiosInstance.post(`/update-user/${id}`,userData); 
                    dispatch({type: REMOVE_USER_LOADER});
                    localStorage.setItem('myToken', data.token);
                    dispatch({type: SET_TOKEN, payload: data.token});
                    dispatch({type: SET_USER_MESSAGE, payload: data.msg});
                    dispatch({type: SET_USER_REDIRECT});    
              } catch (error) {
                    const {errors} = error.response.data;
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_ERRORS, payload:errors});
                    console.log(error);
              }
        }
  }
  
  export const updateUserPassword = (userData,id) =>{
        return async(dispatch,getState)=>{;
            dispatch({type: SET_USER_LOADER});
            try {
                    const { data } = await axiosInstance.post(`/update-user-password/${id}`,userData); 
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_MESSAGE, payload: data.msg});
                    dispatch({type: SET_USER_REDIRECT});    
              } catch (error) {
                    const {errors} = error.response.data;
                    dispatch({type: REMOVE_USER_LOADER});
                    dispatch({type: SET_USER_ERRORS, payload:errors});
                    console.log(error);
              }
        }
  }

export const fetchRole = (user_type) =>{
      return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data:{response, permissions} } = await axiosInstance.get(`/all-role/${user_type}`); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_ROLES, payload: {response,permissions}}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  if(error.response.status === 403){
                       dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
}

export const addRole = (state, user_type) =>{
      return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data:{msg} } = await axiosInstance.post(`/add-role/${user_type}`, state); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_MESSAGE, payload: msg});
                  dispatch({type: SET_USER_REDIRECT}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  if(error.response.status === 403){
                      dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
}

export const fetchPermission = () =>{
      return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data:{response} } = await axiosInstance.get(`/all-permission`); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_PERMISSIONS, payload: response}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}

export const editRole = (id,user_type) =>{
      return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data:{response} } = await axiosInstance.get(`/edit-role/${user_type}/${id}`); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_SINGLE_ROLE, payload: response}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  if(error.response.status === 403){
                      dispatch({type: SET_UNAUTHORIZED_ACCESS});
                  }
            }
      }
}

export const updateRole = (state, id) =>{
      return async(dispatch,getState)=>{
            // const {AuthReducer: {token}} = getState();
            dispatch({type: SET_USER_LOADER});
            try {
                  const { data:{msg} } = await axiosInstance.post(`/update-role/${id}`, state); 
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_MESSAGE, payload: msg});
                  dispatch({type: SET_USER_REDIRECT}); 
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_USER_LOADER});
                  dispatch({type: SET_USER_ERRORS, payload:errors});
                  console.log(errors);
            }
      }
}