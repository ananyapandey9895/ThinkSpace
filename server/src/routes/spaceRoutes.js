import express from 'express';
import { createSpace, getAllSpaces, getSpaceById, joinSpace, leaveSpace } from '../controllers/spaceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createSpace);
router.get('/', getAllSpaces);
router.get('/:id', getSpaceById);
router.post('/:id/join', protect, joinSpace);
router.post('/:id/leave', protect, leaveSpace);

export default router;
