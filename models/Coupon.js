const { model, Schema } = require('mongoose');

const couponSchema = new Schema({
    code:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    expiry_date:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("coupon", couponSchema);