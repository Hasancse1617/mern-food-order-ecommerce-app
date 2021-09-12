const Product = require("../../models/Product");
const Review = require("../../models/Review");
const Customer = require("../../models/Customer");
const Wishlist = require("../../models/Wishlist");

module.exports.addReview = async(req,res)=>{
    const {rating,review,user_id,code} = req.body;
    try {
        const product = await Product.findOne({product_code: code});
        const user = await Customer.findOne({_id: user_id});
        const response = await Review.create({
            customer_id: user_id,
            product_id: product._id,
            rating,
            review,
            status: true
        });
        const review_count = await Review.find({customer_id: user_id, product_id: product._id}).countDocuments();
        const total_count = await Review.aggregate([
            { $match: { customer_id: user._id, product_id: product._id } },
            { $group: { _id: null, quantity: { $sum: "$rating" } } }
        ]);
        const prodcutUpdate = await Product.findOneAndUpdate({product_code: code},{review_count, total_count: total_count[0].quantity });
        return res.status(200).json({msg: "Review added successfully"});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allReview = async(req,res) =>{
    const {code,user_id} = req.body;
    try {
        const product = await Product.findOne({product_code: code});
        const response = await Review.find({customer_id: user_id, product_id: product._id}).populate('customer_id');
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.addHeart = async(req,res) =>{
    const { product_id, user_id } = req.body;
    const wishlist = await Wishlist.findOne({customer_id: user_id, product_id});
    if(wishlist){
        return res.status(500).json({errors: [{msg: 'Product has been already exists'}]});
    }
    try {
        const response = await Wishlist.create({
            customer_id: user_id,
            product_id
        });
        return res.status(200).json({msg: "Wishlist added successfully"});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allWishlist = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await Wishlist.find({customer_id: id}).populate('product_id');
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.deleteWishlist = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await Wishlist.findByIdAndDelete(id);
        return res.status(200).json({msg: "Wishlist deleted successfully"});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}