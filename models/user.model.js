const mongoose = require("mongoose");

var shopShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  coverUrl: {
    type: String,
    required: true,
  },
});

var userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  wrongLoginCount: {
    type: Number,
  },
  avatarUrl: {
    type: String,
  },
  shops: [shopShema],
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
