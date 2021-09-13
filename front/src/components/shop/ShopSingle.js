import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchSingle, relatedProducts, sizeToPrice, addToCartAction } from "../../store/actions/ProductAction";
import Loader from "../loader/Loader";
import loadjs from "loadjs";
import Swal from 'sweetalert2';
import toast, {Toaster} from "react-hot-toast";
import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";
import Review from "./Review";

const ShopSingle = () => {
    const { code } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [htmlloading, setHtmlLoading] = useState(true);
    const { user } = useSelector((state)=>state.UserReducer);
    const { reviews } = useSelector((state)=>state.ReviewReducer);
    const { product, loading, relatedproducts, attrprice, productErrors, message } = useSelector((state)=>state.ProductReducer);
    const selectSize = (e) =>{
        setSize(e.target.value);
        dispatch(sizeToPrice(code, e.target.value));
    }
    const quantityAddesd = (type) =>{
        if(type === 'plus'){
            setQuantity(quantity+1);
        }else{
            if(quantity===1){
                setQuantity(quantity);
                return false;
            }
            setQuantity(quantity-1);
        }
    }
    const addToCart = (e) =>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to add product');
            return false;
        }
        dispatch(addToCartAction({user_id: user._id, code, size, quantity, attrprice}));
    }
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchSingle(code));
    },[]);
    useEffect(()=>{
        dispatch(fetchSingle(code));
        dispatch(relatedProducts(code));
    },[code]);
    useEffect(()=>{
        loadjs('/assets/js/main.js',()=>{});
    },[relatedproducts,product]);
    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_PRODUCT_MESSAGE});
            history.push("/shop/cart");
        }
    },[message]);
    useEffect(()=>{
        if(productErrors.length > 0){
            productErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors]);
    return !htmlloading? (
        <><Toaster position="top-right" reverseOrder={true}/>
            {loading ? <Loader/>:''}
            <div className="shop-details-area pd-top-100">
                <div className="container">
                    <div className="row justify-content-center">
                        {!loading?<div className="col-md-6">
                            <div className="sticy-product">
                                <div className="product-thumbnail-wrapper">
                                    {product.images?<div className="single-thumbnail-slider">
                                        {product.images.map((image)=>(
                                           <div className="slider-item">
                                                <img src={`/images/product_images/large/${image.image}`} alt="item"/>
                                            </div>
                                        ))}
                                    </div>:''}
                                    {product.images? <div className="product-thumbnail-carousel">
                                        {product.images.map((image)=>(
                                        <div className="single-thumbnail-item">
                                            <img src={`/images/product_images/small/${image.image}`} alt="item"/>
                                        </div>
                                        ))}
                                    </div>:''}
                                </div>
                            </div>
                        </div>:''}
                        <div className="col-md-6">
                            <div className="shop-item-details">
                                <nav>
                                    <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                    {product.category?<li className="breadcrumb-item"><NavLink to={`/shop/category/${product.category[0].url}?page=1`}>{ product.category[0].category_name }</NavLink></li>:''}
                                    <li className="breadcrumb-item active" aria-current="page">Shop Details</li>
                                    </ul>
                                </nav>                        
                                <h2 className="entry-title">{ product.product_name }</h2>
                                <div className="row">
                                    <div className="col-lg-6 order-lg-last align-self-center">
                                        <div className="rating text-lg-end">
                                            {product.total_count? (product.total_count/product.review_count).toFixed(1):'0.0'}
                                            <span className="rating-inner">
                                                <img className="red_rating" style={{clip: `rect(0px, ${product.total_count? (product.total_count/product.review_count)*20 : 0 }px, 50px, 0px)`}} src="/assets/img/rating.png"/>
                                                <img className="black_rating" src="/assets/img/black-rating.png"/>
                                            </span>
                                            ({reviews.length})
                                        </div> 
                                    </div>

                                    {attrprice > 0?<div className="col-lg-6 align-self-center">
                                       {product.product_discount > 0 ?
                                        <h4 className="price">${ attrprice - (product.product_discount*attrprice/100) } <del style={{color:'#198754'}}>${ attrprice }</del></h4>:
                                        <h4 className="price">${ attrprice }</h4>
                                        }
                                    </div>:''}
                                    {attrprice === 0?<div className="col-lg-6 align-self-center">
                                       {product.product_discount > 0 ?
                                        <h4 className="price">${ product.product_price - (product.product_discount*product.product_price/100) } <del style={{color:'#198754'}}>${ product.product_price }</del></h4>:
                                        <h4 className="price">${ product.product_price }</h4>
                                        }
                                    </div>:''}                              
                                </div>   
                                <p className="mt-4">{ product.short_desc }</p>  
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="variation">
                                            <h6>Select Size</h6>
                                            {product.attributes?<select onChange={selectSize}>
                                                <option disabled selected>--Choose youe Size--</option>
                                                {product.attributes.map((attribute)=>(
                                                   <option value={ attribute.size }>{ attribute.size }</option>
                                                ))}
                                            </select>:''}
                                        </div> 
                                    </div>
                                </div>    
                                <form onSubmit={addToCart}>
                                    <div className="quantity buttons_added">
                                        <input type="button" value="-" className="minus" onClick={()=>quantityAddesd('minus')}/>
                                        <input type="number" className="input-text text" name="quantity" value={quantity}/>
                                        <input type="button" value="+" className="plus" onClick={()=>quantityAddesd('plus')}/>
                                    </div>
                                    <button type="submit" className="btn btn-secondary">ADD TO CART</button>
                                </form>
                                <ul className="cat">
                                    <li> SKU: { product.product_code }</li>
                                    <li>Categories: {product.category? <NavLink to={`/shop/category/${product.category[0].url}?page=1`}>{ product.category[0].category_name }</NavLink>:""}  </li>
                                </ul>
                                <div className="shop-tabs">
                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews ({reviews.length}) </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            { product.description }
                                        </div>
                                        <Review code={code}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!loading?<section className="related-product-area pd-top-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="section-title mb-0">
                                <h2 className="title">Related Products</h2>
                            </div>
                            <div className="related-product-slider owl-carousel style-2">

                               {relatedproducts.map((product)=>(
                                   <div className="item">
                                   <div className="single-item-wrap">
                                       <div className="thumb">
                                           <img src={`/images/product_images/${product.product_image}`} alt="img"/>
                                           <a className="fav-btn" href="#"><i className="ri-heart-line"></i></a>
                                       </div>
                                       <div className="wrap-details">
                                           <h5><NavLink to={`/shop/single/${product.product_code}`}>{ product.product_name }</NavLink></h5>
                                           <div className="wrap-footer">
                                               <div className="rating">
                                                   4.9
                                                   <span className="rating-inner">
                                                       <i className="ri-star-fill ps-0"></i>
                                                       <i className="ri-star-fill"></i>
                                                       <i className="ri-star-fill"></i>
                                                       <i className="ri-star-fill"></i>
                                                       <i className="ri-star-half-line pe-0"></i>
                                                   </span>
                                                   (200)
                                               </div>
                                               {product.product_discount > 0?
                                                    <h6 className="price">${ product.product_price - (product.product_discount*product.product_price/100) } <del style={{color:"#198754"}}>${ product.product_price }</del></h6>
                                                    :
                                                    <h6 className="price">${ product.product_price }</h6>
                                                }
                                           </div>                            
                                       </div>
                                       <div className="btn-area">
                                           <NavLink className="btn btn-secondary" to={`/shop/single/${product.product_code}`}>CHOOSE OPTIONS </NavLink>         
                                       </div> 
                                   </div>
                               </div>
                               ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>:''}
        </>
    ):''
}

export default ShopSingle;