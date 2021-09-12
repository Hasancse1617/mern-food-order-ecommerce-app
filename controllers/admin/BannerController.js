const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const sharp = require('sharp');
const Banner = require('../../models/Banner');

module.exports.allBanner = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Banner.find().countDocuments();
        const response = await Banner.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createBanner = async(req,res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {title, btn_text, btn_url } = fields;
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Banner title is required'});
        }
        if(btn_text === ''){
            errors.push({msg: 'Button Text is required'});
        }
        if(btn_url === ''){
            errors.push({msg: 'Button url is required'});
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

        const checkBanner = await Banner.findOne({btn_url});
        if(checkBanner){
            errors.push({msg:'Banner url is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                const mediumPath = `public/images/banner_images/small/${files.image.name}`;
                const largePath = `public/images/banner_images/large/${files.image.name}`;

                const sharp2= await sharp(files.image.path).resize(810, 330).toFile(mediumPath);
                const sharp3= await sharp(files.image.path).toFile(largePath);
                const response = await Banner.create({
                    title,
                    btn_text,
                    btn_url,
                    image: files.image.name,
                    status: true,
                });

                return res.status(200).json({msg: 'Banner created successfully', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.editBanner = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Banner.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateBanner = async(req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    const banner = await Banner.findOne({_id:id});

    form.parse(req, async(err, fields, files) =>{
        const {title, btn_text, btn_url} = fields;
        const errors = [];
        if(title === ''){
            errors.push({msg: 'Banner title is required'});
        }
        if(btn_text === ''){
            errors.push({msg: 'Button text is required'});
        }
        if(btn_url === ''){
            errors.push({msg: 'Button url is required'});
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
                    const response = await Banner.findByIdAndUpdate(id,{
                        title,
                        btn_text,
                        btn_url
                    });

                    return res.status(200).json({msg: 'Banner updated successfully', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else{
                //Old image Deleted
                fs.exists(`public/images/banner_images/small/${banner.image}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/banner_images/small/${banner.image}`, async(error)=>{});
                        fs.unlink(`public/images/banner_images/large/${banner.image}`, async(error)=>{});
                    }
                });
                try {
                    const mediumPath = `public/images/banner_images/small/${files.image.name}`;
                    const largePath = `public/images/banner_images/large/${files.image.name}`;

                    const sharp2= await sharp(files.image.path).resize(810, 330).toFile(mediumPath);
                    const sharp3= await sharp(files.image.path).toFile(largePath);
                    const response = await Banner.findByIdAndUpdate(id,{
                        title,
                        btn_text,
                        btn_url,
                        image: files.image.name
                    });

                    return res.status(200).json({msg: 'Banner updated successfully', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }

            }
        }
    })
}

module.exports.deleteBanner = async (req,res)=>{
    const id = req.params.id;
    try{
        const {image} = await Banner.findOne({_id:id});
        const banner = await Banner.findByIdAndDelete(id);
        fs.exists(`public/images/banner_images/small/${image}`, function(file){
            if(file) {
                fs.unlink(`public/images/banner_images/small/${image}`, async(error)=>{});
                fs.unlink(`public/images/banner_images/large/${image}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'Banner deleted successfully'});
    }catch(error){
        return res.status(500).json({errors: [{msg: error.message}]});
    }
    
}

module.exports.statusBanner = async(req, res) =>{
    const { status, banner_id } = req.body;
    let banner_status ;
    if(status === 'true'){
        banner_status = false;
    }else{
        banner_status = true;
    }
    try {
        const response = await Banner.findOneAndUpdate({_id: banner_id},{
            status: banner_status
        },{new: true});
        return res.status(200).json({ status: banner_status, banner_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}