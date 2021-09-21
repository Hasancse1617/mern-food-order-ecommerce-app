import React from "react";
import moment from "moment";
import './StyleSheet.css';

class ComponentToPrint extends React.Component {
    render() {
      const order = this.props.order;
      return order.order? (
          <div className="order_pdf">
          <header class="clearfix">
            <div id="logo">
                <h2>ORDER INVOICE</h2>
            </div>
            <div id="company">
                <h2 class="name">Ansarul Pvt. Limited</h2>
                <div>Ishwardi, Pabna, Bangladeshi</div>
                <div>(602) 519-0450</div>
                <div><a href="mailto:ansarul@gmail.com">ansarul@gmail.com</a></div>
            </div>
            </header>
            <main>
            <div id="details" class="clearfix">
                <div id="client">
                <div class="to">INVOICE TO:</div>
                <h2 class="name">{ order.order.name }</h2>
                <div class="address">{ order.order.address }, { order.order.country }</div>
                <div class="email"><a href={`mailto:${ order.order.email}`}>{ order.order.email }</a></div>
                </div>
                <div id="invoice">
                <h1>Order ID: #{ order.order._id }</h1>
                <div class="date">Order Date: { moment(order.order.createdAt).format('DD MMMM YYYY') }</div>
                <div class="date">Order Amount: ${ order.order.grand_total }</div>
                <div class="date">Order Status: { order.order.order_status }</div>
                <div class="date">Payment Method: { order.order.payment_method }</div>
                </div>
            </div>
            <table border="0" cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                    <th class="no">#</th>
                    <th class="desc">ITEM</th>
                    <th class="unit">UNIT PRICE</th>
                    <th class="qty">QUANTITY</th>
                    <th class="total">TOTAL</th>
                </tr>
                </thead>
                <tbody>

                {order.ordersProduct.map((order,index)=>(
                   <tr>
                        <td class="no">{ index+1 }</td>
                        <td class="desc">
                            Name: { order.product_name }<br/>
                            Code: { order.product_code }<br/>
                            Size: { order.product_size }<br/>
                            Color: { order.product_color }<br/>
                        </td>
                        <td class="unit">${ order['product_price'] }</td>
                        <td class="qty">{ order['product_qty'] }</td>
                        <td class="total">${ order.product_price*order.product_qty }</td>
                    </tr> 
                ))}
                
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2">SUBTOTAL</td>
                    <td>${ order.order.grand_total }</td>
                </tr>
                {order.order.coupon_amount > 0 ?
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2">Coupon Discount</td>
                    <td>${ order.order.coupon_amount }</td>
                </tr>:''
                }
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2">Shipping</td>
                    <td>$0.00</td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td colspan="2">GRAND TOTAL</td>
                    <td>${ order.order.grand_total }</td>
                </tr>
                </tfoot>
            </table>
            <div id="thanks">Thank you!</div>
            <div id="notices">
                <div>NOTICE:</div>
                <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
            </div>
            </main>
            {/* <footer>
                Invoice was created on a computer and is valid without the signature and seal.
            </footer> */}
        </div>
      ):''
    }
}
export default ComponentToPrint;