const Role = require("../../models/Role");
const Permission = require("../../models/Permission");
const { rolePermission } = require("../../utils/permission");
const RoleHasPermission = require("../../models/RoleHasPermission");

module.exports.fetchRole = async(req,res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.Role.View');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    try {
        const response = await Role.find({}).sort({createdAt: "descending"});
        const permissions = await RoleHasPermission.find({}).populate('permission_id','name').sort({createdAt: "descending"});
        return res.status(200).json({response: response, permissions});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.addRole = async(req,res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.Role.Create');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    const { role, permissions } = req.body;
    const errors = [];
    if(role === ''){
        errors.push({msg: 'Role name is required'});
    }
    if(permissions.length === 0){
        errors.push({msg: 'Permission is required'});
    }
    const checkRoll = await Role.findOne({name: role});
    if(checkRoll){
        errors.push({msg: 'Role name is already exists'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            // const response = await Permission.insertMany([
            //     {name: 'User.View', group_name: 'User'},
            //     {name: 'User.Create', group_name: 'User'},
            //     {name: 'User.Delete', group_name: 'User'},
            //     {name: 'User.Role.View', group_name: 'User'},
            //     {name: 'User.Role.Create', group_name: 'User'},
            //     {name: 'User.Role.Edit', group_name: 'User'},
            //     {name: 'User.Role.Delete', group_name: 'User'},
            //     {name: 'Blog.Create', group_name: 'Blog'},
            //     {name: 'Blog.Edit', group_name: 'Blog'},
            //     {name: 'Blog.Delete', group_name: 'Blog'},
            //     {name: 'Blog.View', group_name: 'Blog'},
            //     {name: 'Product.Create', group_name: 'Product'},
            //     {name: 'Product.Edit', group_name: 'Product'},
            //     {name: 'Product.Delete', group_name: 'Product'},
            //     {name: 'Product.View', group_name: 'Product'},
            //     {name: 'Category.Create', group_name: 'Category'},
            //     {name: 'Category.Edit', group_name: 'Category'},
            //     {name: 'Category.Delete', group_name: 'Category'},
            //     {name: 'Category.View', group_name: 'Category'},
            //     {name: 'Banner.Create', group_name: 'Banner'},
            //     {name: 'Banner.Edit', group_name: 'Banner'},
            //     {name: 'Banner.Delete', group_name: 'Banner'},
            //     {name: 'Banner.View', group_name: 'Banner'},
            //     {name: 'Coupon.Create', group_name: 'Coupon'},
            //     {name: 'Coupon.Edit', group_name: 'Coupon'},
            //     {name: 'Coupon.Delete', group_name: 'Coupon'},
            //     {name: 'Coupon.View', group_name: 'Coupon'},
            //     {name: 'Order.View', group_name: 'Order'},
            //     {name: 'Order.Edit', group_name: 'Order'},
            // ]);
            // console.log('created')
            const response = await Role.create({name: role});
            const response2 = await RoleHasPermission.create({permission_id: permissions, role_id: response._id});
            return res.status(200).json({msg: 'Role permission created successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
    
}

module.exports.fetchPermission = async(req,res) =>{
    try {
        const response = await Permission.aggregate([
            {
                $group: {
                    "_id": {
                          "group": "$group_name",
                    },
                    "names": {
                          "$addToSet": "$$ROOT",
                    }
                }
            }
        ]);

        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.editRole = async(req,res) =>{
    //Role Permission
    const user_type = req.params.user_type;
    const permission = await rolePermission(user_type, 'User.Role.Edit');
    if(!permission){
        return res.status(403).json({red_zone: 'Unauthorized access'});
    }

    const id = req.params.id;
    try {
        const response = await RoleHasPermission.find({role_id: id}).populate('role_id','name');
        return res.status(200).json({response: response[0]});
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateRole = async(req,res) =>{
    const id = req.params.id;
    const { role, permissions } = req.body;
    const errors = [];
    if(role === ''){
        errors.push({msg: 'Role name is required'});
    }
    if(permissions.length === 0){
        errors.push({msg: 'Permission is required'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await RoleHasPermission.findOneAndUpdate({role_id: id}, {permission_id: permissions});
            return res.status(200).json({msg: 'Role permission updated successfully'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
    
}