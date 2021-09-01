import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { fetchcategories, createAction } from "../../store/actions/ProductAction";
import { REMOVE_PRODUCT_ERRORS } from "../../store/types/ProductType";


const AddProduct = (props) => {
    const dispatch = useDispatch();
    const { productErrors,redirect,categories } = useSelector((state)=> state.ProductReducer);
    const [state,setState] = useState({
        name:'',
        category:'',
        code: '',
        price:'',
        discount:'',
        image:'',
        description:'',
        short_description:'',
        featured:false,
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
    const handleCheck = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.checked
        });
    }
    const createProduct = (e) =>{
        e.preventDefault();
        const {name,category,code,price,discount,image,description,short_description,featured} = state;
        const formData = new FormData();
        formData.append('product_name',name);
        formData.append('category_id',category);
        formData.append('product_code', code);
        formData.append('product_price', price);
        formData.append('product_discount', discount);
        formData.append('product_image', image);
        formData.append('description', description);
        formData.append('short_desc', short_description);
        formData.append('featured', featured);
        dispatch(createAction(formData));
    }

    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/product/all?page=1');
        }
        if(productErrors.length > 0){
            productErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors,redirect]);
    useEffect(()=>{
        dispatch(fetchcategories());
    },[]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create product - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Product</h4>
                    <h3><NavLink exact to="/admin/product/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Product</NavLink></h3>
                </div>
                <form role="form" onSubmit={createProduct}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Product Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Product Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Product Category</label>
                        <div className="col-sm-8">
                           <select className="form-control" name="category" onChange={handleInput}>
                               <option value="">Select Category</option>
                               {
                                   categories.map((category,index)=>(
                                       <option key={index} value={category._id}>{category.category_name}</option>
                                   ))
                               }
                           </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="code" value={state.code} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Product Code" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Price</label>
                        <div className="col-sm-8">
                           <input type="text" name="price" value={state.price} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Price" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Product Discount</label>
                        <div className="col-sm-8">
                           <input type="text" name="discount" value={state.discount} onChange={handleInput} class="form-control" id="exampleInputE" placeholder="Enter Discount" />
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Image</label>
                        <div className="col-sm-8">
                            <input type="file" onChange={handleImage} name="image"  class="form-control" accept="image/*"/>
                        </div>
                    </div>
                    {preview?(
                    <div class="form-group row">
                        <label for="exampleInputPreview" className="col-sm-2  col-form-label">Product Image Preview</label>
                        <div className="col-sm-8">
                            <img src={preview} width="100" height="100"></img>
                        </div>
                    </div>
                    ):('')}
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Description</label>
                        <div className="col-sm-8">
                            <textarea onChange={handleInput} value={state.description} name="description" rows="4"  class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Product Short Description</label>
                        <div className="col-sm-8">
                            <textarea onChange={handleInput} value={state.short_description} name="short_description" rows="4"  class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Featured</label>
                        <div className="col-sm-8">
                            <input type="checkbox" onChange={handleCheck} value={state.featured} name="featured"/>
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

export default AddProduct;