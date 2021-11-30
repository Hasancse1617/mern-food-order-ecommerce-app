import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { updateAction, fetchCategory } from "../../store/actions/CategoryAction";
import { REMOVE_CATEGORY_ERRORS } from "../../store/types/CategoryType";
import Loader from "../loader/Loader";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";


const EditCategory = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
    const { loading, categoryErrors, redirect, category, status } = useSelector((state)=> state.CategoryReducer);
    const [url,setUrl] = useState('');
    const [state,setState] = useState({
        category_name:'',
        category_image:'',
    });
    const [preview, setPreview] = useState('');
    const handleNameUrl = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        const createUrl = e.target.value.trim().split(' ').join('-');
        setUrl(createUrl.toLowerCase());
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
    const updateCategory = (e) =>{
        e.preventDefault();
        const {category_name,category_image} = state;
        const formData = new FormData();
        formData.append('category_name',category_name);
        formData.append('category_image',category_image);
        formData.append('url', url);
        dispatch(updateAction(formData,id));
    }

    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/category/all?page=1');
        }
        if(categoryErrors && categoryErrors.length > 0){
            categoryErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_CATEGORY_ERRORS});
        }
    },[categoryErrors,redirect]);

    useEffect(()=>{
        if(status){
           setState({
               category_name: category.category_name,
           });
           setUrl(category.url);
           setPreview(`${process.env.REACT_APP_API_PATH}/images/category_images/${category.category_image}`)
        }
        dispatch(fetchCategory(id, user_type));
    },[status]);

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
            <title>Edit category - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Edit Category</h4>
                    <h3><NavLink exact to="/admin/category/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Category</NavLink></h3>
                </div>
                {!loading?<form role="form" onSubmit={updateCategory}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Category Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="category_name" value={state.category_name} onChange={handleNameUrl} class="form-control" id="exampleInputName" placeholder="Enter Category Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Url</label>
                        <div className="col-sm-8">
                           <input type="text" name="url" value={url} class="form-control" id="exampleInputEmail1" placeholder="Enter url" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Category Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="category_image"  class="form-control"/>
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
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>:<Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default EditCategory;