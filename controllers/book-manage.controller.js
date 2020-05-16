const shortId = require("shortid");
const cloudinary = require("cloudinary");

const db = require("../db.js");

require("../utils/cloudinary");

//display List of books
module.exports.index = (request, response) => {
  var page = parseInt(request.query.page) || 1;
  var perPage = 5;
  var totalBooks = db.get("books").value().length;
  var pages = Math.ceil(totalBooks / perPage);

  var start = (page - 1) * perPage;
  response.render("./books/book-manage.pug", {
    books: db
      .get("books")
      .drop(start)
      .take(perPage)
      .value(),
    pages: pages,
    current: page
  });
};

// create new book
module.exports.create = (request, response) => {
  response.render("./books/create.book.pug");
};

module.exports.postCreate = async (request, response, next) => {
  try {
    var bookId = shortId.generate();
    var bookTitle = request.body.title;
    var bookDescription = request.body.description;
    var result = await cloudinary.v2.uploader.upload(request.file.path);
    var url = result.url;
    db.get("books")
      .push({
        title: bookTitle,
        description: bookDescription,
        id: bookId,
        coverUrl: url
      })
      .write();
    response.redirect("/books-manage");
  } catch (error) {
    next(error);
  }
};

// edit book
module.exports.edit = (request, response) => {
  var id = request.params.id;
  db.get("books")
    .value()
    .filter(book => {
      if (book.id === id) {
        response.render("./books/edit.book.pug", {
          book: book
        });
      }
    });
};

module.exports.postEdit = async (request, response, next) => {
  try {
    var result = await cloudinary.v2.uploader.upload(request.file.path);
    var url = result.url;
    var id = request.params.id;
    var bookTitle = request.body.title;
    db.get("books")
      .find({ id: id })
      .assign({title: bookTitle, coverUrl: url})
      .write();
    response.redirect("/books-manage");
  } catch (error) {
    next(error);
  }
};

// delete book
module.exports.delete = (request, response) => {
  var id = request.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  response.redirect("/books-manage");
};
