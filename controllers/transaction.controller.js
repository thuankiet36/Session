const User = require("../models/user.model");

const db = require("../db.js");

// display transactions
// module.exports.index = (request, response) => {
//   var page = parseInt(request.query.page) || 1;
//   var perPage = 3;
//   var totalBooks = db.get("users").value().length;
//   var pages = Math.ceil(totalBooks / perPage);

//   var start = (page - 1) * perPage;
//   response.render("./transactions/transactions.pug", {
//     transactions: db.get("transactions").value(),
//     users: db.get("users").drop(start).take(perPage).value(),
//     pages: pages,
//     current: page,
//   });
// };

module.exports.index = async (request, response, next) => {
  var page = parseInt(request.query.page) || 1;
  var perPage = 3;
  var users = await User.find();
  var totalUser = users.length;
  var pages = Math.ceil(totalUser / perPage);

  var start = (page - 1) * perPage;
  var end = page * perPage;

  response.render("./transactions/transactions.pug", {
    users: users.slice(start, end),
    pages: pages,
    current: page,
  });
};

// show info
// module.exports.info = (request, response) => {
//   var userId = request.params.userId;
//   response.render("./transactions/info.pug", {
//     books: db.get("users").find({ id: userId }).get("books").value(),
//   });
// };

// module.exports.info = async (request, response) => {
//   var userId = request.params.userId;
//   var books = await Book.findOne({ id: userId });
//   response.render("./transactions/info.pug", {
//     books: books,
//   });
// };

//delete user
// module.exports.delete = (request, response) => {
//   var userId = request.params.userId;
//   console.log(userId)
//   db.get("users").remove({ id: userId }).write();
//   response.redirect("/transactions");
// };

module.exports.delete = async (request, response, next) => {
  var userId = request.params.userId;
  await User.deleteOne({ _id: userId });
  response.redirect("/transactions");
};
