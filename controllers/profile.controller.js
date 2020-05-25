const User = require("../models/user.model");
const cloudinary = require("cloudinary");

require("../utils/cloudinary");

// display profile
module.exports.index = (request, response) => {
  response.render("./profile/index.pug");
};

// display and edit profile avatar
module.exports.avatar = async (request, response) => {
  var users = await User.find();
  response.render("./profile/avatar.pug", {
    users: users,
  });
};

module.exports.postAvatar = async (request, response, next) => {
  try {
    var result = await cloudinary.v2.uploader.upload(request.file.path);
    var url = result.url;
    var user = await User.findOne({ _id: request.signedCookies.userId });
    user.avatarUrl = url;
    user = await user.save();
  } catch (error) {
    next(error);
  }
  response.redirect("/profile");
};
