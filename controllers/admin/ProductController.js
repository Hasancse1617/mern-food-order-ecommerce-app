const formidable = require('formidable');
const Category = require("../../models/Category");
const Product = require("../../models/Product");
const ProductImage = require("../../models/ProductImage");
const ProductAttribute = require("../../models/ProductAttribute");
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const fs = require('fs');

module.exports.allProduct = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Product.find().countDocuments();
        const response = await Product.find().populate('category_id','category_name').skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.allCategories = async(req, res) =>{
    try {
        const response = await Category.find().sort({updatedAt:'descending'});
        return res.status(200).json({response: response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}

module.exports.createProduct = async(req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {product_name, category_id, product_code, product_price, product_discount, description, short_desc, featured} = fields;
        const errors = [];
        if(product_name === ''){
            errors.push({msg: 'Product name is required'});
        }
        if(category_id === ''){
            errors.push({msg: 'Category is required'});
        }
        var filter = /^([A-Z0-9])/;
        if(!filter.test(product_code)){
            errors.push({msg: 'Valid code is required'});
        }
        if(product_price === ''){
            errors.push({msg: 'Price is required'});
        }
        if(Object.keys(files).length === 0){
            errors.push({msg:'Image is required'});
        }else{
            const { type } = files.product_image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.product_image.name = uuidv4() + '.' +extension;
            }
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
        }
        const checkCode = await Product.findOne({product_code});
        if(checkCode){
            errors.push({msg:'Code is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            const imagePath = `public/images/product_images/${files.product_image.name}`;
            sharp(files.product_image.path).resize(298, 298).toFile(imagePath, async(error, sharp)=>{
                if(!error){
                    try {
                        const response = await Product.create({
                            product_name,
                            category_id,
                            product_code,
                            product_price,
                            product_discount,
                            product_image: files.product_image.name,
                            description,
                            short_desc,
                            featured,
                            status: true
                        })
                        
                        return res.status(200).json({message: 'Product created successfully', response});

                    } catch (error) {
                        return res.status(500).json({errors: [{msg: error.message}]});
                    }
                }
            })
        }
    })
}

module.exports.editProduct = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Product.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.updateProduct = async(req, res) =>{
    const form = formidable({ multiples: true });
    const id = req.params.id;
    const product = await Product.findOne({_id: id});
    form.parse(req, async(err, fields, files) =>{
        const {product_name, category_id, product_code, product_price, product_discount, description, short_desc, featured} = fields;
        const errors = [];
        if(product_name === ''){
            errors.push({msg: 'Product name is required'});
        }
        if(category_id === ''){
            errors.push({msg: 'Category is required'});
        }
        var filter = /^([A-Z0-9])/;
        if(!filter.test(product_code)){
            errors.push({msg: 'Valid code is required'});
        }
        if(product_price === ''){
            errors.push({msg: 'Price is required'});
        }
        if(Object.keys(files).length !== 0){
            const { type } = files.product_image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.product_image.name = uuidv4() + '.' +extension;
            }
        }
        if(description === ''){
            errors.push({msg: 'Description is required'});
        }
        if(product.product_code !== product_code){
            const checkCode = await Product.findOne({product_code});
            if(checkCode){
                errors.push({msg:'Code is already exists'});
            } 
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            if(Object.keys(files).length === 0){
                try {
                    const response = await Product.findByIdAndUpdate(id,{
                        product_name,
                        category_id,
                        product_code,
                        product_price,
                        product_discount,
                        description,
                        short_desc,
                        featured,
                        status: true
                    })
                    
                    return res.status(200).json({message: 'Product updated successfully', response});

                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else{
                //Old image Deleted
                fs.exists(`public/images/product_images/${product.product_image}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/product_images/${product.product_image}`, async(error)=>{});
                    }
                });

                const imagePath = `public/images/product_images/${files.product_image.name}`;
                sharp(files.product_image.path).resize(298, 298).toFile(imagePath, async(error, sharp)=>{
                    if(!error){
                        try {
                            const response = await Product.findByIdAndUpdate(id,{
                                product_name,
                                category_id,
                                product_code,
                                product_price,
                                product_discount,
                                product_image: files.product_image.name,
                                description,
                                short_desc,
                                featured,
                                status: true
                            })
                            
                            return res.status(200).json({message: 'Product updated successfully', response});

                        } catch (error) {
                            return res.status(500).json({errors: [{msg: error.message}]});
                        }
                    }
                })
            }
        }
    })
}

module.exports.deleteProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const {product_image} = await Product.findOne({_id:id});
        const product = await Product.findByIdAndDelete(id);
        fs.exists(`public/images/product_images/${product_image}`, function(file){
            if(file) {
                fs.unlink(`public/images/product_images/${product_image}`, async(error)=>{});
            }
        });
        return res.status(200).json({message: 'Product deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
    
}

module.exports.statusProduct = async(req, res) =>{
    const { status, product_id } = req.body;
    let product_status ;
    if(status === 'true'){
        product_status = false;
    }else{
        product_status = true;
    }
    try {
        const response = await Product.findOneAndUpdate({_id: product_id},{
            status: product_status
        },{new: true});
        return res.status(200).json({ status: product_status, product_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allImage = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await ProductImage.find({product_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.addProductImage = async(req, res) =>{
    const form = formidable({ multiples: true });
    const id = req.params.id;
    form.parse(req, async(err, fields, files) =>{
        const errors = [];
        if(Object.keys(files).length === 0){
            errors.push({msg: 'Image is required'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                files.images.map(async(image, index)=>{
                    const { type } = files.images[index];
                    const split = type.split('/');
                    const extension = split[1].toLowerCase();
                    const image_name = uuidv4() + '.' +extension;
                    files.images[index].name = image_name;

                    const smallPath = `public/images/product_images/small/${files.images[index].name}`;
                    const mediumPath = `public/images/product_images/medium/${files.images[index].name}`;
                    const largePath = `public/images/product_images/large/${files.images[index].name}`;

                    const sharp1= await sharp(files.images[index].path).resize(100, 100).toFile(smallPath);
                    const sharp2= await sharp(files.images[index].path).resize(298, 298).toFile(mediumPath);
                    const sharp3= await sharp(files.images[index].path).toFile(largePath);
                
                    const response = await ProductImage.create({
                        product_id: id,
                        image: files.images[index].name,
                        status: true
                    });
                    
                })

                return res.status(200).json({message: 'Product Images saved successfully'});
           }
            catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.deleteProductImage = async(req, res) =>{
    const id = req.params.id;
    try{
        const {image} = await ProductImage.findOne({_id:id});
        const productImage = await ProductImage.findByIdAndDelete(id);
        fs.exists(`public/images/product_images/small/${image}`, function(file){
            if(file) {
                fs.unlink(`public/images/product_images/small/${image}`, async(error)=>{});
                fs.unlink(`public/images/product_images/medium/${image}`, async(error)=>{});
                fs.unlink(`public/images/product_images/large/${image}`, async(error)=>{});
            }
        });
        return res.status(200).json({message: 'Product Image deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    }
}

module.exports.statusProductImage = async(req, res) =>{
    const { status, image_id } = req.body;
    let image_status ;
    if(status === 'true'){
        image_status = false;
    }else{
        image_status = true;
    }
    try {
        const response = await ProductImage.findOneAndUpdate({_id: image_id},{
            status: image_status
        },{new: true});
        return res.status(200).json({ status: image_status, image_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allAttribute = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await ProductAttribute.find({product_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors:error});
    }
}

module.exports.addAttribute = async(req, res) =>{
    const id = req.params.id;
    const{ size, sku, price, stock } = req.body;
    const errors = [];
    if(size === ''){
        errors.push({msg: 'Size is required'});
    }
    var filter = /^([A-Z0-9])/;
    if(!filter.test(sku)){
        errors.push({msg: 'Valid SKU is required'});
    }
    if(price === ''){
        errors.push({msg: 'Price is required'});
    }
    if(stock === ''){
        errors.push({msg: 'Stock is required'});
    }
    const checkSize = await ProductAttribute.findOne({product_id: id, size});
    if(checkSize){
        errors.push({msg: 'Size already exists'});
    }
    const checkSku = await ProductAttribute.findOne({sku});
    if(checkSku){
        errors.push({msg: 'SKU already exists. '});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }
    else{
        try {
            const response = await ProductAttribute.create({
                product_id: id,
                size,
                sku,
                price,
                stock,
                status: true
            });
            return res.status(200).json({message: 'Product Attribute added successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
    
}

module.exports.statusProductAttribute = async(req, res) =>{
    const { status, attribute_id } = req.body;
    let attribute_status ;
    if(status === 'true'){
        attribute_status = false;
    }else{
        attribute_status = true;
    }
    try {
        const response = await ProductAttribute.findOneAndUpdate({_id: attribute_id},{
            status: attribute_status
        },{new: true});
        return res.status(200).json({ status: attribute_status, attribute_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.deleteProductAttribute = async(req, res) =>{
    const id = req.params.id;
    try {
        const productAttribute = await ProductAttribute.findByIdAndDelete(id);
        return res.status(200).json({message: 'Product Attribute deleted successfully'});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}