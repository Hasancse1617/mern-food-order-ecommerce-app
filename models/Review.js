const { model, Schema } = require('mongoose');

const reviewSchema = new Schema({
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    rating:{
        type: Number,
        required: true,
    },
    review:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("review", reviewSchema);