const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware"); 
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // your cloudinary config

const { createBlog, getBlogs, getBlogById, likeBlog, addComment, deleteBlog } = require("../controllers/blogController");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage });

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/:id/like", likeBlog);
router.post("/:id/comment", addComment);

// Admin routes
router.post("/", adminMiddleware, upload.single("image"), createBlog);
router.delete("/:id", adminMiddleware, deleteBlog);

module.exports = router;
