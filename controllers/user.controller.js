const shortId = require("shortid");
const Session = require("../models/session.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const db = require("../db.js");

// display Archives ('/users')
// module.exports.index = (request, response, next) => {
//   var sessionId = request.signedCookies.sessionId;
//   var cartObj = db
//     .get("sessions")
//     .find({ id: sessionId })
//     .get("cart")
//     .value();
//   var cart = 0;
//   for (var num in cartObj) {
//     cart += cartObj[num];
//   }
//   response.render("./users/listBook.user.pug", {
//     users: db.get("users").value(),
//     books: db.get("books").value(),
//     cart: cart,
//   });
//   next();
// };

module.exports.index = async (request, response, next) => {
  var sessionId = request.signedCookies.sessionId;
  var session = await Session.findById({ _id: sessionId });
  var cart = session.cart;
  var totalCart = 0;
  for (var i = 0; i < cart.length; i++) {
    totalCart += cart[i].quantity;
  }

  response.render("./users/listBook.user.pug", {
    cart: totalCart,
  });
  next();
};

// edit user name
// module.exports.edit = (request, response) => {
//   var userId = request.params.userId;
//   db.get("users")
//     .value()
//     .filter((user) => {
//       if (user.id === userId) {
//         response.render("./users/edit.user.pug", {
//           user: user,
//         });
//       }
//     });
// };

module.exports.edit = async (request, response) => {
  var user = await User.findById(request.params.userId);
  response.render("./users/edit.user.pug", {
    user: user,
  });
};

// module.exports.postEdit = (request, response) => {
//   var id = request.params.userId;
//   db.get("users").find({ id: id }).assign(request.body).write();
//   response.redirect("/users");
// };

module.exports.postEdit = async (request, response, next) => {
  var user = await User.findOne({ _id: request.params.userId });
  user.userName = request.body.userName
  try {
    user = await user.save();
  } catch (e) {
    next(e);
  }
  response.redirect("/users");
};

//delete book
// module.exports.delete = (request, response) => {
//   var bookId = request.params.bookId;
//   var user = response.locals.user;
//   db.get("users")
//     .find({ id: user.id })
//     .get("books")
//     .remove({ bookId: bookId })
//     .write();
//   response.redirect("/users");
// };

// borrow book
// module.exports.borrow = (request, response) => {
//   response.render("./users/borrow.user.pug", {
//     users: db.get("users").value(),
//     books: db.get("books").value(),
//   });
// };

// module.exports.postBorrow = (request, response) => {
//   var book = request.body.book;
//   var id = shortId.generate();
//   var user = response.locals.user;
//   console.log(
//     db
//       .get("users")
//       .find({ id: user.id })
//       .get("books")
//       .push({ bookId: id, bookName: book })
//       .write()
//   );
//   response.locals.user = user;
//   response.redirect("/users");
// };
