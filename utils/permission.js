const RoleHasPermission = require('../models/RoleHasPermission');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

module.exports.rolePermission = async(user_type, permission_name) =>{
    const role = await Role.findOne({name: user_type});
    if(role){
        const permission = await Permission.findOne({name: permission_name});
        const permissionRole = await RoleHasPermission.findOne({role_id: role._id});
        if(!permissionRole.permission_id.includes(permission._id)){
            return false;
        }else{
            return true;
        }
    }
}