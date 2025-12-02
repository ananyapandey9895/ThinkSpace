import express from "express";
import {
  createNote,
  getNotesByUser,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/notes
router.post("/", protect, createNote);

// GET /api/notes/single/:id (must come before /:userId to avoid route conflicts)
router.get("/single/:id", getNoteById);

// GET /api/notes/:userId
router.get("/:userId", getNotesByUser);

// PUT /api/notes/:id
router.put("/:id", protect, updateNote);

// DELETE /api/notes/:id
router.delete("/:id", protect, deleteNote);

export default router;

