const {body,validationResult} = require('express-validator');
const Customer = require('../../models/Customer');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const { sendAccountVerify } = require('../../utils/email');

module.exports.createUser = async(req,res) =>{
    const { name, email, mobile, password, confirm_password } = req.body;
    const errors = [];
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
    if(mobile === ''){
        errors.push({msg: 'Mobile is required'});
    }
    if(password === ''){
        errors.push({msg: 'Password is required'});
    }else{
        if(password.length < 6){
            errors.push({msg: 'Password must be 6 characters long!!!'});
        }
        else if(password !== confirm_password){
            errors.push({msg: 'Password & Confirm Password must be equal!!'});
        }
    }
    const checkUser = await Customer.findOne({email});
    if(checkUser){
        errors.push({msg:'Email is already exists'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            // Hash Paaword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const sendEmail = sendAccountVerify(email);
            const response = await Customer.create({
                name,
                email,
                mobile,
                password: hash,
                status: true
            });
            
            return res.status(200).json({msg: 'Account created successfully. Please check your email !!!', response});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.verifyUser = async(req,res) =>{
    const token = req.params.token;
    const {email} = jwt_decode(token);
    const errors = [];
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }
    const checkUser = await Customer.findOne({email});
    if(!checkUser){
        errors.push({msg:'Email not found'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Customer.findOneAndUpdate({email},{email_verified: true});
            return res.status(200).json({msg: 'Email verified successfully. Please Login'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.loginValidations = [
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('password').not().isEmpty().trim().withMessage("Password is required"),
    body('password').isLength({min:6}).withMessage("Password must be 6 characters or long"),
 ];

const createToken = (user, expiresToken)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}

module.exports.loginUser = async(req,res) =>{
    const { email, password, remember_me } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    let expiresToken = '1d';
    if(remember_me){
        expiresToken = '7d';
    }
    try{
        const user = await Customer.findOne({email});
        
        if(user){

            if(!user.email_verified){
                const sendEmail = sendAccountVerify(email);
                return res.status(500).json({errors: [{msg: 'Account not verified. Check Email & verify account'}]});
            }

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
       console.log(error);
    }
}