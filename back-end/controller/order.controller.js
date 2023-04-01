const { OrderModel } = require("../model/order.model");

const addPost = async (req, res) => {
  try {
    let item = new OrderModel(req.body);
    await item.save();
    res.status(200).send({ msg: "item is stored" });
  } catch (error) {
    res.status(400).send({ msg: "item is not able to store in the database" });
  }
};

const getPosts = async (req, res) => {
  let { page, limit } = req.query;
  limit = limit == undefined ? 8 : limit;
  try {
    let { userId } = req.body;
    let obj = { userId };
    //    if(min){
    //     obj.no_of_comments={$gte:min}
    //    }
    //    if(max){
    //     if(min)obj.no_of_comments={$lte:max, $gte:min};
    //     else obj.no_of_comments={$lte:max};
    //    }
    //    if(device){
    //     obj.device = device;
    //    }
    let data;
    if (page) {
      data = await OrderModel.find(obj)
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      data = await OrderModel.find(obj).limit(limit);
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ msg: "not able to get the data" });
  }
};

const updateData = async (req, res) => {
  try {
    let { _id } = req.params;
    let body = req.body;
    let { userId } = req.body;
    let data = await OrderModel.findOneAndUpdate({ _id, userId }, body, {
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
    let { userId } = req.body;
    let data = await OrderModel.findOneAndDelete({ _id, userId }, null, {
      new: true,
    });
    console.log(data);
    res.status(200).send({ msg: "data is deleted", data });
  } catch (error) {
    res.status(400).send({ msg: "error in deleting the data" });
  }
};

module.exports = { getPosts, deleteData, updateData, addPost };
