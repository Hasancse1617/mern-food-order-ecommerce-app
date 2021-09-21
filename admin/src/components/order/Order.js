import { useEffect } from "react";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../store/actions/OrderAction";
import ReactToPrint from "react-to-print";

const Order = (props) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')
  const { orders, loading, perPage, count, pageLink } = useSelector((state)=>state.OrderReducer);
  useEffect(()=>{
     dispatch(fetchOrders(page));
  },[page]);
    return (
        <div className="content-wrapper">
        <Helmet>
            <title>Orders - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="float-left">All Order</h4>
                    {/* <h3><NavLink exact to="/admin/product/create"><button type="button" className="btn btn-primary float-right text-bold">Add Product</button></NavLink></h3> */}
                  </div>
                  <div className="card-body">
                    <table id="order" className="table table-bordered table-hover table-striped">
                      <thead>
                      <tr>
                        <th>#Order ID</th>
                        <th>Order Date</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Order Amount</th>
                        <th>Order Status</th>
                        <th>Payment Method</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      orders.length > 0 ?
                      orders.map((order, index)=>(
                          <tr key={order._id}>
                            <td>{ order._id}</td>
                            <td style={{width: "110px"}}>{ moment(order.createdAt).format('D-MM-Y') }</td>
                            <td>{ order.name }</td>
                            <td>{ order.email }</td>
                            <td>{ order.grand_total }$</td>
                            <td>{ order.order_status }</td>
                            <td>{ order.payment_gateway }</td>
                            <td style={{width: "117px"}}>
                              <NavLink title="View Order Details" exact to={`/admin/order/details/${order._id}`} ><button className="text-success" ><i className="fas fa-file"></i></button></NavLink>&nbsp;
                              {/* <NavLink title="Order PDF Invoice" target="_blank" exact to={`/admin/order/order-pdf/${order._id}`} ><button className="text-success" ><i className="fas fa-print"></i></button></NavLink>&nbsp; */}
                              <NavLink title="Print Invoice" target="_blank" exact to={`/admin/order/order-print/${order._id}`} ><button className="text-success" ><i className="fas fa-file-pdf"></i></button></NavLink>&nbsp;
                            </td>
                        </tr>
                        ))
                        :'No orders found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
        </section>
        </div>
    );
}

export default Order;