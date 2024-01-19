// likesService.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3009;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const likeSchema = new mongoose.Schema({
  userId: String,
  postId: String,
  liked: Boolean,
});

const Like = mongoose.model("Like", likeSchema);

app.post("/likes", async (req, res) => {
  try {
    const { userId, postId, liked } = req.body;
    console.log({ userId, postId, liked });
    const existingLike = await Like.findOne({ userId, postId });

    if (existingLike) {
      existingLike.liked = liked;
      await existingLike.save();
      res.json(existingLike);
    } else {
      const newLike = new Like({ userId, postId, liked });
      await newLike.save();
      res.json(newLike);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/likes/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const likes = await Like.find({ postId });
    res.json({ likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/likes/:userId/:postId", async (req, res) => {
  try {
    const { userId, postId } = req.params;
    await Like.deleteOne({ userId, postId });
    res.json({ message: "Successfully disliked the post." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Likes microservice is running on port ${PORT}`);
});
