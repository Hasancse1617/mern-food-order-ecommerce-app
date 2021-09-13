import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";

const Cancel = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [htmlloading, setHtmlLoading] = useState(true);
    const { message } = useSelector((state)=>state.ProductReducer);
    useEffect(()=>{
        setHtmlLoading(false);
        if(!sessionStorage.getItem('orderId')){
            history.push("/shop/cart");
        }
        setTimeout(()=>{
            sessionStorage.removeItem('orderId');
        },3000);
    },[]);
    useEffect(()=>{
        if(message){
            toast.error('Payment Failed');
            dispatch({type: REMOVE_PRODUCT_MESSAGE});
        }
    },[message]);
    return !htmlloading? (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
         <div class="checkout-area pd-top-120 pd-bottom-120 text-center">
           <h2>Sorry cancel order for <br/> Payment Fail</h2>
           <p>Your Order ID: #{sessionStorage.getItem('orderId')}</p>
         </div>
        </>
    ):''
}

export default Cancel;