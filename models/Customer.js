const { model, Schema } = require('mongoose');

const customerSchema = new Schema({
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
    password:{
        type: String,
        required: true,
    },
    email_verified:{
        type: Boolean,
        default: false
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("customer", customerSchema);