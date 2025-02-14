const express = require("express");
const multer = require("multer");
const { uploadMedia, getMediaList } = require("../controllers/media");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Determine Upload Directory Based on Environment
const uploadDir = process.env.NODE_ENV === "production" ? "/tmp/uploads" : path.join(__dirname, "../uploads");

// Ensure Upload Directory Exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Upload directory created at: ${uploadDir}`);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


// File Upload Middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "video/mp4"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

router.post("/upload", upload.single("media"), uploadMedia);
router.get("/list", getMediaList);

module.exports = router;
