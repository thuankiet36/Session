const Book = require("../models/book.model.js");
const Session = require("../models/session.model.js");

// module.exports.index = (request, response) => {
//   var page = parseInt(request.query.page) || 1;
//   var perPage = 5;
//   var totalBooks = db.get("books").value().length;
//   var pages = Math.ceil(totalBooks / perPage);
//   var start = (page - 1) * perPage;
//   var sessionId = request.signedCookies.sessionId;
//   var userId = request.signedCookies.userId;
//   var cartObj = db.get("sessions").find({ id: sessionId }).get("cart").value();
//   var cart = 0;
//   for (var num in cartObj) {
//     cart += cartObj[num];
//   }

//   response.render("./books/book.pug", {
//     books: db.get("books").drop(start).take(perPage).value(),
//     pages: pages,
//     current: page,
//     cart: cart,
//     userId: userId,
//   });
// };

module.exports.index = async (request, response) => {
  var books = await Book.find();
  var page = parseInt(request.query.page) || 1;
  var perPage = 5;
  var totalBooks = books.length;
  var pages = Math.ceil(totalBooks / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;
  var sessionId = request.signedCookies.sessionId;
  var userId = request.signedCookies.userId;
  var totalCart = 0;

  if (sessionId) {
    var session = await Session.findOne({ _id: sessionId });
    var cart = session.cart;
    for (var i = 0; i < cart.length; i++) {
      totalCart += cart[i].quantity;
    }
  }

  response.render("./books/book.pug", {
    books: books.slice(start, end),
    pages: pages,
    current: page,
    cart: totalCart,
    userId: userId,
  });
};
