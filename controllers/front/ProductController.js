const Category = require("../../models/Category");
const Product = require("../../models/Product");
const ProductAttribute = require("../../models/ProductAttribute");
const Cart = require("../../models/Cart");
const Coupon = require("../../models/Coupon");
const Customer = require("../../models/Customer");
const DeliveryAddress = require("../../models/DeliveryAddress");
const Order = require("../../models/Order");
const OrdersProduct = require("../../models/OrdersProduct");

module.exports.allProduct = async(req, res) =>{
    const { sorting, url, page, min, max } = req.body;
    const { _id } = await Category.findOne({url});
    try {
        const perPage = 6;
        const skip = (page - 1) * perPage;
        const resp = Product.find({category_id: _id});
        const counter = Product.find({category_id: _id});
        if(min >= 0 && max > 0){
            resp.where({product_price : {$gte: min, $lte: max}});
            counter.where({product_price : {$gte: min, $lte: max}});
        }
        if(sorting === 'product_latest'){
            resp.sort({updatedAt:'descending'});
        }
        if(sorting === 'product_name_a_z'){
            resp.sort({product_name:'ascending'})
        }
        if(sorting === 'product_name_z_a'){
            resp.sort({product_name:'descending'})
        }
        if(sorting === 'price_lowest'){
            resp.sort({product_price:'ascending'})
        }
        if(sorting === 'price_highest'){
            resp.sort({product_price:'descending'})
        }
        const count = await counter.countDocuments().exec();
        const response = await resp.skip(skip).limit(perPage).exec();
        return res.status(200).json({ response, count, perPage });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.hotProducts = async(req, res) =>{
    try {
        const response = await Product.find({product_discount : {$gt: 0}}).sort({product_discount:"descending"}).limit(4);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.singleProduct = async(req, res) =>{
    const code = req.params.code;
    const product = await Product.findOne({product_code: code});
    try {
        const response = await Product.aggregate([
            {   $match: { _id: product._id }},
            { 
                $lookup:{
                    from: "productimages",
                    as: "images",
                    let: {productId: "$_id"},
                    pipeline:[
                        {$match:{
                                $expr:{$and: [
                                    {$eq: ["$product_id", "$$productId"]}
                                ]}
                            },
                        },
                        { $project : { _id:1, image:1 } }
                    ]
                }
            },
            { 
                $lookup:{
                    from: "productattributes",
                    as: "attributes",
                    let: {productId: "$_id"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{$and: [
                                    {$eq: ["$product_id", "$$productId"]}
                                ]}
                            },
                            
                        },
                        { $project : { _id:1, size:1 } }
                    ]
                }
            },
            { 
                $lookup:{
                    from: "categories",
                    as: "category",
                    let: {categoryId: "$category_id"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{$and: [
                                    {$eq: ["$_id", "$$categoryId"]}
                                ]}
                            },
                            
                        },
                        { $project : { _id:1, category_name:1, url:1 } }
                    ]
                }
            }
        ]);
        // console.log(response);
        // const response = await Product.findOne({product_code: code}).populate('category_id','category_name url');
        return res.status(200).json({ response: response[0] });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.relatedProducts = async(req, res) =>{
    const code = req.params.code;
    const product = await Product.findOne({product_code: code});
    try {
        const response = await Product.find({category_id: product.category_id, _id: {$ne: product._id}});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.popularProducts = async(req,res) =>{
    try {
        const response = await Product.find().sort({review_count:"descending"}).limit(3);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.sizePrice = async(req, res) =>{
    const { code, size } = req.body;
    const product = await Product.findOne({product_code: code});
    try {
        const {price} = await ProductAttribute.findOne({product_id:product._id, size}).select('price');
        return res.status(200).json({ price });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.addToCart = async(req,res) =>{
    const { user_id, code, size, quantity, attrprice } = req.body;
    const product = await Product.findOne({product_code:code});
    const errors = [];
    if(size === ''){
        errors.push({msg: 'Size is required'});
    }else{
        const cart = await Cart.findOne({customer_id: user_id, product_id: product._id, size});
        if(cart){
            errors.push({msg: 'Product is already exists in your cart!!!'});
        }
        const attr = await ProductAttribute.findOne({product_id: product._id, size});
        if(attr.stock < quantity){
            errors.push({msg: 'Required Quantity is not available'});
        }
    }
    
    if(errors.length !== 0){
        return res.status(500).json({errors});
    }else{
        try {
            const response = await Cart.create({
                customer_id: user_id,
                product_id: product._id,
                size,
                quantity,
                attr_price: attrprice
            });
            return res.status(200).json({msg: 'Product added successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.fetchCartItems = async(req,res) =>{
    const userId = req.params.userId;
    try {
        const itemCount = await Cart.find().countDocuments();
        if(itemCount > 0){
            const customer = await Customer.findById(userId);
            const count = await Cart.aggregate([
                { $match: { customer_id: customer._id } },
                { $group: { _id: null, quantity: { $sum: "$quantity" } } }
            ]);
            const response = await Cart.find({customer_id: userId}).populate('product_id').sort({createdAt:'descending'});
            return res.status(200).json({ response, totalCartItem: count[0].quantity });
        }
        else{
            return res.status(200).json({ response: [], totalCartItem: 0 });
        }
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateCartItem = async(req,res) =>{
    const { cartId, quantity, product_id, size } = req.body;
    const attrproduct = await ProductAttribute.findOne({product_id, size});
    const errors = [];
    if(attrproduct.stock < quantity){
        errors.push({msg: 'Required Quantity is not available'});
    }
    if(quantity < 1){
        errors.push({msg: 'Quantity must be greater than 1'});
    }
    if(errors.length !== 0){
        return res.status(500).json({errors});
    }else{
        try {
            const response = await Cart.findByIdAndUpdate({_id:cartId},{quantity});
            return res.status(200).json({ msg: 'Cart updated successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.deleteCartItem = async(req,res) =>{
    const cartId = req.params.cartId;
    try {
        const response = await Cart.findByIdAndDelete({_id:cartId});
        return res.status(200).json({ msg: 'Cart deleted successfully'});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.applyCoupon = async(req,res) =>{
    const { code } = req.body;
    const coupon = await Coupon.findOne({code});
    const errors = [];
    if(code === ''){
        errors.push({msg: 'Coupon code is required'});
    }else{
        if(!coupon){
            errors.push({msg: 'Coupon is not Valid'});
        }else if(new Date(coupon.expiry_date) < new Date()){
            errors.push({msg: 'This Coupon is Expired'}); 
        }
        else if(coupon.status === false){
            errors.push({msg: 'This Coupon is not active'});
        }
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            return res.status(200).json({msg: 'Coupon code successfully applied', couponAmount: coupon.amount, couponCode: code});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.deliveryAddress = async(req,res) =>{
    const user_id = req.params.user_id;
    try {
        const response = await DeliveryAddress.findOne({customer_id: user_id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.Checkout = async(req,res) =>{
    const {user_id, state, cartItems, couponCode, couponAmount, payment_gateway, totalAmount} = req.body;
    const { name, email, mobile, address, zipcode, district, country } = state;
    const errors = [];
    if(name === ''){
        errors.push({msg: 'Name is required'});
    }
    if(email === ''){
        errors.push({msg: 'Name is required'});
    }
    if(mobile === ''){
        errors.push({msg: 'Mobile is required'});
    }
    if(address === ''){
        errors.push({msg: 'Address is required'});
    }
    if(zipcode === ''){
        errors.push({msg: 'Zip-code is required'});
    }
    if(district === ''){
        errors.push({msg: 'District is required'});
    }
    if(country === ''){
        errors.push({msg: 'Country is required'});
    }
    if(payment_gateway === ''){
        errors.push({msg: 'Payment Method is required'});
    }
    if(errors.length !== 0){
        return res.status(500).json({errors});
    }else{
        try {
            const grand_total = totalAmount - couponAmount;
            let payment_method;
            let orderStatus;
            if(payment_gateway === 'COD'){
              payment_method = 'COD';
              orderStatus = 'New';
            }
            if(payment_gateway === 'Card'){
                payment_method = 'Card';
                orderStatus = 'Pending';
            }
            const deliveryAddress = await DeliveryAddress.findOne({customer_id: user_id});
            if(deliveryAddress){
                const editaddress = await DeliveryAddress.findByIdAndUpdate(user_id,{name,email,mobile,address,zipcode,district,country});
            }else{
                const newaddress = await DeliveryAddress.create({customer_id: user_id,name,email,mobile,address,zipcode,district,country});
            }
            const order = await Order.create({customer_id: user_id, name, email, mobile, zipcode, address, district, country, shipping_charge: 0, coupon_code: couponCode, coupon_amount: couponAmount, payment_method, payment_gateway, grand_total, order_status: orderStatus});
            cartItems.forEach(async(item) => {
                const attr_price = (item.attr_price - (item.attr_price * item.product_id.product_discount)/100).toFixed(2);
                const orderProduct = await OrdersProduct.create({
                    order_id: order._id, 
                    customer_id: user_id, 
                    product_id: item.product_id._id, 
                    product_code: item.product_id.product_code,
                    product_name: item.product_id.product_name,
                    product_size: item.size,
                    product_price: attr_price,
                    product_qty: item.quantity
                });
                const attrStock = await ProductAttribute.findOne({product_id: item.product_id._id, size: item.size});
                const stockPro = attrStock.stock - item.quantity;
                const productAttr = await ProductAttribute.findOneAndUpdate({product_id: item.product_id._id, size: item.size},{stock: stockPro});
            });
            if(payment_gateway === 'COD'){
                const deleteCart = await Cart.deleteMany({customer_id: user_id});
            }
            return res.status(200).json({msg: 'Thanks for your order', order_id: order._id});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.changeOrderStatus = async(req,res) =>{
    const { status, order_id, user_id } = req.body;
    let order_status;
    if(status === 'success'){
        order_status = 'Paid'
    }
    else{
        order_status = 'Cancelled'
    }
    try {
        if(status === 'success'){
            const deleteCart = await Cart.deleteMany({customer_id: user_id});
        }
        const response = await Order.findByIdAndUpdate(order_id, {order_status: order_status});
        return res.status(200).json({msg: 'Update order status'});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}