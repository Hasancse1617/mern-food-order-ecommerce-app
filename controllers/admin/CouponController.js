const Coupon = require('../../models/Coupon');

module.exports.allCoupon = async(req, res) =>{
    const page = req.params.page;
    const perPage = 6;
    const skip = (page - 1) * perPage;
    try {
        const count = await Coupon.find().countDocuments();
        const response = await Coupon.find().skip(skip).limit(perPage).sort({updatedAt:'descending'});
        return res.status(200).json({response: response, count, perPage});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createCoupon = async(req,res) =>{
    const {  code, amount, expiry_date} = req.body;
    const errors = [];
    if(code === ''){
        errors.push({msg: 'Coupon code is required'});
    }else{
        var filter = /^([A-Z0-9])/;
        if(!filter.test(code)){
            errors.push({msg: 'Valid code is required'});
        }
    }
    if(amount === ''){
        errors.push({msg: 'Coupon amount is required'});
    }
    if(expiry_date === ''){
        errors.push({msg: 'Expiry date is required'});
    }else{
        if(new Date(expiry_date) < new Date()){
            errors.push({msg: 'Valid date is required'});
        }
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Coupon.create({
                code,
                amount,
                expiry_date,
                status: true,
            });
            return res.status(200).json({msg: 'Coupon added successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.deleteCoupon = async (req,res)=>{
    const id = req.params.id;
    try{
        const coupon = await Coupon.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Coupon deleted successfully'});
    }catch(error){
        return res.status(500).json({errors: [{msg: error.message}]});
    }
    
}

module.exports.editCoupon = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Coupon.findOne({_id:id});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateCoupon = async(req,res) =>{
    const id = req.params.id;
    const {  code, amount, expiry_date} = req.body;
    const errors = [];
    if(code === ''){
        errors.push({msg: 'Coupon code is required'});
    }else{
        var filter = /^([A-Z0-9])/;
        if(!filter.test(code)){
            errors.push({msg: 'Valid code is required'});
        }
    }
    if(amount === ''){
        errors.push({msg: 'Coupon amount is required'});
    }
    if(expiry_date === ''){
        errors.push({msg: 'Expiry date is required'});
    }else{
        if(new Date(expiry_date) < new Date()){
            errors.push({msg: 'Valid date is required'});
        }
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Coupon.findByIdAndUpdate(id,{
                code,
                amount,
                expiry_date,
                status: true,
            });
            return res.status(200).json({msg: 'Coupon updated successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.statusCoupon = async(req, res) =>{
    const { status, coupon_id } = req.body;
    let coupon_status ;
    if(status === 'true'){
        coupon_status = false;
    }else{
        coupon_status = true;
    }
    try {
        const response = await Coupon.findOneAndUpdate({_id: coupon_id},{
            status: coupon_status
        },{new: true});
        return res.status(200).json({ status: coupon_status, coupon_id});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}