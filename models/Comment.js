const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    comment:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean
    }
}, {timestamps: true} );

module.exports = model("comment", commentSchema);