const express = require('express');
const {  getPosts, addPost, updateData, deleteData, getPostsItem } = require('../controller/women.controller');
const women = express.Router();

const { verifyUser } = require('../middleware/posts.middleware');
// {addPost,getPosts,  getTopData, updateData, deleteData}

women.use(verifyUser)

women.post('/add', addPost )

women.get('/', getPosts )

// women.get('/top', getTopData )
women.get('/:_id', getPostsItem)

women.patch('/update/:_id', updateData )

women.delete('/delete/:_id', deleteData )


module.exports = {women}
