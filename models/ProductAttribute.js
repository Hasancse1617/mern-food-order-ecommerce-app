const { model, Schema } = require('mongoose');
var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);

const productAttributeSchema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    size:{
        type: String,
        required: true
    },
    sku:{
        type: String,
        required: true
    },
    price:{
        type: Float,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("productAttribute", productAttributeSchema);