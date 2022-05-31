import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  any: mongoose.Mixed,
});

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema, "posts");
