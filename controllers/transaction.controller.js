const User = require("../models/user.model");

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

module.exports.delete = async (request, response, next) => {
  var userId = request.params.userId;
  await User.deleteOne({ _id: userId });
  response.redirect("/transactions");
};
