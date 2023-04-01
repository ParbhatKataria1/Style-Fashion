const mongoose = require('mongoose');



// schema for men and women item
const postSchema = mongoose.Schema({
    title : String,
    price : Number,
    brand : String,
    sizes : Array, // [xs, s, m, l]
    images:Array,
    color:Array, // [white, blue, yellow, black]
    type:String // men or women
}, {
    versionKey:false
})

const PostModel = mongoose.model('post',postSchema );
module.exports = {PostModel}