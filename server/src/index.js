import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reflectionRoutes from "./routes/reflectionRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/commentRoutes.js";
import spaceRoutes from "./routes/spaceRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("🚀 ThinkSpace backend is running successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reflection", reflectionRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", commentRoutes);
app.use("/api/spaces", spaceRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);


const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected to ThinkSpace");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    if (error.message.includes("not defined")) {
      console.error("   Please make sure MONGO_URI is set in your .env file");
    } else if (error.message.includes("authentication")) {
      console.error("   Authentication failed. Check your MongoDB credentials.");
    } else if (error.message.includes("timeout") || error.message.includes("ECONNREFUSED")) {
      console.error("   Could not reach MongoDB server. Check your connection string and network.");
    } else {
      console.error("   Error details:", error);
    }
    process.exit(1);
  }
};

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
