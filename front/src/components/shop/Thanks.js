import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import toast, {Toaster} from "react-hot-toast";
import { REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";
import { fetchCartItems } from "../../store/actions/ProductAction";

const Thanks = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [htmlloading, setHtmlLoading] = useState(true);
    const { user } = useSelector((state)=>state.UserReducer);
    const { message } = useSelector((state)=>state.ProductReducer);
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchCartItems(user._id));
        if(!sessionStorage.getItem('orderId')){
            history.push("/shop/cart");
        }
        setTimeout(()=>{
            sessionStorage.removeItem('orderId');
            sessionStorage.removeItem('totalPayment');
        },3000);
    },[]);
    useEffect(()=>{
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_PRODUCT_MESSAGE});
        }
    },[message]);
    return !htmlloading? (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
         <div class="checkout-area pd-top-120 pd-bottom-120 text-center">
           <h1>Thanks for your order</h1>
           {sessionStorage.getItem('totalPayment')?<h3>Your Payble amount is: ${sessionStorage.getItem('totalPayment')}</h3>:''}
           <p>Your Order ID: #{sessionStorage.getItem('orderId')}</p>
         </div>
        </>
    ):''
}

export default Thanks;