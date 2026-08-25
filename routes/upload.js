const express = require("express");
const router = express.Router();
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cp) => {
    cp(null, path.join(__dirname, "../public"));
  },
  filename: (req, file, cp) => {
    cp(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({ message: " image uploaded successefully" });
});

module.exports = router;
