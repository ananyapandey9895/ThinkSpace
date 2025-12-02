import express from "express";
import { getUserProfile, updateUserProfile, getUserPosts, searchUsers, getProfileByHandle } from "../controllers/userProfileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("✅ User routes are working fine!");
});

router.get("/search", searchUsers);
router.get("/profile/handle/:handle", getProfileByHandle);
router.get("/profile/:userId", getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/:userId/posts", getUserPosts);

export default router;

