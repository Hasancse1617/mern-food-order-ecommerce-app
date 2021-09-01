import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchCategories } from "../../store/actions/CategoryAction";
import { fetchProducts, hotdealsProducts } from "../../store/actions/ProductAction";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import $ from 'jquery';

const Shop = (props) => {
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page');
    const { url } = useParams();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const [sorting, setSorting] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const { categories } = useSelector((state)=>state.CategoryReducer);
    const { products, loading, count, perPage, hotProducts } = useSelector((state)=>state.ProductReducer);
    const sortingChange = (e) =>{
        setSorting(e.target.value);
    }
    const priceSlider = (e) =>{
        const price = $("#amount").val();
        const priceArr = price.split(' ');
        setMin(priceArr[0].slice(1));
        setMax(priceArr[2].slice(1));
        scrollRef.current.scrollIntoView();
    }
    useEffect(()=>{
        dispatch(fetchProducts({url,sorting,page,min,max}));
    },[url,sorting,page,min,max]);
    useEffect(()=>{
        setMin(0);
        setMax(0);
        scrollRef.current.scrollIntoView();
    },[url]);
    useEffect(()=>{
        scrollRef.current.scrollIntoView();
    },[page]);
    useEffect(()=>{
        window.scrollTo(0,0);
        dispatch(fetchCategories());
        dispatch(hotdealsProducts());
    },[]);
    return (
        <> 
           {loading ? <Loader/> :''}  
            <section className="breadcrumb-area">
                <div className="banner-bg-img"></div>
                <div className="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img"/></div>
                <div className="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img"/></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 align-self-center">
                            <div className="banner-inner text-center">
                                <h3>Choose you items
                                </h3>
                                <h1>SHOP PAGE</h1>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                    <li className="breadcrumb-item active" aria-current="page">Shop</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div ref={scrollRef}></div>
            <section className="shop-area pd-top-120 pd-bottom-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="row justify-content-center">
                                <div className="col-sm-6 align-self-center pb-4">
                                    <p className="mb-0">Showing {((page-1)*perPage)+1}–{count > page*perPage?page*perPage : count} of {count} results</p>
                                </div>
                                <div className="col-sm-6 align-self-center pb-4"  onChange={sortingChange}>
                                    <div>
                                        <select name="sortingcategory">
                                            <option value="" selected>Default sorting</option>
                                            <option value="product_latest">Newest Item</option>
                                            <option value="product_name_a_z">Product Name A-Z</option>
                                            <option value="product_name_z_a">Product Name Z-A</option>
                                            <option value="price_lowest">Lowest Price First</option>
                                            <option value="price_highest">Highest Price First</option>
                                        </select>
                                    </div>
                                </div>

                               {products.map((product)=>(
                                <div key={product._id} className="col-md-6">
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
                                                <>
                                                   <h6 className="price">${ product.product_price - (product.product_discount*product.product_price/100) }</h6>
                                                   <h6 className="price" style={{color:"#198754"}}><del>${ product.product_price }</del></h6>
                                                </>:
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
                        <div className="col-lg-4 order-lg-first">
                            <div className="sidebar-area">
                                <div className="widget widget_categories style-2">
                                    <h4 className="widget-title">Categories</h4>
                                    <ul>
                                        {categories.map((category)=>(
                                            <li key={category._id}><NavLink to={`/shop/category/${category.url}?page=1`} className="single_category"><img src={`/images/category_images/${category.category_image}`} alt="img"/> { category.category_name }</NavLink></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="widget widget_filter">
                                    <h4 className="widget-title">Filter by Price</h4>  
                                    <div className="side-bar-range">
                                        <div id="slider-range"></div>
                                        <div className="row g-0">
                                            <div className="col-lg-6 align-self-center">
                                                <a className="btn btn-base" onClick={priceSlider}>Filter</a>
                                            </div>
                                            <div className="col-lg-6 align-self-center">
                                                <p>Price:
                                                    <input type="text" name="amount" id="amount" readOnly/>
                                                </p>
                                            </div>
                                        </div>                                
                                    </div>
                                </div>
                                <div className="widget widget-recent-post style-2">
                                    <h4 className="widget-title">Today’s Best Deals</h4>
                                    <ul>
                                        {hotProducts.map((product)=>(
                                        <li key={product._id}>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img height={100} width={100} src={`/images/product_images/${product.product_image}`} alt="widget"/>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="title"><NavLink to={`/shop/single/${product.product_code}`}>{ product.product_name }</NavLink></h6>
                                                    <div className="rating">
                                                        4.9
                                                        <span className="rating-inner">
                                                            <i className="ri-star-fill ps-0"></i>
                                                            <i className="ri-star-fill"></i>
                                                            <i className="ri-star-fill"></i>
                                                            <i className="ri-star-fill"></i>
                                                            <i className="ri-star-half-line pe-0"></i>
                                                        </span>
                                                        (462)
                                                    </div>
                                                    {product.product_discount > 0?
                                                       <h6 className="price">${ product.product_price - (product.product_discount*product.product_price/100) } <del style={{color:"#198754"}}>${ product.product_price }</del></h6>
                                                       :
                                                       <h6 className="price">${ product.product_price }</h6>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        ))}
                        
                                    </ul>
                                </div>
                            </div>
                        </div>  
                        {count > perPage?             
                        <div className="col-12">
                            <Pagination count={count} perPage={perPage} page={page} pageLink={`/shop/category/${url}`} />
                        </div>:''}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;