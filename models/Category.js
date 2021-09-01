const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    category_name:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    category_image:{
        type: String,
        required: true,
        default:'profile.png'
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("category", categorySchema);