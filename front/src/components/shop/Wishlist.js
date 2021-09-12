import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import toast, {Toaster} from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchWishlists, deleteWishlist } from "../../store/actions/ReviewAction";
import { REMOVE_REVIEW_MESSAGE } from "../../store/types/ReviewType";

const Wishlist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [htmlloading, setHtmlLoading] = useState(true);
    const { loading, wishlists, message } = useSelector((state)=>state.ReviewReducer);
    const deleteItem = (id) =>{
        dispatch(deleteWishlist(id));
    }
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchWishlists(id));
    },[]);
    useEffect(()=>{
        if(message){
            dispatch(fetchWishlists(id));
            dispatch({type: REMOVE_REVIEW_MESSAGE})
        }
    },[message]);
    return !htmlloading? (
        <>
        {loading ? <Loader/> :''}  
        <Toaster position="top-right" reverseOrder={true}/>
           <section className="breadcrumb-area">
            <div className="banner-bg-img"></div>
            <div className="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img"/></div>
            <div className="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img"/></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 align-self-center">
                        <div className="banner-inner text-center">
                            <h3>Wishlist Page
                            </h3>
                            <h1>Check your wishlist
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Wishlist</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="cart-area pd-top-120 pd-bottom-120">
            <div className="container">
                {wishlists.length > 0 ?
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="table-responsive mb-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="blank"></th>
                                        <th className="blank"></th>
                                        <th className="blank"></th>
                                        <th className="title-name">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col">Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlists.map((item)=>(
                                    <tr>
                                        <td className="table-close-btn" title="Remove"><a onClick={()=>deleteItem(item._id)} style={{cursor:"pointer"}}><i className="ri-close-line"></i></a></td>
                                        <th scope="row"><img width={100} src={`/images/product_images/${item.product_id.product_image}`} alt="img"/></th>
                                        <td colspan="2" className="item-name">
                                            <div className="details">
                                                <h5>{ item.product_id.product_name }</h5>
                                            </div>
                                        </td>
                                        <td>${ (item.product_id.product_price).toFixed(2) }</td>
                                        <td>{ (item.product_id.product_discount).toFixed(2) }%</td>
                                        <td className="table-quantity">
                                            1
                                        </td>
                                        <td><NavLink to={`/shop/single/${item.product_id.product_code}`} title="Add to Cart" style={{color:'#51c543'}}><i class="fas fa-shopping-cart"></i></NavLink></td>
                                    </tr>
                                     ))}
                                </tbody>
                            </table>
                        </div>                    
                    </div>
                </div>
                :<h2 className="text-center">Wishlist is empty</h2>} 
            </div>
        </div>
        </>
    ):''
}

export default Wishlist;