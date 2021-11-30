const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { rolePermission } = require("../../utils/permission");
const {body,validationResult} = require('express-validator');
const Category = require('../../models/Category');


module.exports.allCategory = async(req, res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'Category.View');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Category.find().countDocuments();
        const response = await Category.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createCategory = async(req, res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'Category.Create');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }
    
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {category_name, url} = fields;
        const errors = [];
        if(category_name === ''){
            errors.push({msg: 'Category name is required'});
        }
        if(Object.keys(files).length === 0){
            errors.push({msg:'Image is required'});
        }else{
            const { type } = files.category_image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.category_image.name = uuidv4() + '.' +extension;
            }
        }

        const checkCategory = await Category.findOne({category_name});
        if(checkCategory){
            errors.push({msg:'Category is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            const newPath = `public/images/category_images/${files.category_image.name}`;
            fs.copyFile(files.category_image.path, newPath, async(error)=>{
                if(!error){
                    try {
                        const response = await Category.create({
                            category_name,
                            url,
                            category_image: files.category_image.name,
                            status: true,
                        });

                        return res.status(200).json({msg: 'Category created successfully', response});
                    } catch (error) {
                        return res.status(500).json({errors: [{msg: error.message}]});
                    }
                }
            })
        }
    })
}

module.exports.editCategory = async(req, res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'Category.Edit');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }
    
    const id = req.params.id;
    try {
        const response = await Category.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateCategory = async(req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    const category = await Category.findOne({_id:id});

    form.parse(req, async(err, fields, files) =>{
        const {category_name, url} = fields;
        const errors = [];
        if(category_name === ''){
            errors.push({msg: 'Category name is required'});
        }
        if(Object.keys(files).length !== 0){
            const { type } = files.category_image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.category_image.name = uuidv4() + '.' +extension;
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            if(Object.keys(files).length === 0){
                try {
                    const response = await Category.findByIdAndUpdate(id,{
                        category_name,
                        url
                    });

                    return res.status(200).json({msg: 'Category updated successfully', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else{
                //Old image Deleted
                fs.exists(`public/images/category_images/${category.category_image}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/category_images/${category.category_image}`, async(error)=>{});
                    }
                });
                const newPath = `public/images/category_images/${files.category_image.name}`; 
                fs.copyFile(files.category_image.path, newPath, async(error)=>{
                    if(!error){
                        try {
                            const response = await Category.findByIdAndUpdate(id,{
                                category_name,
                                url,
                                category_image: files.category_image.name,
                            });

                            return res.status(200).json({msg: 'Category updated successfully', response});
                        } catch (error) {
                            return res.status(500).json({errors: [{msg: error.message}]});
                        }
                    }
                })
            }
        }
    })
}

module.exports.deleteCategory = async (req,res)=>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'Category.Delete');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }
    
    const id = req.params.id;
    try{
        const {category_image} = await Category.findOne({_id:id});
        const category = await Category.findByIdAndDelete(id);
        fs.exists(`public/images/category_images/${category_image}`, function(file){
            if(file) {
                fs.unlink(`public/images/category_images/${category_image}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'Category deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
    
}

module.exports.statusCategory = async(req, res) =>{
    const { status, category_id } = req.body;
    let category_status ;
    if(status === 'true'){
       category_status = false;
    }else{
        category_status = true;
    }
    try {
        const response = await Category.findOneAndUpdate({_id: category_id},{
            status: category_status
        },{new: true});
        return res.status(200).json({ status: category_status, category_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}