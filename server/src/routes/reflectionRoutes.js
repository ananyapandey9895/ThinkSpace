import express from "express";
import { createReflection, getReflections } from "../controllers/reflectionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/reflection/:userId
router.get("/:userId", getReflections);

// POST /api/reflection
router.post("/", protect, createReflection);

export default router;

