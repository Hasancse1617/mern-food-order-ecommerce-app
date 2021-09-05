const { model, Schema } = require('mongoose');

const commentReplySchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post_id:{
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    comment_id:{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    },
    comment:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean
    }
}, {timestamps: true} );

module.exports = model("commentReply", commentReplySchema);