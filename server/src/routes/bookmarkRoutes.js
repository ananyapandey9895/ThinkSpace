import express from 'express';
import { toggleBookmark, getUserBookmarks, checkBookmark } from '../controllers/bookmarkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:postId', protect, toggleBookmark);
router.get('/', protect, getUserBookmarks);
router.get('/:postId/check', protect, checkBookmark);

export default router;
