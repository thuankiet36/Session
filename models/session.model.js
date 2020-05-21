const mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  cart : Array
});

var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;
