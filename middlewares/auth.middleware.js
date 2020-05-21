const db = require("../db");
const User = require("../models/user.model");

module.exports.requireAuth = (request, response, next) => {
  if (!request.signedCookies.userId) {
    response.redirect("/auth/login");
    return;
  }

  var user = db.get("users").find({ id: request.signedCookies.userId }).value();

  if (!user) {
    response.redirect("/auth/login");
    return;
  }

  response.locals.user = user;
  next();
};

module.exports.requireAuth = async (request, response, next) => {
  if (!request.signedCookies.userId) {
    response.redirect("/auth/login");
    return;
  }

  var user = await User.findOne({ _id: request.signedCookies.userId });

  if (!user) {
    response.redirect("/auth/login");
    return;
  }
  response.locals.user = user;
  next();
};
