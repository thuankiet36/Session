const cloudinary = require("cloudinary");

const Book = require("../models/book.model.js");

require("../utils/cloudinary");

// Display managed books
module.exports.index = async (request, response, next) => {
  try {
    var books = await Book.find();
    var page = parseInt(request.query.page) || 1;
    var perPage = 5;
    var totalBooks = books.length;
    var pages = Math.ceil(totalBooks / perPage);
    var start = (page - 1) * perPage;
    var end = page * perPage;

    response.render("./books/book-manage.pug", {
      books: books.slice(start, end),
      pages: pages,
      current: page,
    });
  } catch (err) {
    next(err);
  }
};

// create new book
module.exports.create = (request, response) => {
  response.render("./books/create.book.pug");
};

module.exports.postCreate = async (request, response, next) => {
  var result = await cloudinary.v2.uploader.upload(request.file.path);
  var url = result.url;
  var book = new Book({
    title: request.body.title,
    description: request.body.description,
    coverUrl: url,
  });

  try { 
    book = await book.save();
    response.redirect("/books-manage");
  } catch (error) {
    next(error);
  }
};

// edit book
module.exports.edit = async (request, response) => {
  var book = await Book.findById(request.params.id);
  response.render("./books/edit.book.pug", {
    book: book,
  });
};

module.exports.postEdit = async (request, response) => {
  var result = await cloudinary.v2.uploader.upload(request.file.path);
  var url = result.url;
  var book = await Book.findById(request.params.id);
  book.title = request.body.title;
  book.coverUrl = url;

  try {
    book = await book.save();
    response.redirect("/books-manage");
  } catch (err) {
    next(err);
  }
};

// delete book

module.exports.delete = async (request, response) => {
  await Book.findByIdAndDelete(request.params.id);
  response.redirect("/books-manage");
};
