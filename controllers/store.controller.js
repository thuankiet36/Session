const User = require("../models/user.model");

// Display shop
module.exports.index = async (request, response) => {
  var user = await User.findOne({ _id: request.signedCookies.userId });
  var books = user.shops;
  response.render("./shops/index.pug", {
    user: user,
    books: books,
  });
};
