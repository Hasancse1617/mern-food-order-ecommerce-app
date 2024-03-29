import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { fetchCartItems, updateCartItem, deleteCartItem, fetchCoupon } from "../../store/actions/ProductAction";
import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_MESSAGE, SET_TOTAL_AMOUNT } from "../../store/types/ProductType";
import Loader from "../loader/Loader";

const Cart = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.UserReducer);
    const { cartItems, productErrors, message, loading, totalAmount } = useSelector((state)=>state.ProductReducer);
    const [htmlloading, setHtmlLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchCartItems(user._id));
        sessionStorage.setItem('couponAmount', 0);
        sessionStorage.setItem('couponCode', '');
    },[]);
    const quantityAction = (cartId, quantity, product_id, size) =>{
        dispatch(updateCartItem({cartId, quantity, product_id, size}));
        sessionStorage.setItem('couponAmount', 0);
        sessionStorage.setItem('couponCode', '');
    }
    const deleteItem = (cartId) =>{
        dispatch(deleteCartItem(cartId));
        sessionStorage.setItem('couponAmount', 0);
        sessionStorage.setItem('couponCode', '');
    }
    useEffect(()=>{
        if(productErrors.length > 0){
            productErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors]);
    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch(fetchCartItems(user._id));
            dispatch({type: REMOVE_PRODUCT_MESSAGE});
            if(sessionStorage.getItem('couponAmount')){
                setCouponCode('');
            }
        }
    },[message]);
    const couponAction = (e) =>{
        e.preventDefault();
        dispatch(fetchCoupon(couponCode));
    }
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
                            <h3>Cart Page
                            </h3>
                            <h1>Check your box
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li className="breadcrumb-item active" aria-current="page">Cart</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="cart-area pd-top-120 pd-bottom-120">
            <div className="container">
                {cartItems.length > 0 ?
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
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item)=>(
                                    <tr>
                                        <td className="table-close-btn"><a onClick={()=>deleteItem(item._id)} style={{cursor:"pointer"}}><i className="ri-close-line"></i></a></td>
                                        <th scope="row"><img width={100} src={`/images/product_images/${item.product_id.product_image}`} alt="img"/></th>
                                        <td colspan="2" className="item-name">
                                            <div className="details">
                                                <h5>{ item.product_id.product_name }</h5>
                                                <ul>
                                                    <li><span>Select Size: </span>{ item.size }</li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>${ (item.attr_price).toFixed(2) }</td>
                                        <td>${ ((item.attr_price * item.product_id.product_discount)/100).toFixed(2) } X { item.quantity }</td>
                                        <td className="table-quantity">
                                            <form>
                                                <div className="quantity buttons_added">
                                                    <input type="button" value="-" className="minus quantity_minus" onClick={()=>quantityAction(item._id, item.quantity-1, item.product_id._id, item.size)}/>
                                                    <input type="number" className="input-text text"  id={`quantity-${item._id}`} name="quantity" value={item.quantity} />
                                                    <input type="button" value="+" className="plus quantity_plus" onClick={()=>quantityAction(item._id, item.quantity+1, item.product_id._id, item.size)}/>
                                                </div>
                                            </form>
                                        </td>
                                        <td>${((item.attr_price - (item.attr_price * item.product_id.product_discount)/100)*item.quantity).toFixed(2)}</td>
                                    </tr>
                                     ))}
                                </tbody>
                            </table>
                        </div>                    
                    </div>
                    <div className="col-lg-8">
                        <div className="promotional-area">
                            <form className="default-form-wrap" onSubmit={couponAction}>
                                <div className="row">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="single-input-wrap">
                                            <input type="text" className="form-control" placeholder="Coupon Code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <button type="submit" className="btn btn-secondary">APPLY COUPON</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="order-cart-area">
                            <div className="order-cart">
                                <h5>Cart totals</h5>
                                <ul>
                                    <li>Subtotal<span>${ totalAmount.toFixed(2) }</span></li>
                                    <li>Coupon Discount<span>${sessionStorage.getItem('couponAmount')? parseFloat(sessionStorage.getItem('couponAmount')).toFixed(2) : '0.00'}</span></li> 
                                    <li className="total">Total<span>${ parseFloat(totalAmount.toFixed(2) - sessionStorage.getItem('couponAmount')).toFixed(2) }</span></li>
                                </ul>
                            </div>
                            <NavLink className="btn btn-secondary w-100" to="/shop/checkout"> PROCEED TO CHECKOUT</NavLink>
                        </div>                
                    </div>
                </div>:<h2 className="text-center">Cart is empty</h2>}
            </div>
        </div>
        </>
    ):''
}

export default Cart;