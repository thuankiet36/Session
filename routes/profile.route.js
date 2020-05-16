const express = require("express");

const controller = require("../controllers/profile.controller.js");

const router = express.Router();

const upload = require("../utils/multer.js");

router.get("/", controller.index);

router.get("/avatar", controller.avatar);

router.post("/avatar", upload.single('avatar'), controller.postAvatar);

module.exports = router;
