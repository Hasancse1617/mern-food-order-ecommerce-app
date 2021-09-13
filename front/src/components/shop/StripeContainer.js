import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addPayment, orderStatusCannge } from '../../store/actions/ProductAction';

const StripeContainer = ({payment_gateway}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const order_id = sessionStorage.getItem('orderId');
    const { user } = useSelector((state)=>state.UserReducer);
    const { message } = useSelector((state)=>state.ProductReducer);
    const { totalAmount } = useSelector((state)=>state.ProductReducer);
    const pay = async(e) =>{
        e.preventDefault();
        try {
            const response = await dispatch(addPayment(totalAmount));
            const cardElement = elements.getElement(CardElement);
            const confirmPayment = await stripe.confirmCardPayment(response, {
                payment_method: {card: cardElement}
            });
            const { paymentIntent } = confirmPayment
            if(paymentIntent.status === 'succeeded'){
                dispatch(orderStatusCannge({status: 'success', order_id, user_id: user._id}));
                document.getElementById('modal_close').click();
                sessionStorage.setItem('totalPayment', totalAmount);
                history.push("/shop/thanks");
            } 
            else{
                console.log("Fail")
                dispatch(orderStatusCannge({status: 'fail', order_id, user_id: user._id}));
                document.getElementById('modal_close').click();
                history.push("/shop/cancel");
            }
        } catch (error) {
            console.log("Fail")
            dispatch(orderStatusCannge({status: 'fail', order_id, user_id: user._id}));
            document.getElementById('modal_close').click();
            history.push("/shop/cancel");
        }
    }
    const cancelPayment = () =>{
        dispatch(orderStatusCannge({status: 'fail', order_id, user_id: user._id}));
        history.push("/shop/cancel");
    }
    useEffect(()=>{
        if(message && payment_gateway === 'Card'){
            toast.success(`${message}. Please make Payment !`);
        }
    },[message]);
    return (
        <div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form onSubmit={pay}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Card Info</h5>
                            <button type="button" onClick={cancelPayment} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <CardElement/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={cancelPayment} id="modal_close" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" class="btn btn-primary">Payment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StripeContainer;