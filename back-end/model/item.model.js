const mongoose = require("mongoose");

// schema for men and women item
const postSchema = mongoose.Schema(
  {
    title: String,
    price: Number,
    brand: String, // Koovs, Nike, 5ive, TheCoutourclub
    size: Array, // [xs, s, m, l]
    images: Array, // according to sizes
    color: Array, // ["white", "blue", "yellow", "black"]
    type: String, // men or women
    category: String, // jeans, track pants, pants, shirt, t-shirt, hoodies (for men), Kurta, Palazzo, KurtaTrouser, PattiKurta, Suit, jeans, saree (for women)
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
