const { model, Schema } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const oredrProductSchema = new Schema({
    order_id:{
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    product_code:{
        type: String,
        required: true
    },
    product_name:{
        type: String,
        required: true
    },
    product_size:{
        type: String,
        required: true
    },
    product_price:{
        type: Float,
        required: true
    },
    product_qty:{
        type: Number,
        required: true
    }
}, {timestamps: true} );

module.exports = model("ordersProduct", oredrProductSchema);