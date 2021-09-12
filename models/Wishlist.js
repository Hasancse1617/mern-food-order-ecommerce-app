const { model, Schema } = require('mongoose');

const wishlistSchema = new Schema({
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
}, {timestamps: true} );

module.exports = model("wishlist", wishlistSchema);