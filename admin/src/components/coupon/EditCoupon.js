import toast, {Toaster} from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import moment from 'moment';
import { REMOVE_COUPON_ERRORS } from "../../store/types/CouponType";
import { fetchCoupon, updateAction } from "../../store/actions/CouponAction";
import Loader from "../loader/Loader";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";
import Forbidden from "../forbidden/Forbidden";

const EditCoupon = (props) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
    const { loading, couponErrors, redirect, status, coupon } = useSelector((state)=>state.CouponReducer);
    const [state,setState] = useState({
        code:'',
        amount:'',
        expiry_date:'',
    });
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
        dispatch(updateAction(state,id));
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
        if(status){
           setState({
               code: coupon.code,
               amount: coupon.amount,
               expiry_date: coupon.expiry_date
           });
        }
        dispatch(fetchCoupon(id, user_type));
    },[status]);

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
            <title>Edit coupon - ecom website</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Edit Coupon</h4>
                    <h3><NavLink exact to="/admin/coupon/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Coupon</NavLink></h3>
                </div>
                {!loading?<form role="form" onSubmit={handleSubmit}>
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
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>:<Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}

export default EditCoupon;