const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }
});

module.exports = mongoose.model("Comment", commentSchema);
