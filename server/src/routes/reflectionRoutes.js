import express from "express";
import { createReflection } from "../controllers/reflectionController.js";

const router = express.Router();

// POST /api/reflection
router.post("/", createReflection);

export default router;

