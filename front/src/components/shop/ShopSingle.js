import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchSingle, relatedProducts, sizeToPrice } from "../../store/actions/ProductAction";
import Loader from "../loader/Loader";
import loadjs from "loadjs";

const ShopSingle = () => {
    const { code } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const { product, loading, relatedproducts, attrprice } = useSelector((state)=>state.ProductReducer);
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
        console.log(size,quantity);
    }
    useEffect(()=>{
        dispatch(fetchSingle(code));
        dispatch(relatedProducts(code));
    },[code]);
    useEffect(()=>{
        loadjs('/assets/js/main.js',()=>{});
    },[relatedproducts]);
    return (
        <>
            {loading ? <Loader/>:<>
            <div class="shop-details-area pd-top-100">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <div class="sticy-product">
                                <div class="product-thumbnail-wrapper">
                                    {product.images?<div class="single-thumbnail-slider">
                                        {product.images.map((image)=>(
                                           <div class="slider-item">
                                                <img src={`/images/product_images/large/${image.image}`} alt="item"/>
                                            </div>
                                        ))}
                                    </div>:''}
                                    {product.images? <div class="product-thumbnail-carousel">
                                        {product.images.map((image)=>(
                                        <div class="single-thumbnail-item">
                                            <img src={`/images/product_images/small/${image.image}`} alt="item"/>
                                        </div>
                                        ))}
                                    </div>:''}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="shop-item-details">
                                <nav>
                                    <ul class="breadcrumb">
                                    <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                    {product.category?<li class="breadcrumb-item"><NavLink to={`/shop/category/${product.category[0].url}?page=1`}>{ product.category[0].category_name }</NavLink></li>:''}
                                    <li class="breadcrumb-item active" aria-current="page">Shop Details</li>
                                    </ul>
                                </nav>                        
                                <h2 class="entry-title">{ product.product_name }</h2>
                                <div class="row">
                                    <div class="col-lg-6 order-lg-last align-self-center">
                                        <div class="rating text-lg-end">
                                            4.9
                                            <span class="rating-inner">
                                                <i class="ri-star-fill ps-0"></i>
                                                <i class="ri-star-fill"></i>
                                                <i class="ri-star-fill"></i>
                                                <i class="ri-star-fill"></i>
                                                <i class="ri-star-half-line pe-0"></i>
                                            </span>
                                            (200)
                                        </div> 
                                    </div>

                                    {attrprice > 0?<div class="col-lg-6 align-self-center">
                                       {product.product_discount > 0 ?
                                        <h4 class="price">${ attrprice - (product.product_discount*attrprice/100) } <del style={{color:'#198754'}}>${ attrprice }</del></h4>:
                                        <h4 class="price">${ attrprice }</h4>
                                        }
                                    </div>:''}
                                    {attrprice === 0?<div class="col-lg-6 align-self-center">
                                       {product.product_discount > 0 ?
                                        <h4 class="price">${ product.product_price - (product.product_discount*product.product_price/100) } <del style={{color:'#198754'}}>${ product.product_price }</del></h4>:
                                        <h4 class="price">${ product.product_price }</h4>
                                        }
                                    </div>:''}                              
                                </div>   
                                <p class="mt-4">{ product.short_desc }</p>  
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="variation">
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
                                    <div class="quantity buttons_added">
                                        <input type="button" value="-" class="minus" onClick={()=>quantityAddesd('minus')}/>
                                        <input type="number" class="input-text text" name="quantity" value={quantity}/>
                                        <input type="button" value="+" class="plus" onClick={()=>quantityAddesd('plus')}/>
                                    </div>
                                    <button type="submit" class="btn btn-secondary">ADD TO CART</button>
                                </form>
                                <ul class="cat">
                                    <li> SKU: { product.product_code }</li>
                                    <li>Categories: {product.category? <NavLink to={`/shop/category/${product.category[0].url}?page=1`}>{ product.category[0].category_name }</NavLink>:""}  </li>
                                </ul>
                                <div class="shop-tabs">
                                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Description</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews (1) </button>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            { product.description }
                                        </div>
                                        <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                            <div class="comment-area">
                                                <div class="media">
                                                    <div class="media-left">
                                                        <img src="/assets/img/blog/comment.png" alt="img"/>
                                                    </div>
                                                    <div class="media-body">
                                                        <h6>Haslida heris</h6>
                                                        <span>20 Feb 2020 at 4:00 pm</span>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <form class="default-form-wrap style-2">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="single-input-wrap">
                                                            <input type="text" class="form-control" placeholder="Your Name"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="single-input-wrap">
                                                            <input type="text" class="form-control" placeholder="Your Email"/>
                                                        </div>
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="single-textarea-wrap">
                                                            <textarea rows="4" placeholder="Review..."></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-base">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="related-product-area pd-top-120">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12">
                            <div class="section-title mb-0">
                                <h2 class="title">Related Products</h2>
                            </div>
                            <div class="related-product-slider owl-carousel style-2">

                               {relatedproducts.map((product)=>(
                                   <div class="item">
                                   <div class="single-item-wrap">
                                       <div class="thumb">
                                           <img src={`/images/product_images/${product.product_image}`} alt="img"/>
                                           <a class="fav-btn" href="#"><i class="ri-heart-line"></i></a>
                                       </div>
                                       <div class="wrap-details">
                                           <h5><NavLink to={`/shop/single/${product.product_code}`}>{ product.product_name }</NavLink></h5>
                                           <div class="wrap-footer">
                                               <div class="rating">
                                                   4.9
                                                   <span class="rating-inner">
                                                       <i class="ri-star-fill ps-0"></i>
                                                       <i class="ri-star-fill"></i>
                                                       <i class="ri-star-fill"></i>
                                                       <i class="ri-star-fill"></i>
                                                       <i class="ri-star-half-line pe-0"></i>
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
                                       <div class="btn-area">
                                           <NavLink class="btn btn-secondary" to={`/shop/single/${product.product_code}`}>CHOOSE OPTIONS </NavLink>         
                                       </div> 
                                   </div>
                               </div>
                               ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section></>}
        </>
    );
}

export default ShopSingle;