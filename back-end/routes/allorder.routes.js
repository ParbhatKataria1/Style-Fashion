const express = require("express");
const {
  getPosts,
  deleteData,
  updateData,
  addPost,
} = require("../controller/allorder.controller");
const allorder = express.Router();

const { verifyUser } = require("../middleware/posts.middleware");
// {addPost,getPosts,  getTopData, updateData, deleteData}

allorder.use(verifyUser);

allorder.post("/add", addPost);

allorder.get("/", getPosts);

// order.get('/top', getTopData )

allorder.patch("/update/:_id", updateData);

allorder.delete("/delete/:_id", deleteData);

module.exports = { allorder };
