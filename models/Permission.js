const { model, Schema } = require('mongoose');

const permissionSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    group_name:{
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = model("permission", permissionSchema);