const shortId = require("shortid");

const db = require("../db.js");

module.exports.addToCart = (request, response, next) => {
  var bookId = request.params.bookId;
  var sessionId = request.signedCookies.sessionId;

  if (!sessionId) {
    response.redirect("/books");
    return;
  }

  var count = db
    .get("sessions")
    .find({ id: sessionId })
    .get("cart." + bookId, 0)
    .value();

  db.get("sessions")
    .find({ id: sessionId })
    .set("cart." + bookId, count + 1)
    .write();

  response.redirect("/books");
};
