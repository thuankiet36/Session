const mongoose = require("mongoose");

var cartSchema = new mongoose.Schema({
  bookId: { type: Number },
});

var Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
