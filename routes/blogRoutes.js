const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminMiddleware = require("../middleware/adminMiddleware"); 
const upload = require("../middleware/upload");
const { createBlog } = require("../controllers/blogController");

const {
  createBlog,
  getBlogs,
  getBlogById,
  likeBlog,
  addComment,
  deleteBlog
} = require("../controllers/blogController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });


router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/:id/like", likeBlog);
router.post("/:id/comment", addComment);


router.post("/", adminMiddleware, upload.single("image"), createBlog);
router.delete("/:id", adminMiddleware, deleteBlog);




router.post("/create", upload.single("image"), createBlog);

module.exports = router;
