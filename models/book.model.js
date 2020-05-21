const mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  description: {
    type: String
  },
  coverUrl: {
    type: String,
    required: true
  },
});

var Book = mongoose.model("Book", bookSchema, "books");

module.exports = Book;
