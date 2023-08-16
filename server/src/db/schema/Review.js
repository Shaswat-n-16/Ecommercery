import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Review = mongoose.model("Review", ReviewSchemaSchema);
