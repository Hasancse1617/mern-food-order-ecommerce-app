const { model, Schema } = require('mongoose');

const deliveryAddressSchema = new Schema({
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
    }
}, {timestamps: true} );

module.exports = model("deliveryAddress", deliveryAddressSchema);