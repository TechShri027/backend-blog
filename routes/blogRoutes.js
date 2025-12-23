const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  addComment,
  deleteBlog
} = require("../controllers/blogController");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/:id/like", likeBlog);
router.post("/:id/comment", addComment);

// Admin routes
// Consolidated POST / for creation. Removed /create duplicate.
router.post("/", adminMiddleware, upload.single("image"), createBlog);
router.delete("/:id", adminMiddleware, deleteBlog);

module.exports = router;
