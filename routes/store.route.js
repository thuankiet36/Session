const express = require("express");

const controller = require("../controllers/shop.controller.js");

const router = express.Router();

router.get("/:userId/books", controller.index)

module.exports = router;