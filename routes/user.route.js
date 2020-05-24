const express = require("express");

const controller = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/edit-user/:userId", controller.edit);

router.post("/edit-user/:userId", controller.postEdit);

module.exports = router;
