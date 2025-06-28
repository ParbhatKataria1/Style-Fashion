const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PostModel } = require("../model/item.model");

const addPost = async (req, res) => {
  try {
    let item = new PostModel(req.body);
    await item.save();
    res.status(200).send({ msg: "item is stored" });
  } catch (error) {
    res.status(400).send({ msg: "item is not able to store in the database" });
  }
};

const getPosts = async (req, res) => {
  let { page, limit, min, max, brand, category, color } = req.query;
  limit = limit == undefined ? 8 : limit;
  try {
    let obj = { type: "men" };
    if (min) {
      obj.price = { $gte: min };
    }
    if (max) {
      if (min) obj.price = { $lte: max, $gte: min };
      else obj.price = { $lte: max };
    }
    if (brand) obj.brand = brand;
    if (category) obj.category = category;
    if (color) obj.color = color;
    let data;
    if (page) {
      data = await PostModel.find(obj)
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      data = await PostModel.find(obj).limit(limit);
    }
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "not able to get the data" });
  }
};

const getPostsItem = async (req, res) => {
  let { _id } = req.params;
  try {
    let data = await PostModel.find({ _id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "not able to get the data" });
  }
};

// const getTopData = async(req, res)=>{
//     let {page} = req.query;
//     console.log(page)
//     try {
//        let {userId}  = req.body;
//        let obj = {userId};
//        let data;

//        if(page){
//            data = await PostModel.find(obj).skip((page-1)*3).limit(3).sort({no_of_comments:-1});
//        }
//        else {
//         data = await PostModel.find(obj).limit(3).sort({no_of_comments:-1});
//        }
//        res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send({"msg":"not able to get the data"})
//     }
// }

const updateData = async (req, res) => {
  try {
    let { _id } = req.params;
    let body = req.body;
    let data = await PostModel.findOneAndUpdate({ _id }, body, {
      new: true,
    });
    console.log(data);
    res.status(200).send({ msg: "data is updated", data });
  } catch (error) {
    res.status(400).send({ msg: "error in updating the data" });
  }
};

const deleteData = async (req, res) => {
  try {
    let { _id } = req.params;
    let data = await PostModel.findOneAndDelete({ _id }, null, {
      new: true,
    });
    console.log(data);
    res.status(200).send({ msg: "data is deleted", data });
  } catch (error) {
    res.status(400).send({ msg: "error in deleting the data" });
  }
};

module.exports = { getPosts, addPost, getPostsItem, updateData, deleteData };
