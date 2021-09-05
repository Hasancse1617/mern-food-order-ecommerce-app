const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    description:{
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

module.exports = model("post", postSchema);