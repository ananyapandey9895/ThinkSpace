import express from "express";

const router = express.Router();

// Health/test endpoint
router.get("/test", (req, res) => {
  res.send("✅ User routes are working fine!");
});

export default router;

