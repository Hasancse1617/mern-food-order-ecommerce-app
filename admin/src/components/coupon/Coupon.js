import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import toast, {Toaster} from "react-hot-toast";
import Swal from 'sweetalert2'
import $ from 'jquery';
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { REMOVE_COUPON_MESSAGE, REMOVE_COUPON_REDIRECT, REMOVE_SINGLE_COUPON } from "../../store/types/CouponType";
import { deleteAction, fetchCoupons, statusAction } from "../../store/actions/CouponAction";
import { useDispatch, useSelector } from "react-redux";

const Coupon = (props) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')
  const { message, coupons, loading } = useSelector((state)=>state.CouponReducer);
  const couponStatus = () =>{
      $(document).on('click', '.updateCouponStatus', function(){
        const coupon_id = $(this).attr('data-coupon');
        const status = $(this).children("i").attr("status");
        dispatch(statusAction({coupon_id,status}));
      })
  }
  const deleteCoupon = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));
      }
    })
  }
  useEffect(()=>{
      if(message){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            toast: true,
            showConfirmButton: false,
            timer: 2000
          })
        dispatch({type: REMOVE_COUPON_MESSAGE});
        dispatch({type: REMOVE_COUPON_REDIRECT});
        dispatch(fetchCoupons(page));
      }
    },[message]);
    useEffect(()=>{
        dispatch(fetchCoupons(page));
    },[page]);
    useEffect(()=>{
      dispatch({type: REMOVE_SINGLE_COUPON});
    },[]);
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Coupons - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Coupon</h4>
                    <h3><NavLink exact to="/admin/coupon/create"><button type="button" class="btn btn-primary float-right text-bold">Add Coupon</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Code</th>
                        <th>Amount</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      coupons.length > 0 ?
                      coupons.map((coupon, index)=>(
                          <tr key={coupon._id}>
                          <td>{ index+1}</td>
                          <td>{ coupon.code }</td>
                          <td>{ coupon.amount }</td>
                          <td>{ coupon.expiry_date }</td>
                          <td>
                              {
                                (coupon.status === true) ? 
                                <a class="updateCouponStatus" data-coupon={coupon._id} id={`coupon-${coupon._id}`} onClick={couponStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={coupon.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateCategoryStatus" data-coupon={coupon._id} id={`coupon-${coupon._id}`} onClick={couponStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={coupon.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <NavLink exact to={`/admin/coupon/edit/${coupon._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteCoupon(coupon._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No Coupons found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {/* {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''} */}
        </section>
        </div>
    );
}

export default Coupon;