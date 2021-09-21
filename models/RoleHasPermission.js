const { model, Schema } = require('mongoose');

const rolehaspermissionSchema = new Schema({
    permission_id:[{
        type: Schema.Types.ObjectId,
        ref: 'permission'
    }],
    role_id:{
        type: Schema.Types.ObjectId,
        ref: 'role'
    }
}, {timestamps: true} );

module.exports = model("rolehaspermission", rolehaspermissionSchema);