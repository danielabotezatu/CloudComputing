const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3006;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  description: String,
  image: String,
  username: String,
});

const Post = mongoose.model("Post", postSchema);

// API endpoints
app.post("/posts", async (req, res) => {
  try {
    const { description, image, username } = req.body;
    const newPost = new Post({ description, image, username });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    await Post.findByIdAndDelete(postId);
    res.json({ message: "{Post} deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Post microservice is running on port ${PORT}`);
});
