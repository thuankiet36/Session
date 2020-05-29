const express = require("express");

const controller = require("../controllers/shop.controller.js");

const router = express.Router();

const upload = require("../utils/multer.js");

router.get("/create", controller.create);
router.post("/create", upload.single("cover"), controller.postCreate);

router.get("/edit-book/:bookId", controller.edit);
router.post("/edit-book/:bookId", upload.single("cover"), controller.postEdit);

router.get("/:bookId/delete", controller.delete)

module.exports = router;
