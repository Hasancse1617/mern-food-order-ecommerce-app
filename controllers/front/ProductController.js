const Category = require("../../models/Category");
const Product = require("../../models/Product");
const ProductAttribute = require("../../models/ProductAttribute");
const Cart = require("../../models/Cart");

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
    const { user_id, code, size, quantity } = req.body;
    const product = await Product.findOne({product_code:code});
    const errors = [];
    if(size === ''){
        errors.push({msg: 'Size is required'});
    }
    const cart = await Cart.findOne({customer_id: user_id, product_id: product._id});
    if(cart){
        errors.push({msg: 'Product is already exists in your cart!!!'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Cart.create({
                customer_id: user_id,
                product_id: product._id,
                size,
                quantity
            });
            return res.status(200).json({msg: 'Product added successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}