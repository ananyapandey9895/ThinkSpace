import express from 'express';
import { toggleFollow, getFollowers, getFollowing, checkFollow } from '../controllers/followController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:userId', protect, toggleFollow);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);
router.get('/:userId/check', protect, checkFollow);

export default router;
