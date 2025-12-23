const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Cloudinary file URL
    const image = req.file ? req.file.path : ""; 

    const blog = await Blog.create({ title, content, image });

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating blog" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("comments");
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("comments");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching blog" });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    blog.likes += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error liking blog" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = await Comment.create({ text: req.body.text, blogId: req.params.id });
    blog.comments.push(comment._id);
    await blog.save();

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can delete blogs" });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
