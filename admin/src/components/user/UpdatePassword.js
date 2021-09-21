import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../store/actions/UserAction';
import Loader from '../loader/Loader';
import { REMOVE_USER_ERRORS, REMOVE_USER_MESSAGE, REMOVE_USER_REDIRECT } from "../../store/types/UserType";


const UpdatePassword = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {userErrors,redirect,loading,message} = useSelector((state)=> state.UserReducer);
 
    const [state,setState] = useState({
        password:'',
        new_password:'',
        con_password:'',
    });
    const handleInput = (e) =>{
         setState({
             ...state,
             [e.target.name]: e.target.value
         });
    }
    const UserPassword = (e) =>{
        e.preventDefault();
        dispatch(updateUserPassword(state,id));
    }
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/dashboard');
            dispatch({type: REMOVE_USER_REDIRECT});
        }
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 2000
            })
          dispatch({type: REMOVE_USER_MESSAGE});
        }
        if(userErrors && userErrors.length > 0){
            userErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_USER_ERRORS});
        }
    },[userErrors,redirect]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Update Password - Ecommerce</title>
            <meta name="description" content="Password Update Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Update Password</h4>
                    {/* <h3><NavLink exact to="/admin/post/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Post</NavLink></h3> */}
                </div>
                {!loading? 
                <form role="form" onSubmit={UserPassword}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">User Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="password" value={state.password} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Password"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">New Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="new_password" value={state.new_password} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter New Password"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Confirm Password</label>
                        <div className="col-sm-8">
                        <input type="password" name="con_password" value={state.con_password} onChange={handleInput} class="form-control" id="exampleInputEmai" placeholder="Enter Confirm Password"/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>: <Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default UpdatePassword;