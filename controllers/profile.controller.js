const shortId = require("shortid");

const db = require("../db.js");
const cloudinary = require("cloudinary");

require("../utils/cloudinary");

module.exports.index = (request, response) => {
  response.render("./profile/index.pug");
};

module.exports.avatar = (request, response) => {
  response.render("./profile/avatar.pug", {
    users: db.get("users").value()
  });
};

module.exports.postAvatar = async (request, response, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(request.file.path);
    const url = result.url;
    const user = response.locals.user;
    db.get("users")
      .find({ id: user.id })
      .assign({ avatarUrl: url })
      .write();
    response.redirect("/profile");
  } catch (error) {
    next(error);
  }
};
