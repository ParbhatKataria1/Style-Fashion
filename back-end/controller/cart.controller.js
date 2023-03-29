

const { CartModel } = require('../model/cart.model');


const addPost = async(req, res)=>{
    try {
        let item = new CartModel(req.body);
        await item.save();
        res.status(200).send({"msg":"item is stored"})
    } catch (error) {
        res.status(400).send({"msg":"item is not able to store in the database"})
    }
}


const getPosts = async(req, res)=>{
    let {page,limit} = req.query;
    limit = limit==undefined?8:limit;
    try {
       let {userId}  = req.body;
       let obj = {userId};
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
       if(page){
           data = await CartModel.find(obj).skip((page-1)*limit).limit(limit);
       }
       else {
        data = await CartModel.find(obj).limit(limit);
       }
       res.status(200).send(data);
    } catch (error) {
        res.status(400).send({"msg":"not able to get the data"})
    }
}

// const getTopData = async(req, res)=>{
//     let {page} = req.query;
//     console.log(page)
//     try {
//        let {userId}  = req.body;
//        let obj = {userId};
//        let data;

//        if(page){
//            data = await CartModel.find(obj).skip((page-1)*3).limit(3).sort({no_of_comments:-1});
//        }
//        else {
//         data = await CartModel.find(obj).limit(3).sort({no_of_comments:-1});
//        }
//        res.status(200).send(data);
//     } catch (error) {
//         res.status(400).send({"msg":"not able to get the data"})
//     }
// }


const updateData = async(req, res)=>{
    try {
        let {_id} = req.params;
        let body = req.body;
        let {userId}= req.body;
        let data = await CartModel.findOneAndUpdate({_id, userId}, body, {new:true});
        console.log(data);
        res.status(200).send({"msg":"data is updated", data});

    } catch (error) {
        res.status(400).send({"msg":"error in updating the data"})
    }
}

const deleteData = async(req, res)=>{
    try {
        let {_id} = req.params;
        let {userId}= req.body;
        let data = await CartModel.findOneAndDelete({_id, userId}, null, {new:true});
        console.log(data);
        res.status(200).send({"msg":"data is deleted", data});

    } catch (error) {
        res.status(400).send({"msg":"error in deleting the data"})
    }
}

module.exports = {addPost,getPosts, updateData, deleteData}




