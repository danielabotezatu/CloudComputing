const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3005;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const commentSchema = new mongoose.Schema({
  postId: String,
  text: String,
  username: String,
});

const Comment = mongoose.model("Comment", commentSchema);

app.post("/comments", async (req, res) => {
  try {
    const { postId, text, username } = req.body;
    const newComment = new Comment({ postId, text, username });
    await newComment.save();
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/comments/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/comments/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);

    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Comment microservice is running on port ${PORT}`);
});
