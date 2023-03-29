const express = require('express');
const { connection } = require('./db');
const { auth } = require('./routes/auth.routes');
const { cart } = require('./routes/cart.routes');
const { men } = require('./routes/men.routes');
const { order } = require('./routes/order.routes');
const { women } = require('./routes/women.routes');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/users', auth);
app.use('/men', men)
app.use('/women', women);
app.use('/cart', cart);
app.use('/order', order)

app.listen(process.env.port, async(req, res)=>{
    try {
        await connection;
        console.log('database is running ');
    } catch (error) {
        console.log('database is not running ');
    }
})


// title : String,
//     price : String,
//     brand : String,
//     sizes : Array,
//     images:Array,
//     color:Array,
//     type:String
function con(){
   let item =  {
        "title":'Branded Elastic 3 Pack Organic Cotton Bralettes',
        "price":1290,
        "size":['xs','s','m','l' ],
        "color":['white', 'blue', 'red','yellow'],
        "type":'men',
        "images":['https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3234.jpg?v=1671078617&width=600',
                'https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3287.jpg?v=1677136742&width=600',
                'https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3272.jpg?v=1677136742&width=600'
                ]
    
    }
    let cart = {
        "title":"Branded Elastic 3 Pack Organic Cotton Bralettes",
        "price":1290,
        "brand":"ko",
        "size":"xs",
        "color":"white",
        "images":["https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3234.jpg?v=1671078617&width=600",
                "https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3287.jpg?v=1677136742&width=600",
                "https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3272.jpg?v=1677136742&width=600"
                ],
        "type":"men"
    }
    let order = {
        "title":"Branded Elastic 3 Pack Organic Cotton Bralettes",
        "price":1290,
        "brand":"ko",
        "size":"xs",
        "color":"white",
        "images":["https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3234.jpg?v=1671078617&width=600",
                "https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3287.jpg?v=1677136742&width=600",
                "https://cdn.shopify.com/s/files/1/0677/1464/6315/products/koovs-3272.jpg?v=1677136742&width=600"
                ],
        "type":"men",
        "qty":3,
        "pincode":14555,
        "city":"guru",
        "address":"#316 gurunanak",
        "state":"punjab",
        "status":false,
        "date":'12th feb 12:30'
    }

}
    // title : String,
    // price : String,
    // brand : String,
    // sizes : String,
    // images:Array,
    // qty:Number,
    // color:String,
    // type:String,
    // pincode:String,
    // city:String,
    // address:String,
    // state:String,
    // status:Boolean,
    // userId:String,
    // date:String


