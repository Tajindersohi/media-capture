const Media = require("../../models/media");

exports.uploadMedia = async (req, res) => {
  try {
    const { title, media } = req.body; 

    let mediaUrl;
    let mediaType;

    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`;
      mediaType = req.file.mimetype.startsWith("image") ? "image" : "video";
    } else if (media) {
      mediaUrl = media;
      mediaType = media.endsWith(".mp4") ? "video" : "image";
    } else {
      return res.status(400).json({ success: false, message: "No file or media URL provided" });
    }
    const userId = req.user.id; // Assuming you're getting the user from authentication middleware
    const newMedia = new Media({ title, mediaUrl, mediaType,userId });
    await newMedia.save();

    res.status(201).json({ success: true, media: newMedia });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Media List
exports.getMediaList = async (req, res) => {
    try {
      const userId = req.user.id;
      const mediaList = await Media.find({userId:userId});
      if (mediaList.length === 0) {
        return res.status(200).json({ success: true, message: "No media found" });
      }
      res.status(200).json({ success: true, data: mediaList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
