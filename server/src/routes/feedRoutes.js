import express from 'express';
import { getHomeFeed, getExploreFeed } from '../controllers/feedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/home', protect, getHomeFeed);
router.get('/explore', getExploreFeed);

export default router;
