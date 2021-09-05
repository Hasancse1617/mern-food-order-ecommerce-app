const { model, Schema } = require('mongoose');

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
    }
}, {timestamps: true} );

module.exports = model("cart", cartSchema);