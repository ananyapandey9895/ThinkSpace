import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required"],
    ref: "User"
  },
  text: {
    type: String,
    required: [true, "Text is required"]
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Reflection = mongoose.model("Reflection", reflectionSchema);

export default Reflection;

