import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction, fetchRole } from "../../store/actions/UserAction";
import { REMOVE_USER_ERRORS } from "../../store/types/UserType";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";


const AddUser = (props) => {
    const dispatch = useDispatch();
    const { userErrors,redirect, roles } = useSelector((state)=> state.UserReducer);
    const { user, unauthorized } = useSelector((state)=> state.AuthReducer);
    const [state,setState] = useState({
        name:'',
        email:'',
        image:'',
        user_type:'',
        password:'',
        c_password:'',
    });
    const [preview, setPreview] = useState('');
    const handleInput = (e) =>{
         setState({
             ...state,
             [e.target.name]: e.target.value
         });
    }
    const handleImage = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const createUser = (e) =>{
        e.preventDefault();
        const {name,email,image,user_type,password,c_password} = state;
        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('image',image);
        formData.append('user_type',user_type);
        formData.append('password',password);
        formData.append('c_password',c_password);
        // console.log(user_image);
        dispatch(createAction(formData, user.user_type));
    }
    useEffect(()=>{
        dispatch(fetchRole(user.user_type));
        return ()=>{
            dispatch({type: REMOVE_UNAUTHORIZED_ACCESS});
        }
    },[]);
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/user/all?page=1');
        }
        if(userErrors && userErrors.length > 0){
            userErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_USER_ERRORS});
        }
    },[userErrors,redirect]);
    if (unauthorized) {
        return <Forbidden/>
    }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create user - Movie</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add User</h4>
                    <h3><NavLink exact to="/admin/user/all?page=1" className="btn btn-sm btn-success float-right text-bold">All User</NavLink></h3>
                </div>
                <form role="form" onSubmit={createUser}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">User Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter User Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">User Email</label>
                        <div className="col-sm-8">
                           <input type="email" name="email" value={state.email} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter User Email"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">User Type</label>
                        <div className="col-sm-8">
                          <select class="form-control" name="user_type" onChange={handleInput}>
                              <option value="">Select User Type</option>
                              {roles.map((role)=>(
                                <option value={role.name}>{ role.name }</option>
                              ))}
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">User Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="image"  class="form-control"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">User Image Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">User Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="password" value={state.password} onChange={handleInput} class="form-control" id="exampleInputPassword" placeholder="Enter Password"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword" className="col-sm-2  col-form-label">Confirm Password</label>
                        <div className="col-sm-8">
                           <input type="password" name="c_password" value={state.c_password} onChange={handleInput} class="form-control"  placeholder="Enter Confirm Password"/>
                        </div> 
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default AddUser;