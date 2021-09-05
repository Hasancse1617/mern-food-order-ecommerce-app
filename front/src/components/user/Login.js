import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../store/actions/UserAction";
import toast, {Toaster} from "react-hot-toast";
import Swal from 'sweetalert2';
import { REMOVE_USER_ERRORS, REMOVE_USER_MESSAGE } from "../../store/types/UserType";

const Login = () => {
    const [htmlloading, setHtmlLoading] = useState(true);
    const { userErrors, message } = useSelector((state)=>state.UserReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        remeber_me: false
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleChecked = (e) =>{
        setState({
            ...state,
            remember_me: e.target.checked
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(loginUser(state));
    }
    useEffect(()=>{
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 5000
            })
            dispatch({type: REMOVE_USER_MESSAGE});
        }
        if(userErrors.length > 0){
            userErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_USER_ERRORS});
        }
    },[userErrors,message]);
    useEffect(()=>{
        setHtmlLoading(false);
    },[]);
    return !htmlloading ? (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
          <section className="breadcrumb-area">
            <div className="banner-bg-img"></div>
            <div className="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img" /></div>
            <div className="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img" /></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 align-self-center">
                        <div className="banner-inner text-center">
                            <h3>User
                            </h3>
                            <h1>Login</h1>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Login</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="blog-area pd-top-120 pd-bottom-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4">
                        <div className="login-box">
                            <h3 className="text-center">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="email" name="email" value={state.email} onChange={handleInput} className="form-control" placeholder="Enter email"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="password" name="password" value={state.password} onChange={handleInput} className="form-control" placeholder="Password"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="checkbox" name="remember_me" onChange={handleChecked} className="form-check-input position-static" />
                                    <label className="form-check-label" for="exampleCheck1">Remeber Me</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <p style={{textAlign:"right"}}><NavLink to="/user/register">Register</NavLink></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    ):''
}

export default Login;