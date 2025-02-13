const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  mediaType: { type: String, enum: ["image", "video"], required: true },
  uploadedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
});

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
