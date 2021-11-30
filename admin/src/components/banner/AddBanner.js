import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useState } from "react";
import { createBanner } from "../../store/actions/BannerAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { REMOVE_BANNER_ERRORS } from "../../store/types/BannerType";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";

const AddBanner = (props) => {
    const dispatch = useDispatch();
    const [preview, setPreview] = useState('');
    const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
    const { bannerErrors, redirect } = useSelector((state)=>state.BannerReducer);
    const [state, setState] = useState({
        title: '',
        image: '',
        btn_text: '',
        btn_url: ''
    });
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
    const createAction = (e) =>{
        e.preventDefault();
        const { title, image, btn_text, btn_url } = state;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('btn_text', btn_text);
        formData.append('btn_url', btn_url);
        dispatch(createBanner(formData,user_type));
    }
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/banner/all?page=1');
        }
        if(bannerErrors && bannerErrors.length > 0){
            bannerErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_BANNER_ERRORS});
        }
    },[bannerErrors,redirect]);
    useEffect(()=>{
        return ()=>{
            dispatch({type: REMOVE_UNAUTHORIZED_ACCESS});
        }
    },[]);
    if (unauthorized) {
        return <Forbidden/>
    }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create banner - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Banner</h4>
                    <h3><NavLink exact to="/admin/banner/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Banner</NavLink></h3>
                </div>
                <form role="form" onSubmit={createAction}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Banner Title</label>
                        <div className="col-sm-8">
                           <input type="text" name="title" value={state.title} onChange={handleInput} class="form-control" placeholder="Enter Banner Title"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Button Text</label>
                        <div className="col-sm-8">
                           <input type="text" name="btn_text" value={state.btn_text} onChange={handleInput} class="form-control" placeholder="Enter Button Text"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Button Url</label>
                        <div className="col-sm-8">
                           <input type="text" name="btn_url" value={state.btn_url} onChange={handleInput} class="form-control" placeholder="Enter Button Url"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Banner Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="image"  class="form-control"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Category Image Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
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

export default AddBanner;