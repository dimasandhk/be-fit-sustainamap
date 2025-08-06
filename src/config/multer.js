const path = require("path");
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: diskStorage, dest: "uploads/" });

module.exports = upload;
