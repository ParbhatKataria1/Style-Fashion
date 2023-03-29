const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title : String,
    price : String,
    brand : String,
    sizes : Array,
    images:Array,
    color:Array,
    type:String
}, {
    versionKey:false
})

const PostModel = mongoose.model('post',postSchema );
module.exports = {PostModel}