import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { register } from "../../store/actions/UserAction";
import toast, {Toaster} from "react-hot-toast";
import Swal from 'sweetalert2';
import { REMOVE_USER_ERRORS, REMOVE_USER_MESSAGE } from "../../store/types/UserType";

const Register = (props) => {
    const dispatch = useDispatch();
    const { userErrors, message } = useSelector((state)=>state.UserReducer);
    const [htmlloading, setHtmlLoading] = useState(true);
    const [state, setState] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirm_password: '',
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleNumber = (e) =>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setState({...state, mobile: e.target.value});
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(register(state));
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
          props.history.push(`/user/login`);
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
                            <h1>Register</h1>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Register</li>
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
                            <h3 className="text-center">Register</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="name" value={state.name} onChange={handleInput} placeholder="Enter Name"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" value={state.email} onChange={handleInput} placeholder="Enter email"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="mobile" value={state.mobile} onChange={handleNumber} placeholder="Enter mobile"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" value={state.password} onChange={handleInput} placeholder="Password"/>
                                </div><br></br>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="confirm_password" value={state.confirm_password} onChange={handleInput} placeholder="Confirm Password"/>
                                </div><br></br>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <p style={{textAlign:"right"}}><NavLink to="/user/login">Login</NavLink></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    ):''
}

export default Register;