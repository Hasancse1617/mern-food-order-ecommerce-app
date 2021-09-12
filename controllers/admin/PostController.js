const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const sharp = require('sharp');
const {body,validationResult} = require('express-validator');
const Post = require('../../models/Post');
const Category = require('../../models/Category');


module.exports.allPost = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Post.find().countDocuments();
        const response = await Post.find().populate('category_id','category_name url').skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createPost = async(req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {title, url, description, category} = fields;
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Post title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Post description is required'});
        }
        if(category === ''){
            errors.push({msg: 'Post Category is required'});
        }
        if(Object.keys(files).length === 0){
            errors.push({msg:'Image is required'});
        }else{
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.' +extension;
            }
        }

        const checkPost = await Post.findOne({url});
        if(checkPost){
            errors.push({msg:'Post url is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                const mediumPath = `public/images/post_images/${files.image.name}`;
                const largePath = `public/images/post_images/large/${files.image.name}`;

                const sharp2= await sharp(files.image.path).resize(420, 461).toFile(mediumPath);
                const sharp3= await sharp(files.image.path).toFile(largePath);
                const response = await Post.create({
                    title,
                    url,
                    category_id: category,
                    image: files.image.name,
                    description,
                    status: true,
                });

                return res.status(200).json({msg: 'Post created successfully', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }

        }
    })
}
module.exports.categories = async(req, res) =>{
    try {
        const response = await Category.find().select('category_name').sort({updatedAt:'descending'});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.editPost = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Post.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updatePost = async(req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    const post = await Post.findOne({_id:id});

    form.parse(req, async(err, fields, files) =>{
        const {title, url, description, category} = fields;
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Post title is required'});
        }
        if(description === ''){
            errors.push({msg: 'Post description is required'});
        }
        if(category === ''){
            errors.push({msg: 'Post Category is required'});
        }
        if(Object.keys(files).length !== 0){
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.' +extension;
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            if(Object.keys(files).length === 0){
                try {
                    const response = await Post.findByIdAndUpdate(id,{
                        title,
                        url,
                        category_id: category,
                        description
                    });

                    return res.status(200).json({msg: 'Post updated successfully', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else{
                //Old image Deleted
                fs.exists(`public/images/post_images/${post.image}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/post_images/${post.image}`, async(error)=>{});
                        fs.unlink(`public/images/post_images/large/${post.image}`, async(error)=>{});
                    }
                });
                try {
                    const mediumPath = `public/images/post_images/${files.image.name}`;
                    const largePath = `public/images/post_images/large/${files.image.name}`;

                    const sharp2= await sharp(files.image.path).resize(420, 461).toFile(mediumPath);
                    const sharp3= await sharp(files.image.path).toFile(largePath);
                    const response = await Post.findByIdAndUpdate(id,{
                        title,
                        url,
                        category_id: category,
                        image: files.image.name,
                        description
                    });

                    return res.status(200).json({msg: 'Post updated successfully', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }

            }
        }
    })
}

module.exports.deletePost = async (req,res)=>{
    const id = req.params.id;
    try{
        const {image} = await Post.findOne({_id:id});
        const post = await Post.findByIdAndDelete(id);
        fs.exists(`public/images/post_images/${image}`, function(file){
            if(file) {
                fs.unlink(`public/images/post_images/${image}`, async(error)=>{});
                fs.unlink(`public/images/post_images/large/${image}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'Post deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
    
}

module.exports.statusPost = async(req, res) =>{
    const { status, post_id } = req.body;
    let post_status ;
    if(status === 'true'){
       post_status = false;
    }else{
        post_status = true;
    }
    try {
        const response = await Post.findOneAndUpdate({_id: post_id},{
            status: post_status
        },{new: true});
        return res.status(200).json({ status: post_status, post_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}