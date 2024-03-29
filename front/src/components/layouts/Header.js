import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { fetchCategories } from "../../store/actions/CategoryAction";
import { fetchCartItems } from "../../store/actions/ProductAction";
import { fetchWishlists } from "../../store/actions/ReviewAction";
import { SET_TOTAL_AMOUNT } from "../../store/types/ProductType";
import { LOGOUT } from "../../store/types/UserType";
import loadjs from "loadjs";

const Header = () => {
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const { categories } = useSelector((state)=>state.CategoryReducer);
    const { user } = useSelector((state)=>state.UserReducer);
    const { wishlists } = useSelector((state)=>state.ReviewReducer);
    const { totalCartItem, totalAmount, cartItems } = useSelector((state)=>state.ProductReducer);
    const logout = () =>{
        localStorage.removeItem('userToken');
        dispatch({type: LOGOUT});
    }
    useEffect(()=>{
        let totalPrice = 0;
        cartItems.map((item)=>{
            totalPrice = totalPrice + (item.attr_price - (item.attr_price * item.product_id.product_discount)/100)*item.quantity;
        })
        dispatch({type: SET_TOTAL_AMOUNT, payload: totalPrice});
    },[cartItems]);

    useEffect(()=>{
        loadjs('/assets/js/main.js',()=>{});
    },[pathname]);

    useEffect(()=>{
        if(user){
            dispatch(fetchWishlists(user._id));
            dispatch(fetchCartItems(user._id));
        }
    },[user]);
    useEffect(()=>{
        dispatch(fetchCategories());
    },[]);
    return (
        <> 
           <div className="preloader" id="preloader">
                <div className="preloader-inner">
                    <div id="wave1">
                    </div>
                    <div className="spinner">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                    </div>
                </div>
            </div>
            {/* <!-- preloader area end --> */}
           
            {/* <!-- search popup area start --> */}
            <div className="body-overlay" id="body-overlay"></div>
            <div className="td-search-popup" id="td-search-popup">
                <form action="https://themefie.com/html/foodka/index.html" className="search-form">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search....."/>
                    </div>
                    <button type="submit" className="submit-btn"><i className="fa fa-search"></i></button>
                </form>
            </div>
            {/* <!-- //. search Popup --> */}

            {/* <!-- navbar start --> */}
            <header className="navbar-area">
                <nav className="navbar navbar-expand-lg">
                    <div className="container nav-container">
                        <div className="responsive-mobile-menu">
                            <button className="menu toggle-btn d-block d-lg-none" data-target="#themefie_main_menu" 
                            aria-expanded="false" aria-label="Toggle navigation">
                                <span className="icon-left"></span>
                                <span className="icon-right"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="themefie_main_menu">
                            <ul className="navbar-nav menu-open">
                                <li className="current-menu-item">
                                    <NavLink to="/">HOME</NavLink>
                                </li>
                                <li className="current-menu-item menu-item-has-children">
                                    <a href="#">CATEGORY</a>
                                    <ul className="sub-menu ps-0">
                                        {categories.map((category)=>(
                                            <li><NavLink to={`/shop/category/${category.url}?page=1`}>{ category.category_name }</NavLink></li>
                                        ))}
                                    </ul>
                                </li>
                                <li>
                                    <a href="about.html">ABOUT US</a>
                                </li>
                                <li>
                                    <NavLink to={`/post?page=1`}>BLOG</NavLink>
                                </li>
                                <li>
                                    <a href="contact.html">CONTACTS</a>
                                </li>
                            </ul>
                        </div>
                        <div className="logo">
                            <NavLink className="main-logo" to="/"><img src="/assets/img/logo.png" alt="img"/></NavLink>
                        </div>
                        <div className="nav-right-part nav-right-part-mobile">
                            <ul>
                                <li><a className="search" href="#"><i className="ri-search-line"></i></a>
                                </li>
                                <li className="phone-contact d-md-block d-none"><i className="ri-phone-fill float-start"></i>
                                    +997 509 153 849
                                </li>
                                { !user ? <li><NavLink to={`/user/login`}>Login</NavLink></li>:
                                <>
                                    <li className="menu-cart"><NavLink to={`/shop/cart`}>CART <span>{ totalCartItem }</span></NavLink></li>
                                    <li>{ totalAmount.toFixed(2) } $</li>
                                    <li><NavLink to={`/shop/wishlist/${user._id}`} title="Wishlist"><i className="fas fa-heart"></i><span>{ wishlists.length }</span></NavLink></li>
                                    <li><a href="#" onClick={logout}>Logout</a></li>
                                </>}
                            </ul>
                        </div>
                        <div className="nav-right-part nav-right-part-desktop">                    
                            <ul>
                                <li><a className="search" href="#"><i className="ri-search-line"></i></a>
                                </li>
                                <li className="phone-contact"><i className="ri-phone-fill float-start"></i>
                                    +997 509 153 849
                                </li>
                                { !user ? <li><NavLink to={`/user/login`}>Login</NavLink></li>:
                                <>
                                    <li className="menu-cart"><NavLink to={`/shop/cart`}>CART <span>{ totalCartItem }</span></NavLink></li>
                                    <li>{ totalAmount.toFixed(2) } $</li>
                                    <li><NavLink to={`/shop/wishlist/${user._id}`} title="Wishlist"><i className="fas fa-heart"></i><span>{ wishlists.length }</span></NavLink></li>
                                    <li><a href="#" onClick={logout}>Logout</a></li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    );
}

export default Header;