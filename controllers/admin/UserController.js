const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const formidable = require('formidable');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const User = require('../../models/User');
const { SendEmail } = require('../../utils/email');
const { rolePermission } = require("../../utils/permission");
require('dotenv').config();

const createToken = (user, expiresToken)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}

module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').not().isEmpty().trim().withMessage("Password is required"),
    body('password').isLength({min:6}).withMessage("Password must be 5 characters long"),
 ];

module.exports.userLogin= async (req, res)=>{
    const {email,password,remember_me} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    let expiresToken = '1d';
    if(remember_me){
        expiresToken = '7d';
    }
    try{
        const user = await User.findOne({email});
        if(user){
            const matched = await bcrypt.compare(password, user.password);
            if(matched){
                const token = createToken(user,expiresToken);
                return res.status(200).json({'msg':'You have successfully login',token});
            }else{
                return res.status(401).json({errors:[{msg:'Username or Password does not matched'}]});
            }
        }
        else{
             return res.status(404).json({errors:[{msg:'Email not found'}]});
        }
    }catch(error){
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createUser = async (req,res)=>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.Create');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {name, email, user_type, password, c_password} = fields;
        const errors = [];
        // console.log(files);
        if(name === ''){
            errors.push({msg: 'Name is required'});
        }
        if(email === ''){
            errors.push({msg: 'Email is required'});
        }else{
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
            if(!filter.test(email)){
                errors.push({msg: 'Valid email is required'});
            }
        }
        if(user_type === ''){
            errors.push({msg: 'User Type is required'});
        }
        if(password === ''){
            errors.push({msg: 'Password is required'});
        }else{
            if(password.length < 6){
                errors.push({msg: 'Password must be 6 characters long!!!'});
            }
            else if(password !== c_password){
                errors.push({msg: 'Password & Confirm Password must be equal!!'});
            }
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
        const checkUser = await User.findOne({email});
        if(checkUser){
            errors.push({msg:'Email is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            // console.log(email)
            const newPath = `public/images/user_images/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async(error)=>{
                if(!error){
                    // Hash Paaword
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt);
                    // console.log(hash)
                    try {
                        const response = await User.create({
                            name,
                            email,
                            user_type: user_type,
                            image: files.image.name,
                            password: hash,
                        });

                        return res.status(200).json({msg: 'User created successfully', response});
                    } catch (error) {
                        return res.status(500).json({errors: [{msg: error.message}]});
                    }
                }
            })
        }
    });
}

module.exports.allUser = async(req, res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.View');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await User.find().countDocuments();
        const response = await User.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.deleteUser = async (req,res)=>{
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.Delete');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }
    const id = req.params.id;
    try{
        const {image} = await User.findOne({_id:id});
        const user = await User.findByIdAndDelete(id);
        fs.exists(`public/images/user_images/${image}`, function(file){
            if(file) {
                fs.unlink(`public/images/user_images/${image}`, async(error)=>{});
            }
        });
        return res.status(200).json({msg: 'User deleted successfully'});
    }catch(error){
        return res.status(500).json({errors: [{msg: error.message}]});
    }
    
}

module.exports.editUser = async (req, res) =>{
    const id = req.params.id;
    try {
        const response = await User.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateUser = async (req, res) =>{
    const id = req.params.id;
    const user = await User.findOne({_id:id});
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {name} = fields;
        const errors = [];

        if(name === ''){
            errors.push({msg: 'Password is required'});
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
            //Update without Image
            if(Object.keys(files).length === 0){
                try {
                    const response = await User.findOneAndUpdate({_id: id},{
                        name,
                    }, {new: true});
                    let expiresToken = '1d';
                    const token = createToken(response, expiresToken);
                    return res.status(200).json({msg: 'Your Profile updated successfully', response, token});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            //Update without Image
            else{
                //Old image Deleted
                fs.exists(`public/images/user_images/${user.image}`, function(file){
                    if(file) {
                        fs.unlink(`public/images/user_images/${user.image}`, async(error)=>{});
                    }
                });
                const newPath = `public/images/user_images/${files.image.name}`; 
                fs.copyFile(files.image.path, newPath, async(error)=>{
                    if(!error){
                        try {
                            const response = await User.findOneAndUpdate({_id:id},{
                                name,
                                image: files.image.name,
                            }, {new: true});
                            let expiresToken = '1d';
                            const token = createToken(response, expiresToken);
                            return res.status(200).json({msg: 'Your Profile updated successfully', response, token});
                        } catch (error) {
                            return res.status(500).json({errors: [{msg: error.message}]});
                        }
                    }
                })
            }
            //Update without Image End
        }
    });
}

module.exports.updateUserPassword = async(req,res) =>{
    const id = req.params.id;
    const {password,new_password,con_password} = req.body;
    const user = await User.findOne({_id:id});
    const errors = [];
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }
    if(new_password === ''){
        errors.push({msg: 'Confirm Password is required'});
    }
    if(con_password === ''){
        errors.push({msg: 'New Password is required'});
    }
    if(new_password.length < 6){
        errors.push({msg: 'Password must be 6 characters long'});
    }
    if(new_password !== con_password){
        errors.push({msg: 'Password & Confirm must be equal'});
    }
    if(user){
        try {
            const matched = await bcrypt.compare(password, user.password);
            if(!matched){
                errors.push({msg: 'Your current Password is not correct'});
            }
            if(errors.length !== 0){
                return res.status(400).json({errors});
            }else{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(new_password, salt);
                const response = await User.findByIdAndUpdate(id,{password: hash});
                return res.status(200).json({msg: 'Your Password updated successfully',response});
            }
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
        
    }
    
}

module.exports.forgotPassword = async(req, res) =>{
    const { email } = req.body;
    const user = await User.findOne({email});
    const errors = [];
    if(email === ''){
        errors.push({msg: 'Email is required'});
    }else{
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
        if(!filter.test(email)){
            errors.push({msg: 'Valid email is required'});
        }else{
            if(!user){
                errors.push({msg: 'Email not fount'});
            }
        }
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = SendEmail(email);
            return res.status(200).json({msg: 'Check your email & change your password',response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
    
}

module.exports.resetPassword = async(req, res) =>{
    const token = req.params.token;
    const { password, c_password } = req.body;
    const errors = [];
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }else{
        if(password.length < 5){
            errors.push({msg: 'Password must be 6 characters long'});
        }
        else if(password !== c_password){
            errors.push({msg: 'Password & Confirm Password does not  match'});
        }
    }
    if(c_password === ''){
        errors.push({msg: 'Confirm Password is required'});
    }
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }

    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        const {email} = jwt_decode(token);
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const response = await User.findOneAndUpdate({email},{password: hash}, {new: true});
            return res.status(200).json({msg: 'Your Password updated successfully', response });
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    } 
}