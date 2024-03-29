import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "../../store/actions/CategoryAction";
import { fetchPosts } from "../../store/actions/PostAction";
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { fetchBanners } from "../../store/actions/BannerAction";
import { popularProducts } from "../../store/actions/ProductAction";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { popularproducts } = useSelector((state)=>state.ProductReducer);
    const { categories } = useSelector((state)=>state.CategoryReducer);
    const { posts } = useSelector((state)=>state.PostReducer);
    const { banners } = useSelector((state)=>state.BannerReducer);
    const [htmlloading, setHtmlLoading] = useState(true);
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchCategories());
        dispatch(fetchPosts());
        dispatch(fetchBanners());
        dispatch(popularProducts());
    },[]);
    
    return !htmlloading? (
        <>
            <section className="banner-area">
                <div className="banner-thumb">
                    <img src="/assets/img/banner/banner.png" alt="img"/>
                </div>
                <div className="banner-bg-img"></div>
                <div className="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img"/></div>
                <div className="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img"/></div>
                {banners.map((banner,index)=>(
                  index === 0? <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 align-self-center">
                            <div className="banner-inner text-center">
                                <h3>Do not miss it!</h3>
                                <h1>{ banner.title }</h1>
                                <NavLink className="btn btn-secondary" to={{pathname: `${banner.btn_url}`}} target="_blank">{ banner.btn_text }</NavLink>
                            </div>
                        </div>
                    </div>
                </div>:''
                ))}
            </section>
            {/* <!-- Banner Area End -->  */}
            
            {/* <!-- category Area Start--> */}
            <section className="category-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 align-self-center">
                            <ul className="category-menu">
                                {
                                    categories.map((category)=>(
                                        <li key={category._id} className="category-wrap"><NavLink to={`/shop/category/${category.url}?page=1`}><img src={`/images/category_images/${category.category_image}`} alt="category"/>{ category.category_name }</NavLink>
                                    
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- category Area End -->  */}

            {/* <!-- offer Area Start--> */}
            {/* <section className="offer-area pd-top-120 pd-bottom-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 align-self-center d-contents">
                            <div className="single-offer-wrap">
                                <img className="bg-img" src="assets/img/offer/1.png" alt="img"/>
                                <div className="wrap-details">
                                    <h2>Special Deliciaus </h2>
                                    <h5>Maxican Pizza Testes Better</h5>
                                    <a className="btn btn-white" href="shop.html">ORDER NOW</a>
                                </div>
                                <div className="offer-sticker">
                                    <img src="assets/img/offer/offer.png" alt="img"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 align-self-center">
                            <div className="single-offer-wrap">
                                <img className="bg-img" src="assets/img/offer/2.png" alt="img"/>
                                <div className="wrap-details">
                                    <h3>Enjoy Our Delicious Item</h3>
                                    <a className="btn btn-white" href="shop.html">ORDER NOW</a>
                                </div>
                            </div>
                            <div className="single-offer-wrap" style={{backgroundColor: "#FFEECC"}}>
                                <div className="animated-img"><img src="assets/img/offer/03.png" alt="img"/></div>
                                <div className="animated-img animated-img-2"><img src="assets/img/offer/03.png" alt="img"/></div>
                                <div className="overlay-gradient"></div>
                                <div className="wrap-details">
                                    <h3 className="text-heading">The Fastest In Delivery <span>Food</span></h3>
                                    <a className="btn btn-white" href="shop.html">ORDER NOW</a>
                                </div>
                                <img className="bg-img-2" src="assets/img/offer/3.png" alt="img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <!-- offer Area End -->  */}

            {/* <!-- populer Area Start--> */}
            <section className="populer-area pd-bottom-90 mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h3 className="sub-title">Our signature</h3>
                                <h2 className="title">Popular Dishes</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {popularproducts.map((product)=>(
                        <div className="col-lg-4 col-md-6">
                            <div className="single-item-wrap">
                                <div className="thumb">
                                    <img src={`/images/product_images/${product.product_image}`} alt="img"/>
                                    <a className="fav-btn" href="#"><i className="ri-heart-line"></i></a>
                                </div>
                                <div className="wrap-details">
                                    <h5><NavLink to={`/shop/single/${product.product_code}`}>{ product.product_name }</NavLink></h5>
                                    <div className="wrap-footer">
                                        <div className="rating">
                                            {product.total_count?(product.total_count/product.review_count).toFixed(1):'0.0'}
                                            <span className="rating-inner">
                                                <img className="red_rating" style={{clip: `rect(0px, ${product.total_count?(product.total_count/product.review_count)*20 : 0}px, 50px, 0px)`}} src="/assets/img/rating.png"/>
                                                <img className="black_rating" src="/assets/img/black-rating.png"/>
                                            </span>
                                            ({product.review_count?product.review_count:0})
                                        </div>
                                        <h6 className="price">${ product.product_price.toFixed(2) }</h6>
                                    </div>                            
                                </div>
                                <div className="btn-area">
                                    <NavLink className="btn btn-secondary" to={`/shop/single/${product.product_code}`}>CHOOSE OPTIONS </NavLink>         
                                </div> 
                            </div>
                        </div>))}
                    </div>
                </div>
            </section>
            {/* <!-- populer Area End --> */}

            {/* <!-- featured Area Start--> */}
            <section className="featured-area pd-bottom-150" style={{backgroundImage: "url(assets/img/other/featured.png)"}}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-title text-center">
                                <h3 className="sub-title text-secondary">Tasty how The new</h3>
                                <h2 className="title text-white">Meet Your New Lunchtime Faves</h2>
                                <a className="btn btn-base" href="menu.html">SEE ALL MENU</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- featured Area End --> */}

            {/* <!-- about Area Start--> */}
            <section className="about-area pd-top-120 pd-bottom-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="thumb mb-lg-0 mb-4">
                                <img src="assets/img/other/about.png" alt="img"/>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title text-lg-start text-center">
                                <h3 className="sub-title">Why choose us</h3>
                                <h2 className="title">Why we are the best</h2>
                                <p>A, blandit euismod ullamcorper vestibulum enim habitasse. Ultrices tincidunt scelerisque elit enim. A neque malesuada in tortor eget justo mauris nec dolor. Consequat risus vitae, ac ac et preparation. He wanted to serve burgers, fries and beverages that tasted .</p>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="single-about-wrap">
                                        <img src="assets/img/icon/1.png" alt="img"/>
                                        Fresh food
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-about-wrap">
                                        <img src="assets/img/icon/2.png" alt="img"/>
                                        Fast Delivery
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-about-wrap">
                                        <img src="assets/img/icon/3.png" alt="img"/>
                                        Quality Maintain
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-about-wrap">
                                        <img src="assets/img/icon/4.png" alt="img"/>
                                        24/7 Service
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- about Area End --> */}

            {/* <!-- product Area Start--> */}
            <section className="product-area pd-bottom-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h3 className="sub-title">Our signature</h3>
                                <h2 className="title">Delicious Deals for Delicious Meals</h2>
                            </div>
                            <ul className="product-nav nav nav-pills" id="pills-tab" role="tablist">
                                {categories.map((category,index)=>(
                                    <li className="nav-item" role="presentation">
                                       <button className={index == 0 ?'nav-link active':'nav-link'} id={`pills-${category.url}-tab`} data-bs-toggle="pill" data-bs-target={`#pills-${category.url}`} type="button" role="tab" aria-controls={`pills-${category.url}`} aria-selected="true"><img src={`/images/category_images/${category.category_image}`} alt="img"/>{ category.url }</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        {categories.map((category, index)=>(
                            <div className={index==0?'tab-pane fade show active':'tab-pane fade'} id={`pills-${category.url}`} role="tabpanel" aria-labelledby={`pills-${category.url}-tab`}>
                                <div className="row justify-content-center">
                                    {category.products.map((product,index)=>(
                                        index < 6? <div className="col-lg-4 col-md-6">
                                          <div className="single-item-wrap">
                                            <div className="thumb">
                                                <img src={`/images/product_images/${product.product_image}`} alt="img"/>
                                                <a className="fav-btn" href="#"><i className="ri-heart-line"></i></a>
                                            </div>
                                            <div className="wrap-details">
                                                <h5><NavLink to={`/shop/single/${product.product_code}`}>{ product.product_name }</NavLink></h5>
                                                <div className="wrap-footer">
                                                    <div className="rating">
                                                       {product.total_count?(product.total_count/product.review_count).toFixed(1):'0.0'}
                                                        <span className="rating-inner">
                                                           <img className="red_rating" style={{clip: `rect(0px, ${product.total_count?(product.total_count/product.review_count)*20 : 0}px, 50px, 0px)`}} src="/assets/img/rating.png"/>
                                                           <img className="black_rating" src="/assets/img/black-rating.png"/>
                                                        </span>
                                                        ({product.review_count?product.review_count:0})
                                                    </div>
                                                    <h6 className="price">${ product.product_price.toFixed(2) }</h6>
                                                </div>                            
                                            </div>
                                            <div className="btn-area">
                                                <NavLink className="btn btn-secondary" to={`/shop/single/${product.product_code}`}>CHOOSE OPTIONS </NavLink>         
                                            </div> 
                                        </div>
                                    </div>: ''
                                    ))}
                                </div>
                            </div>  ))};
                    </div>
                </div>
            </section>
            {/* <!-- product Area End --> */}

            {/* <!-- subscribe Area Start--> */}
            <section className="subscribe-area pd-bottom-150" style={{backgroundImage: "url(assets/img/other/location.png)"}}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-9 col-md-10">
                            <div className="section-title text-center">
                                <h3 className="sub-title text-secondary">Our Location</h3>
                                <h2 className="title text-white">Find foodka stores in your area</h2>
                                <form>
                                    <div className="single-input-wrap mb-0 with-btn">
                                        <input type="email" placeholder="Zip code or state providence"/>
                                        <button className="btn btn-base">SEE LOCATION</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- subscribe Area End --> */}

            {/* <!-- testimonial Area Start--> */}
            <section className="testimonial-area text-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-10">
                            <div className="testimonial-slider owl-carousel">
                                <div className="item">
                                    <div className="testimonial-wrap">
                                        <p>“We have no regrets! I don't know what else to say. It really saves me time and effort. Food is exactly what our business has been lacking”</p>
                                        <h3>Julia R. Davis
                                        </h3>
                                        <h6>Food Bloger</h6>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial-wrap">
                                        <p>“We have no regrets! I don't know what else to say. It really saves me time and effort. Food is exactly what our business has been lacking”</p>
                                        <h3>Davis J. Rulia
                                        </h3>
                                        <h6>Food Bloger</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- testimonial Area End --> */}

            {/* <!-- blog Area Start--> */}
            <section className="blog-area pd-bottom-90">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-7">
                            <div className="section-title text-center">
                                <h3 className="sub-title">News & Blog</h3>
                                <h2 className="title">Celebrating the awesomeness of food.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        {posts.map((post,index)=>(
                         index < 3?
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-wrap">
                                <div className="thumb">
                                    <img src={`/images/post_images/${post.image}`} alt="img"/>
                                </div>
                                <div className="wrap-details">
                                    <span className="cat">
                                        <span className="date">
                                            <i className="ri-calendar-todo-fill"></i>{moment(post.createdAt).format('MMMM D, YYYY')}
                                        </span>
                                        <NavLink to={`/post/${post.category_id.url}`} className="tag me-0">
                                            <i className="ri-price-tag-3-fill"></i>{ post.category_id.category_name }
                                        </NavLink>
                                    </span>
                                    <h5><NavLink to={`/post/single/${post.url}`}>{ post.title }</NavLink></h5> 
                                    <div className="wrap-hover-area">
                                        <p> { post.description.substr(0, 150) }
                                        </p> 
                                        <NavLink className="link-btn" to={`/post/single/${post.url}`}>Read More</NavLink> 
                                    </div>                       
                                </div> 
                            </div>
                        </div>:''))}

                    </div>
                </div>
            </section>
        </>
    ):''
}

export default Dashboard;