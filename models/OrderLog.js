const { model, Schema } = require('mongoose');

const orderLogSchema = new Schema({
    order_id:{
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    order_status:{
        type: String,
        required: true
    }
}, {timestamps: true} );

module.exports = model("orderLog", orderLogSchema);