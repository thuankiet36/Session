const express = require("express");

const controller = require("../controllers/book-manage.controller.js");

const router = express.Router();

const upload = require("../utils/multer.js");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.single("cover"), controller.postCreate);

router.get("/edit-form/:id", controller.edit);

router.post("/edit/:id", upload.single("cover"), controller.postEdit);

router.get("/:id/delete", controller.delete);

module.exports = router;
