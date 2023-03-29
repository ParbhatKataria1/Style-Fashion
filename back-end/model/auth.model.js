const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password:String
}, {
    versionKey:false
})

const AuthModel = mongoose.model('auth',authSchema );
module.exports = {AuthModel}