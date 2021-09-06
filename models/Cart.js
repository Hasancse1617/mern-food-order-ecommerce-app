const { model, Schema } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const cartSchema = new Schema({
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    size:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true
    },
    attr_price:{
        type: Float,
        required: true
    }
}, {timestamps: true} );

module.exports = model("cart", cartSchema);