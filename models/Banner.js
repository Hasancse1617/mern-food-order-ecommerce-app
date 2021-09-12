const { model, Schema } = require('mongoose');

const bannerSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    btn_text:{
        type: String,
        required: true
    },
    btn_url:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true} );

module.exports = model("banner", bannerSchema);