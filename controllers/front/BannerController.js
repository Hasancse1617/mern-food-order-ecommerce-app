const Banner = require("../../models/Banner");


module.exports.allBanner = async(req,res) =>{
    try {
        const response = await Banner.find({status: true}).sort({updateAt:"descending"});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}