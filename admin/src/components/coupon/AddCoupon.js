import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import toast, {Toaster} from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../store/actions/CouponAction";
import { useEffect } from "react";
import { REMOVE_COUPON_ERRORS } from "../../store/types/CouponType";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";

const AddCoupon = (props) => {
    const dispatch = useDispatch();
    const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
    const { loading, couponErrors, redirect } = useSelector((state)=>state.CouponReducer);
    const [state, setState] = useState({
        code: '',
        amount: '',
        expiry_date: '',
    })
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const handleNumber = (e) =>{
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setState({...state, amount: e.target.value});
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(createAction(state, user_type));
    }
    useEffect(()=>{
        if(redirect){
            props.history.push('/admin/coupon/all?page=1');
        }
        if(couponErrors && couponErrors.length > 0){
            couponErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_COUPON_ERRORS});
        }
    },[couponErrors,redirect]);
    useEffect(()=>{
        return ()=>{
          dispatch({type: REMOVE_UNAUTHORIZED_ACCESS});
        }
      },[]);
  
    if (unauthorized) {
       return <Forbidden/>
    }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Create coupon - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Coupon</h4>
                    <h3><NavLink exact to="/admin/coupon/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Coupon</NavLink></h3>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Coupon Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="code" value={state.code} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Coupon Code"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Coupon amount</label>
                        <div className="col-sm-8">
                           <input type="text" name="amount" value={state.amount} onChange={handleNumber} class="form-control" id="exampleInputEmail1" placeholder="Enter Coupon amount"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputImage" className="col-sm-2  col-form-label">Expiry date</label>
                        <div className="col-sm-8">
                            <input type="date" value={state.expiry_date} onChange={handleInput} name="expiry_date"  class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default AddCoupon;