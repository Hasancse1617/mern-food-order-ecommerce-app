import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { verifyAccount } from "../../store/actions/UserAction";
import toast, {Toaster} from "react-hot-toast";
import Swal from 'sweetalert2';
import { REMOVE_USER_ERRORS, REMOVE_USER_MESSAGE } from "../../store/types/UserType";

const Activation = (props) => {
    const dispatch = useDispatch();
    const [htmlloading, setHtmlLoading] = useState(true);
    const { userErrors, message } = useSelector((state)=>state.UserReducer);
    const { token } = useParams();
    const activeAccount = (e) =>{
        e.preventDefault();
        dispatch(verifyAccount(token));
    }
    useEffect(()=>{
        setHtmlLoading(false);
    },[]);
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
                            <h1>Active Account</h1>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Active Account</li>
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
                        <div className="login-box text-center">
                            <form onSubmit={activeAccount}>
                                <button type="submit" className="active-account">Active Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    ):''
}

export default Activation;