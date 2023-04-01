const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    brand: String,
    sizes: String,
    images: Array,
    qty: Number,
    color: String,
    type: String,
    userId: String,
  },
  {
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
