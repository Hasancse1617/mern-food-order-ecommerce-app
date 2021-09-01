const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    user_type:{
        type: String,
        required: true,
        default: 'Super Admin'
    },
    image:{
        type: String,
        required: true,
        default:'profile.png'
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = model("user", userSchema);