const { model, Schema } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const productSchema = new Schema({
    product_name:{
        type: String,
        required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    product_price:{
        type: Float,
        required: true
    },
    product_discount:{
        type: Float,
        required: true
    },
    product_image:{
        type: String,
        required: true
    },
    short_desc:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    product_code:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("product", productSchema);