const cloudinary = require("cloudinary");

const User = require("../models/user.model");

require("../utils/cloudinary");

// Create book
module.exports.create = async (request, response) => {
  var user = await User.findOne({ _id: request.signedCookies.userId });
  response.render("./shops/create.pug", {
    user: user,
  });
};

module.exports.postCreate = async (request, response, next) => {
  var result = await cloudinary.v2.uploader.upload(request.file.path);
  var url = result.url;
  var user = await User.findOne({ _id: request.signedCookies.userId });
  if (typeof user.shops === "undefined") {
    user.shops = [];
    user.shops.push({
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      coverUrl: url,
    });
  } else {
    var shops = user.shops;
    shops.push({
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      coverUrl: url,
    });
  }
  try {
    user = await user.save();
    response.redirect("/shops/create");
  } catch (error) {
    next(error);
  }
};

// Edit book
module.exports.edit = async (request, response) => {
  var user = await User.findOne({ _id: request.signedCookies.userId });
  var book = user.shops.find((item) => item._id == request.params.bookId);
  response.render("./shops/edit-book.pug", {
    user: user,
    book: book,
  });
};

module.exports.postEdit = async (request, response, next) => {
  var result = await cloudinary.v2.uploader.upload(request.file.path);
  var url = result.url;
  var user = await User.findOne({ _id: request.signedCookies.userId });
  var book = user.shops.find((item) => item._id == request.params.bookId);
  book.title = request.body.title;
  book.price = request.body.price;
  book.coverUrl = url;
  try {
    user = await user.save();
    response.redirect("/shops/create");
  } catch (e) {
    next(e);
  }
};

// Delete book
module.exports.delete = async (request, response, next) => {
  var user = await User.findOne({ _id: request.signedCookies.userId });
  user.shops.filter((item, index) => {
    if (item._id == request.params.bookId) {
      user.shops.splice(index, 1);
    }
    return user;
  });
  try {
    user = await user.save();
    response.redirect("/shops/create");
  } catch (e) {
    next(e);
  }
};

// Display shop
module.exports.index = async (request, response) => {
  var user = await User.findOne({ _id: request.signedCookies.userId });
  var books = user.shops;
  response.render("./shops/index.pug", {
    user: user,
    books: books
  });
};
