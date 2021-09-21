import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { fetchOrder, updateOrderStatus } from "../../store/actions/OrderAction";
import Loader from "../loader/Loader";
import { NavLink } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [orderstatus, setOrderstatus] = useState('');
    const { order, loading } = useSelector((state)=>state.OrderReducer);
    useEffect(()=>{
        dispatch(fetchOrder(id));
    },[]);
    useEffect(()=>{
        if(order.order){
            setOrderstatus(order.order.order_status);
        }
    },[order]);
    const orderStatus = (e) =>{
        e.preventDefault();
        if(orderstatus === ''){
            toast.error("Please select Order Status");
            return false;
        }
        dispatch(updateOrderStatus({order_id: id, order_status: orderstatus}));
    }
    return !loading ?(
        <section class="content-wrapper">
            <Toaster position="top-right" reverseOrder={false}/>
            <div className="card-header">
                    <h4 className="float-left">Order Details</h4>
                    <h3><NavLink exact to="/admin/order/all?page=1"><button type="button" className="btn btn-primary float-right text-bold">All Order</button></NavLink></h3>
                  </div>
            {order.order ?
            <div class="container-fluid">
                <div class="row">
                <div class="col-md-6">
                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Order Details &nbsp; &nbsp; #{ order.order._id }</strong></h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td><strong>Order Date</strong></td>
                                <td>{ moment(order.order.createdAt).format('DD MMMM YYYY') }</td>
                            </tr>
                            <tr>
                                <td><strong>Order Status</strong></td>
                                <td>{ order.order.order_status }</td>
                            </tr>
                            {/* @if(!empty($orderDetails['courier_name']))
                            <tr>
                                <td><strong>Courier Name</strong></td>
                                <td>{{ $orderDetails['courier_name'] }}</td>
                            </tr>
                            @endif */}
                            {/* @if(!empty($orderDetails['tracking_number']))
                            <tr>
                            <td><strong>Tracking Number</strong></td>
                            <td>{{ $orderDetails['tracking_number'] }}</td>
                            </tr>
                            @endif */}
                            <tr>
                            <td><strong>Order Total</strong></td>
                            <td>${ order.order.grand_total }</td>
                            </tr>
                            <tr>
                            <td><strong>Shipping Charges</strong></td>
                            <td>${ order.order.shipping_charge }</td>
                            </tr>
                            <tr>
                            <td><strong>Coupon Code</strong></td>
                            <td>{ order.order.coupon_code }</td>
                            </tr>
                            <tr>
                            <td><strong>Coupon Amount</strong></td>
                            <td>${ order.order.coupon_amount }</td>
                            </tr>
                            <tr>
                            <td><strong>Payment Method</strong></td>
                            <td>{ order.order.payment_method }</td>
                            </tr>
                            <tr>
                            <td><strong>Payment Gateway</strong></td>
                            <td>{ order.order.payment_gateway }</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Delivery Address</strong></h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                            <tr>
                            <td><strong>Name</strong></td>
                            <td>{ order.order.name }</td>
                            </tr>

                            <tr>
                            <td><strong>Address</strong></td>
                            <td>{ order.order.address }</td>
                            </tr>

                            <tr>
                            <td><strong>District</strong></td>
                            <td>{ order.order.district }</td>
                            </tr>

                            <tr>
                            <td><strong>Country</strong></td>
                            <td>{ order.order.country }</td>
                            </tr>

                            <tr>
                            <td><strong>Zipcode</strong></td>
                            <td>{ order.order.zipcode }</td>
                            </tr>

                            <tr>
                            <td><strong>Mobile</strong></td>
                            <td>{ order.order.mobile }</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Customer Details</strong></h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                            <tr>
                            <td><strong>Name</strong></td>
                            <td>{ order.customer.name }</td>
                            </tr>
                            <tr>
                            <td><strong>Email</strong></td>
                            <td>{ order.customer.email }</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>

                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Billing Address</strong></h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                            <tr>
                            <td><strong>Name</strong></td>
                            <td>{ order.customer.name }</td>
                            </tr>

                            <tr>
                            <td><strong>Address</strong></td>
                            {/* <td>{ order.customer.address }</td> */}
                            </tr>

                            <tr>
                            <td><strong>City</strong></td>
                            {/* <td>{{ $userDetails['city'] }}</td> */}
                            </tr>

                            <tr>
                            <td><strong>State</strong></td>
                            {/* <td>{{ $userDetails['district'] }}</td> */}
                            </tr>

                            <tr>
                            <td><strong>Country</strong></td>
                            {/* <td>{{ $userDetails['country'] }}</td> */}
                            </tr>

                            <tr>
                            <td><strong>Zipcode</strong></td>
                            {/* <td>{{ $userDetails['pincode'] }}</td> */}
                            </tr>

                            <tr>
                            <td><strong>Mobile</strong></td>
                            <td>{ order.customer.mobile }</td>
                            </tr>   
                        </tbody>
                        </table>
                    </div>
                    </div>
                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Update Order Status</strong></h3>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                        <tbody>
                            <tr>
                                <td colspan="2">
                                    {/* <input type="hidden" name="order_id" value="{{ $orderDetails['id'] }}"> */}
                                    <select name="order_status" style={{width:"70%",display:"inline-block"}} class="form-control" onChange={(e)=>setOrderstatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="New" selected={order.order.order_status === 'New'}>New</option>
                                        <option value="Pending" selected={order.order.order_status === 'Pending'}>Pending</option>
                                        <option value="Hold" selected={order.order.order_status === 'Hold'}>Hold</option>
                                        <option value="Cancelled" selected={order.order.order_status === 'Cancelled'}>Cancelled</option>
                                        <option value="In Process" selected={order.order.order_status === 'In Process'}>In Process</option>
                                        <option value="Paid" selected={order.order.order_status === 'Paid'}>Paid</option>
                                        <option value="Shipped" selected={order.order.order_status === 'Shipped'}>Shipped</option>
                                        <option value="Delivered" selected={order.order.order_status === 'Delivered'}>Delivered</option>
                                    </select>
                                    <button class="btn btn-success ml-3 mb-1" onClick={orderStatus} type="submit" >Submit</button>
                                </td>
                            </tr>
                            {order.orderLogs.map((log)=>(
                                <tr>
                                   <td><strong>{ log.order_status }</strong></td>
                                   <td>{ moment(log.createdAt).format('DD MMMM YYYY, hh:mm a') }</td>
                                </tr>
                            ))}
                             
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><strong>Ordered Products</strong></h3>
                    </div>
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                        <thead>
                            <tr>
                            <th>Product Image</th>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Product Size</th>
                            <th>Product Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order.ordersProduct.map((order)=>(
                            <tr>
                                <td>
                                   <a target="_blank" href="#"><img style={{width: "100px"}} src={`/images/product_images/${order.product_id.product_image}`} alt=""/></a>
                                </td>
                                <td>{ order.product_code }</td>
                                <td>{ order.product_name }</td>
                                <td>{ order.product_size }</td>
                                <td>{ order.product_qty }</td>
                            </tr>
                        ))}
                        {/* @foreach($orderDetails['orders_products'] as $product)
                        <tr>
                            <td>
                            <?php $getProductImage = App\Product::getProductImage($product['product_id']) ?>
                            <a target="_blank" href="{{ url('product/'.$product['product_id']) }}"><img style="width: 100px;" src="{{ asset('images/product_images/small/'.$getProductImage['main_image']) }}" alt=""></a>
                            </td>
                            <td>{{ $product['product_code'] }}</td>
                            <td>{{ $product['product_name'] }}</td>
                            <td>{{ $product['product_size'] }}</td>
                            <td>{{ $product['product_color'] }}</td>
                            <td>{{ $product['product_qty'] }}</td>
                        </tr>
                        @endforeach */}
                        
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>:''}
        </section>
    ):<Loader/>
}

export default OrderDetails;