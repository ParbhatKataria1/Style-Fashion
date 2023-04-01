const express = require("express");
const {
  getPosts,
  getPostsItem,
  addPost,
  updateData,
  deleteData,
} = require("../controller/men.controller");
const men = express.Router();

const { verifyUser } = require("../middleware/posts.middleware");
const { PostModel } = require("../model/item.model");
// {addPost,getPosts,  getTopData, updateData, deleteData}

men.use(verifyUser);

men.post("/add", addPost);

men.get("/", getPosts);

men.get("/:_id", getPostsItem);

men.patch("/update/:_id", updateData);

men.delete("/delete/:_id", deleteData);

module.exports = { men };
