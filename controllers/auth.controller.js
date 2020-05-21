const shortId = require("shortid");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const saltRounds = 10;

const db = require("../db.js");

// login
module.exports.login = (request, response) => {
  response.render("./auth/auth.pug");
};

// module.exports.postLogin = async (request, response, next) => {
//   var email = request.body.email;
//   var user = db.get("users").find({ email: email }).value();
//   var count = user.wrongLoginCount;

//   if (!user) {
//     response.render("./auth/auth.pug", {
//       errors: ["User does not exist"],
//       values: request.body,
//     });
//     return;
//   }

//   if (await bcrypt.compare(request.body.password, user.password)) {
//     response.cookie("userId", user.id, { signed: true });
//     if (user.isAdmin === false) {
//       response.redirect("/users");
//     }
//     response.redirect("/transactions");
//   } else {
//     if (count < 3) {
//       response.render("./auth/auth.pug", {
//         errors: ["Wrong password"],
//         values: request.body,
//       });
//       count += 1;
//       db.get("users")
//         .find({ email: email })
//         .assign({ wrongLoginCount: count })
//         .write();
//     }
//     if (count === 3) {
//       response.send("Your account is currently locked");
//       response.locals.user = user;
//       next();
//     }
//   }
// };

module.exports.postLogin = async (request, response, next) => {
  var email = request.body.email;
  var user = await User.findOne({ email: email });
  var count = user.wrongLoginCount;

  if (!user) {
    response.render("./auth/auth.pug", {
      errors: ["User does not exist"],
      values: request.body,
    });
    return;
  }

  if (await bcrypt.compare(request.body.password, user.password)) {
    response.cookie("userId", user._id, { signed: true });
    if (user.isAdmin === false) {
      response.redirect("/users");
    }
    response.redirect("/transactions");
  } else {
    if (count < 3) {
      response.render("./auth/auth.pug", {
        errors: ["Wrong password"],
        values: request.body,
      });
      count += 1;
      var user = await User.findOne({ email: email });
      user.wrongLoginCount = count;
      try {
        user = await user.save();
        console.log(user.wrongLoginCount);
      } catch (e) {
        next(e);
      }
    }
    if (count === 3) {
      response.send("Your account is currently locked");
    }
  }
};

// create user
module.exports.create = (request, response) => {
  response.render("./auth/create.auth.pug");
};

// module.exports.postCreate = async (request, response) => {
//   var id = shortId.generate();
//   var hashedPassword = await bcrypt.hash(request.body.password, saltRounds);
//   db.get("users")
//     .push({
//       id: id,
//       userName: request.body.userName,
//       email: request.body.email,
//       password: hashedPassword,
//       isAdmin: false,
//       wrongLoginCount: 0,
//       avatarUrl:
//         "http://res.cloudinary.com/dkoligyxo/image/upload/v1589434822/smyq494puvjutiykegik.jpg",
//       books: [],
//     })
//     .write();

//   response.redirect("/auth/login");
// };

module.exports.postCreate = async (request, response) => {
  var hashedPassword = await bcrypt.hash(request.body.password, saltRounds);
  var user = new User({
    userName: request.body.userName,
    email: request.body.email,
    password: hashedPassword,
    isAdmin: false,
    wrongLoginCount: 0,
    avatarUrl:
      "http://res.cloudinary.com/dkoligyxo/image/upload/v1589434822/smyq494puvjutiykegik.jpg",
    books: [],
  });
  try {
    user = await user.save();
    response.redirect("/auth/login");
  } catch (e) {
    next(e);
  }
};
