const mongoose = require("mongoose");

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
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
