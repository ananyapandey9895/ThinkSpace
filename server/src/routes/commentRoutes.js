import express from 'express';
import { createComment, getCommentsForPost, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:postId/comments', protect, createComment);
router.get('/:postId/comments', getCommentsForPost);
router.delete('/comments/:id', protect, deleteComment);

export default router;
