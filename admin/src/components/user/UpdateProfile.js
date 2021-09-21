import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchUser } from '../../store/actions/UserAction';
import Loader from '../loader/Loader';
import { REMOVE_SINGLE_USER, REMOVE_USER_ERRORS, REMOVE_USER_MESSAGE, REMOVE_USER_REDIRECT } from "../../store/types/UserType";


const UpdateProfile = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {userErrors,redirect,loading,user,status,message} = useSelector((state)=> state.UserReducer);
 
    const [state,setState] = useState({
        name:'',
        email:'',
        user_image:'',
        user_type:'',
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
    const updateUser = (e) =>{
        e.preventDefault();
        const {name,user_image} = state;
        const formData = new FormData();
        formData.append('name',name);
        formData.append('image',user_image);
        dispatch(updateUserProfile(formData,id));
    }
    useEffect(()=>{
        if (status) {
            setState({
                ...state,
                name: user.name,
                email: user.email,
                user_type: user.user_type,
            });
            setPreview(`${process.env.REACT_APP_API_PATH}/images/user_images/${user.image}`);
            dispatch({type: REMOVE_SINGLE_USER});
        } else{
            dispatch(fetchUser(id));
        }
    },[user]);

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
            <title>Update Profile - Ecommerce</title>
            <meta name="description" content="Category Edit Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Update Profile</h4>
                    {/* <h3><NavLink exact to="/admin/post/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Post</NavLink></h3> */}
                </div>
                {!loading? 
                <form role="form" onSubmit={updateUser}>
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
                           <input type="email" name="email" value={state.email} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter User Email" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">User Type</label>
                        <div className="col-sm-8">
                        <input type="email" name="email" value={state.user_type} onChange={handleInput} class="form-control" id="exampleInputEmai" placeholder="Enter User Usertype" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">User Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="user_image"  class="form-control" id="exampleInputImage"/>
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

export default UpdateProfile;