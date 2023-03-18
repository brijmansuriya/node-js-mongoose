const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var _ = require('lodash');

const AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    mobile: String,
    country_code: String,
    status: { type: String, enum: ['active', 'inactive', 'delete'] },
    address: String,
    token: String,
    otp:String
}, {
        timestamps: true
    });
AdminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Admin', AdminSchema);