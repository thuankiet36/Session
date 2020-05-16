const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (request, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error("File is not supported"), false);
      return;
    }

    cb(null, true);
  }
});
