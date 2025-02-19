const express = require("express");
const multer = require("multer");
const { uploadMedia, getMediaList } = require("../controllers/media");
const path = require("path");
const fs = require("fs");
const { put } = require("@vercel/blob");

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
// router.post("/upload", upload.single("media"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Upload to Vercel Blob
//     const blob = await put(`uploads/${Date.now()}-${req.file.originalname}`, req.file.buffer, {
//       access: "public",
//     });

//     res.status(200).json({ url: blob.url });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });
router.get("/list", getMediaList);

module.exports = router;
