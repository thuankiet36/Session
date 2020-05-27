// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

var port = process.env.PORT || 3000

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err) => {
  if(!err) {
    console.log("Seccess connected")
  }
  else {
    console.log("Error connecting to database")
  }
});
mongoose.set('useFindAndModify', false);

const bookManageRoute = require("./routes/book-manage.route.js");
const bookRoute = require("./routes/book.route.js");
const userRoute = require("./routes/user.route.js");
const transactionRoute = require("./routes/transaction.route.js");
const authRoute = require("./routes/auth.route.js");
const profileRoute = require("./routes/profile.route.js");
const cartRoute = require("./routes/cart.route.js");

const authMiddleware = require("./middlewares/auth.middleware.js");
const authorizationMiddleware = require("./middlewares/authorization.middleware.js");
const sessionMiddleware = require("./middlewares/session.middleware.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("./index.pug");
});

app.use(
  "/books-manage",
  authMiddleware.requireAuth,
  authorizationMiddleware.authorization,
  bookManageRoute
);
app.use("/books", bookRoute);
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use(
  "/transactions",
  authMiddleware.requireAuth,
  authorizationMiddleware.authorization,
  transactionRoute
);
app.use("/auth", authRoute);
app.use("/profile", authMiddleware.requireAuth, profileRoute);
app.use("/cart", cartRoute);

const listener = app.listen(port, () => {
  console.log("Your app is listening on port ");
});
