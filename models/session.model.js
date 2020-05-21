const mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  cart: {
    type: Object
  }
});

var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;
