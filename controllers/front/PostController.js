const Post = require("../../models/Post");
const Category = require("../../models/Category");
const Comment = require("../../models/Comment");
const CommentReply = require("../../models/CommentReply");

module.exports.allPost = async(req,res) =>{
    try {
        const response = await Post.find({status:true}).populate('category_id','category_name url').sort({updateAt:"descending"});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.singlePost = async(req,res) =>{
    const url = req.params.url;
    try {
        const response = await Post.findOne({url}).populate('category_id','category_name url').sort({updateAt:"descending"});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allCatPost = async(req,res) =>{
    const url = req.params.url;
    const page = req.params.page;
    const category = await Category.findOne({url});
    try { 
        const perPage = 6;
        const skip = (page - 1) * perPage;
        if(url === 'undefined'){
            const count = await Post.find().countDocuments();
            const response = await Post.find().populate('category_id','category_name url').skip(skip).limit(perPage).sort({updateAt:"descending"});
            return res.status(200).json({response,count,perPage});
        }
        else{
            const count = await Post.find({category_id:category._id}).countDocuments();
            const response = await Post.find({category_id:category._id}).populate('category_id','category_name url').skip(skip).limit(perPage).sort({updateAt:"descending"});
            return res.status(200).json({response,count,perPage});
        }
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allSearchPost = async(req,res) =>{
    const search = req.params.search;
    const page = req.params.page;
    try { 
        const perPage = 6;
        const skip = (page - 1) * perPage;

        const count = await Post.find({title: { $regex: search, $options: 'i' }}).countDocuments();
        const response = await Post.find({title: { $regex: search, $options: 'i' }}).populate('category_id','category_name url').skip(skip).limit(perPage).sort({updateAt:"descending"});
        return res.status(200).json({response,count,perPage});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.recentPosts = async(req,res) =>{
    const url = req.params.url;
    try {
        if(url === 'undefined'){
            const response = await Post.find().sort({updateAt:"descending"}).limit(4);
            return res.status(200).json({response});
        }else{
            const response = await Post.find({url:{$ne: url}}).sort({updateAt:"descending"}).limit(4);
            return res.status(200).json({response});
        }
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.postCategories = async(req,res) =>{
    try {
        const response = await Category.find().sort({updateAt:"descending"});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.addComment = async(req,res) =>{
    const { user_id, post_id, comment } = req.body;
    try {
        const response = await Comment.create({
            user_id,
            post_id,
            comment,
            status: true
        });
        return res.status(200).json({msg: 'Comment is added'});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.addReply = async(req,res) =>{
    const { user_id, post_id, comment_id, reply } = req.body;
    try {
        const response = await CommentReply.create({
            user_id,
            post_id,
            comment_id,
            comment: reply,
            status: true
        });
        return res.status(200).json({msg: 'Comment is added'});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allComment = async(req,res) =>{
    const url = req.params.url;
    try {
        const post = await Post.findOne({url});
        const commentCount = await Comment.find({post_id: post._id}).countDocuments();
        const replyCount = await CommentReply.find({post_id: post._id}).countDocuments();
        const totalComment = commentCount + replyCount;
        const response = await Comment.aggregate([
            {   $match: { post_id: post._id }},
            { 
                $lookup:{
                    from: "customers",
                    as: "user",
                    let: {userId: "$user_id"},
                    pipeline:[
                        {$match:{
                                $expr:{$and: [
                                    {$eq: ["$_id", "$$userId"]}
                                ]}
                            },
                        },
                        { $project : { _id:1, name:1, image:1 } }
                    ]
                }
            },
            {
                $lookup: {
                    from: "commentreplies",
                    as: "replies",
                    let: {commentId: "$_id"},
                    pipeline:[
                        {$match:{
                                $expr:{$and: [
                                    {$eq: ["$comment_id", "$$commentId"]}
                                ]}
                            },
                        },
                        // { $project : { _id:1, name:1, image:1 } }
                        {
                            $lookup:{
                                from: "customers",
                                as: "user",
                                let: {userId: "$user_id"},
                                pipeline:[
                                    {$match:{
                                            $expr:{$and: [
                                                {$eq: ["$_id", "$$userId"]}
                                            ]}
                                        },
                                    },
                                    { $project : { _id:1, name:1, image:1 } }
                                ]
                            }
                        }
                    ]
                }
            }
        ]);
        return res.status(200).json({response, totalComment});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}