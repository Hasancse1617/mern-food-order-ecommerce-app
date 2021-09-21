const Order = require('../../models/Order');
const Customer = require('../../models/Customer');
const OrdersProduct = require('../../models/OrdersProduct');
const OrderLog = require('../../models/OrderLog');

module.exports.orders = async(req,res) =>{
    const page = req.params.page;
    const perPage = 10;
    const skip = (page - 1) * perPage;
    try {
        const count = await Order.find().countDocuments();
        const response = await Order.find().skip(skip).limit(perPage).sort({createdAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.singleOrder = async(req,res) =>{
    const id = req.params.id;
    try {
        const order = await Order.findOne({_id:id});
        const customer = await Customer.findOne({_id: order.customer_id});
        const ordersProduct = await OrdersProduct.find({order_id:id}).populate('product_id','product_image');
        const orderLogs = await OrderLog.find({order_id: order._id}).sort({createdAt:'descending'});
        const response = {order,customer,ordersProduct,orderLogs};
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateOrderStatus = async(req,res) =>{
    const { order_id, order_status } = req.body;
    try {
        const response = await Order.findByIdAndUpdate(order_id, {order_status});
        const response2 = await OrderLog.create({order_id,order_status});
        return res.status(200).json({ msg: 'Order status Updated', order_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}