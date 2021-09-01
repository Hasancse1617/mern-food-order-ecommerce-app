import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { forgotPassword } from '../../store/actions/AuthAction';
import { REMOVE_LOGIN_ERRORS, REMOVE_LOGIN_MESSAGE } from '../../store/types/AuthType';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const {loading, loginErrors,message} = useSelector((state)=>state.AuthReducer);
    const [state, setState] = useState({
        email:''
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(forgotPassword(state));
    }
    useEffect(()=>{
        if(loginErrors.length > 0){
            loginErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_LOGIN_ERRORS});
        }
    }, [loginErrors]);
    useEffect(()=>{
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 2000
            })
          dispatch({type: REMOVE_LOGIN_MESSAGE});
        }
      },[message]);
    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div class="login-box">
        <Helmet>
            <title>User forgot password - Movie</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <div class="login-logo">
            <a href=""><b>Forgot Password</b></a>
        </div>
        {/* <!-- /.login-logo --> */}
        <div class="card">
        <div class="card-body login-card-body">
        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

        <form onSubmit={handleSubmit} method="post">
            <div class="input-group mb-3">
            <input type="email" name="email" value={state.email} onChange={handleInput} class="form-control" placeholder="Email"/>
            <div class="input-group-append">
                <div class="input-group-text">
                <span class="fas fa-envelope"></span>
                </div>
            </div>
            </div>
            <div class="row">
            <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Request new password</button>
            </div>
            </div>
        </form>

        <p class="mt-3 mb-1">
            Already have an account? Please <NavLink to="admin/login">Login !!!</NavLink>
        </p>
        </div>
    </div>
    </div>
    </>
    );
}

export default ForgotPassword;