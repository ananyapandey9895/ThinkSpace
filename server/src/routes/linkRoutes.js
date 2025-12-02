import express from "express";
import {
  updateLinksForNote,
  getBacklinks
} from "../controllers/linkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/links/updateLinksForNote
router.post("/updateLinksForNote", protect, updateLinksForNote);

// GET /api/links/backlinks/:noteId
router.get("/backlinks/:noteId", getBacklinks);

export default router;

