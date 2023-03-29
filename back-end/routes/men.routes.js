const express = require('express');
const { getPosts } = require('../controller/men.controller');
const men = express.Router();

const { verifyUser } = require('../middleware/posts.middleware');
// {addPost,getPosts,  getTopData, updateData, deleteData}

men.use(verifyUser)

// men.post('/add', addPost )

men.get('/', getPosts )

// men.get('/top', getTopData )

// men.patch('/update/:_id', updateData )

// men.delete('/delete/:_id', deleteData )


module.exports = {men}
