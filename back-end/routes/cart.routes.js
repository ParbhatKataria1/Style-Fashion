const express = require('express');
const { getPosts, addPost,  updateData, deleteData } = require('../controller/cart.controller');
const cart = express.Router();

const { verifyUser } = require('../middleware/posts.middleware');
// {addPost,getPosts,  getTopData, updateData, deleteData}

cart.use(verifyUser)

cart.post('/add', addPost )

cart.get('/', getPosts )

// cart.get('/top', getTopData )
cart.get('/')

cart.patch('/update/:_id', updateData )

cart.delete('/delete/:_id', deleteData )


module.exports = {cart}
