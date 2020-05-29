const Session = require("../models/session.model");
const User = require("../models/user.model");

// Display user
module.exports.index = async (request, response, next) => {
  var sessionId = request.signedCookies.sessionId;
  var session = await Session.findById({ _id: sessionId });
  var cart = session.cart;
  var totalCart = 0;
  for (var i = 0; i < cart.length; i++) {
    totalCart += cart[i].quantity;
  }

  response.render("./users/index.pug", {
    cart: totalCart,
  });
  next();
};

// Edit user name
module.exports.edit = async (request, response) => {
  var user = await User.findById(request.params.userId);
  response.render("./users/edit.user.pug", {
    user: user,
  });
};

module.exports.postEdit = async (request, response, next) => {
  var user = await User.findOne({ _id: request.params.userId });
  user.userName = request.body.userName;
  try {
    user = await user.save();
  } catch (e) {
    next(e);
  }
  response.redirect("/users");
};
