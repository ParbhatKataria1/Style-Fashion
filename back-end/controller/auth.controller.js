const bcrypt = require("bcrypt");
const { AuthModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let { email } = req.body;
  let data = await AuthModel.findOne({ email });
  try {
    const { email, first_name, last_name } = req.body;
    if (data) {
      const { password, name, email, gender, age, city, is_married } = req.body;
      let { password: hash, _id } = await AuthModel.findOne({
        first_name,
        email,
        last_name,
      });
      bcrypt.compare(first_name + last_name, hash, function (err, result) {
        // result == false
        if (err)
          res
            .status(400)
            .send({
              msg: "login details are wrong or not able to compare the hash",
            });
        if (result)
          res
            .status(200)
            .send({
              msg: "user is logged in ",
              token: jwt.sign({ userId: _id }, "masai"),
            });
      });
    } else {
      bcrypt.hash(first_name + last_name, 5, async (err, hash) => {
        if (err)
          res
            .status(400)
            .send({ msg: "not able to generate hash for the user" });
        if (hash) {
          let user = new AuthModel({
            first_name,
            email,
            last_name,
            password: hash,
          });
          await user.save();
          const { _id } = await AuthModel.findOne({
            first_name,
            email,
            last_name,
          });
          if (_id)
            res
              .status(200)
              .send({
                msg: "user is logged in2 ",
                token: jwt.sign({ userId: _id }, "masai"),
              });
          else
            res
              .status(400)
              .send({
                msg: "login details are wrong or not able to compare the hash2",
              });
        }
        // Store hash in your password DB.
      });
    }
  } catch (error) {
    res.status(400).send({ msg: "user is not able to register" });
  }
};

const login = async (req, res) => {
  try {
    const { password, name, email, gender, age, city, is_married } = req.body;
    let { password: hash, _id } = await AuthModel.findOne({
      name,
      email,
      gender,
      age,
      city,
      is_married,
    });
    bcrypt.compare(password, hash, function (err, result) {
      // result == false
      if (err)
        res
          .status(400)
          .send({
            msg: "login details are wrong or not able to compare the hash",
          });
      if (result)
        res
          .status(200)
          .send({
            msg: "user is logged in ",
            token: jwt.sign({ userId: _id }, "masai"),
          });
    });
  } catch (error) {
    res.status(400).send({ msg: "not able to login" });
  }
};

module.exports = { login, register };
