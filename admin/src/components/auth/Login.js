import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { AuthLogin, googleLogin, facebookLogin } from  "../../store/actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_LOGIN_ERRORS } from '../../store/types/AuthType';
import { NavLink } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

const Login = () => {
    const dispatch = useDispatch();
    const {loading, loginErrors} = useSelector((state)=>state.AuthReducer);
    const [state, setState] = useState({
        email: '',
        password: '',
        remember_me: false,
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleCheck = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        })
    }
    const userLogin = (e) =>{
        e.preventDefault();
        dispatch(AuthLogin(state));
        console.log(state);
    }
    useEffect(()=>{
        if(loginErrors.length > 0){
            loginErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_LOGIN_ERRORS});
        }
    }, [loginErrors]);

    const responseGoogle = (response) =>{
        dispatch(googleLogin(response.tokenId));
    }
    const responseFacebook = (response) =>{
        console.log(response)
        dispatch(facebookLogin(response.userID, response.accessToken));
    }

    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div className="login-box">
            <Helmet>
                <title>User Login - Movie</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <a href="../../index2.html"><b>Admin Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>Sign In</h5></p>
                
                <form onSubmit={userLogin}>
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" value={state.email} onChange={handleInputs} placeholder="Email"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" value={state.password} onChange={handleInputs} placeholder="Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                        <input type="checkbox" value={state.remember_me} name="remember_me" onChange={handleCheck} id="remember"/>
                        <label for="remember">
                            Remember Me
                        </label>
                        </div>
                    </div>
                    {/* <!-- /.col --> */}
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    {/* <!-- /.col --> */}

                    </div>
                    
                </form>

                <div class="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <FacebookLogin
                        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                        autoLoad={false}
                        callback={responseFacebook}
                        render={renderProps => (
                            <button className="btn btn-block btn-success" onClick={renderProps.onClick}><i class="fab fa-facebook mr-2"></i>  Facebook</button>
                        )}
                        />
                     <GoogleLogin
                        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                        render={renderProps => (
                        <button className="btn btn-block btn-primary" onClick={renderProps.onClick} disabled={renderProps.disabled}><i class="fab fa-google mr-2"></i>  Google</button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                {/* <!-- /.social-auth-links --> */}

                <p class="mb-1">
                    <NavLink to="/admin/forgot-password">I forgot my password</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default Login;