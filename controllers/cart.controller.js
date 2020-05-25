const Session = require("../models/session.model");

module.exports.addToCart = async (request, response, next) => {
  var bookId = request.params.bookId;
  var sessionId = request.signedCookies.sessionId;

  if (!sessionId) {
    response.redirect("/books");
    return;
  }

  var session = await Session.findOne({ _id: sessionId });
  if (typeof session.cart === "undefined") {
    session.cart = [];
    session.cart.push({
      id: bookId,
      quantity: 1,
    });
  } else {
    var cart = session.cart;
    var newBook = true;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === bookId) {
        cart[i].quantity++;
        newBook = false;
      }
    }
    if (newBook) {
      cart.push({
        id: bookId,
        quantity: 1,
      });
    }
  }
  try {
    session = await session.save();
  } catch (e) {
    next(e);
  }
  response.redirect("/books");
};
