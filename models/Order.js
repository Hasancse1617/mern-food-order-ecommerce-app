const { model, Schema } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const orderSchema = new Schema({
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    zipcode:{
        type: String,
    },
    address:{
        type: String,
    },
    district:{
        type: String,
    },
    country:{
        type: String,
    },
    shipping_charge:{
        type: Float,
        required: true,
    },
    coupon_code:{
        type: String
    },
    coupon_amount:{
        type: Float
    },
    payment_method:{
        type: String,
    },
    payment_gateway:{
        type: String
    },
    grand_total:{
        type: Float,
        required: true,
    },
    order_status:{
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = model("order", orderSchema);