const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    title : String,
    price : Number,
    brand : String,
    sizes : String,
    images:Array,
    qty:Number,
    color:String,
    type:String,
    pincode:String,
    city:String,
    address:String,
    state:String,
    status:Boolean,
    userId:String,
    date:String
}, {
    versionKey:false
})

const OrderModel = mongoose.model('order',orderSchema );
module.exports = {OrderModel}