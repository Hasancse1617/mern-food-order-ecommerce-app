import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { fetchCartItems, fetchDeliveryAddress, checkoutAction } from "../../store/actions/ProductAction";
import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";
import Loader from "../loader/Loader";
import StripeContainer from "./StripeContainer";
import $ from 'jquery';

const Checkout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state)=>state.UserReducer);
    const { cartItems, totalAmount, deleveryAddress, productErrors, message, loading } = useSelector((state)=>state.ProductReducer);
    const [htmlloading, setHtmlLoading] = useState(true);
    const [payment_gateway, setPayment_gateway] = useState('');
    const [state, setState] = useState({
        name:'',
        email:'',
        mobile:'',
        zipcode:'',
        address:'',
        district:'',
        country:'',
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = () =>{
        if(payment_gateway === 'PayPal'){
            toast.error("This payment method not available");
            return false;
        }
        if(cartItems.length < 1){
            toast.error("Your Cart is Empty...")
            history.push("/shop/cart");
            return false;
        }
        const couponAmount = sessionStorage.getItem('couponAmount');
        const couponCode = sessionStorage.getItem('couponCode',);
        dispatch(checkoutAction({user_id: user._id, state,cartItems,couponCode,couponAmount,payment_gateway,totalAmount}));
    }
    useEffect(()=>{
        dispatch(fetchDeliveryAddress(user._id));
        dispatch(fetchCartItems(user._id));
        setHtmlLoading(false);
    },[]);
    useEffect(()=>{
        if(message){
            dispatch(fetchCartItems(user._id));
            if(payment_gateway === 'COD'){
                history.push("/shop/thanks");
            }
            if(payment_gateway === 'Card'){
                document.getElementById('modal_open').click();
            }
        }
    },[message]);
    useEffect(()=>{
        if(deleveryAddress){
            setState({
                name: deleveryAddress.name,
                email: deleveryAddress.email,
                mobile: deleveryAddress.mobile,
                zipcode: deleveryAddress.zipcode,
                address: deleveryAddress.address,
                district: deleveryAddress.district,
                country: deleveryAddress.country,
            });
            
        }
    },[deleveryAddress]);
    useEffect(()=>{
        if(productErrors.length > 0){
            productErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors]);
    return !htmlloading? (
        <>
        {loading ? <Loader/> :''} 
        
        <StripeContainer payment_gateway={payment_gateway} />
        <Toaster position="top-right" reverseOrder={true}/>
           <section class="breadcrumb-area">
            <div class="banner-bg-img"></div>
            <div class="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img"/></div>
            <div class="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img"/></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 align-self-center">
                        <div class="banner-inner text-center">
                            <h3>Checkout
                            </h3>
                            <h1>delivery & payment info
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="checkout-area pd-top-120 pd-bottom-120">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-7">
                        <div class="bill-payment-wrap">
                        <button id="modal_open" style={{display: "none"}} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">dddddd</button> 
                            <h5>Billing details
                            </h5>
                            <form class="default-form-wrap style-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Name</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" placeholder="Your Name"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Email</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="email" value={state.email} onChange={handleInput} class="form-control" placeholder="Email"/>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <label>Address</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="address" value={state.address} onChange={handleInput} class="form-control" placeholder="Address"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Mobile</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="mobile" value={state.mobile} onChange={handleInput} class="form-control" placeholder="Mobile"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Zip Code</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="zipcode" value={state.zipcode} onChange={handleInput} class="form-control" placeholder="Zip Code"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>District</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="district" value={state.district} onChange={handleInput} class="form-control" placeholder="District"/>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label>Country</label>
                                        <div class="single-input-wrap">
                                            <input type="text" name="country" value={state.country} onChange={handleInput} class="form-control" placeholder="Country"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>                    
                    </div>
                    <div class="col-lg-5">
                        <div class="order-area">
                            <h5 class="title">Your order</h5>
                            {cartItems.map((item)=>(
                                <div class="order-product">
                                    <div class="thumb">
                                        <img width="80" src={`/images/product_images/${item.product_id.product_image}`} alt="img"/>
                                    </div>
                                    <div class="details">
                                        <h6>{ item.product_id.product_name }</h6>
                                        <ul>
                                            <li><span>Select Size: </span>{ item.size }, &nbsp; <span>Unit Price: </span>{ (item.attr_price).toFixed(2) }</li>
                                            <li><span>Discount: </span>${ ((item.attr_price * item.product_id.product_discount)/100).toFixed(2) } X { item.quantity }, <span>Total: </span>${ ((item.attr_price - (item.attr_price * item.product_id.product_discount)/100)*item.quantity).toFixed(2) }</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            <ul class="amount">
                                <li>Subtotal<span>${totalAmount.toFixed(2)}</span></li>
                                <li>Coupon Discount<span>${sessionStorage.getItem('couponAmount')? parseFloat(sessionStorage.getItem('couponAmount')).toFixed(2) : '0.00'}</span></li> 
                                <li class="total">Grand Total<span>${ parseFloat(totalAmount.toFixed(2) - sessionStorage.getItem('couponAmount')).toFixed(2) }</span></li>
                            </ul>
                            <div class="peyment-method">
                                <h6>Check payments</h6>
                                <ul class="card-area">
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" value="Card" onChange={(e)=>setPayment_gateway(e.target.value)} type="radio" name="payment_gateway" id="flexRadioDefault1"/>
                                            <label class="form-check-label" for="flexRadioDefault1">
                                            </label>
                                        </div>
                                        <div class="details">
                                            <h6>Credit/Debit Cart <img src="/assets/img/icon/peyment-card.png" alt="img"/></h6>
                                            <p>Pay with visa, Anex, MasterCard, Maestro,Discover and many other credit and debit credit vai paypal</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" value="PayPal" onChange={(e)=>setPayment_gateway(e.target.value)} type="radio" name="payment_gateway" id="flexRadioDefault2"/>
                                            <label class="form-check-label" for="flexRadioDefault2">
                                            </label>
                                        </div>
                                        
                                        <div class="details">
                                            <h6>PayPal <img src="/assets/img/icon/paypal-card.png" alt="img"/></h6>
                                            <p>Pay easily, fast and secure with PayPal.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="form-check">
                                            <input class="form-check-input" value="COD" onChange={(e)=>setPayment_gateway(e.target.value)} type="radio" name="payment_gateway" id="flexRadioDefault3"/>
                                            <label class="form-check-label" for="flexRadioDefault2">
                                            </label>
                                        </div>
                                        <div class="details">
                                            <h6>Cash On Delivery <img width="60" src="/assets/img/icon/cod.png" alt="img"/></h6>
                                            <p>Pay easily, fast and secure with CoD.</p>
                                        </div>
                                    </li>
                                </ul>
                                
                            </div>
                            <a class="btn btn-secondary w-100" onClick={handleSubmit}> PLACE ORDER</a>
                        </div>                
                    </div>
                </div>
            </div>
        </div>
        </>
    ):''
}

export default Checkout;