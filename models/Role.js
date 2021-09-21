const { model, Schema } = require('mongoose');

const roleSchema = new Schema({
    name:{
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = model("role", roleSchema);