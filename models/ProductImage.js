const { model, Schema } = require('mongoose');

const productImageSchema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    image:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("productImage", productImageSchema);