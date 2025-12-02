import express from 'express';
import {
    getConversations,
    getConversation,
    createConversation,
    deleteConversation
} from '../controllers/conversationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all conversations for a user
router.get('/', protect, getConversations);

// Get a specific conversation
router.get('/:id', protect, getConversation);

// Create a new conversation
router.post('/', protect, createConversation);

// Delete a conversation
router.delete('/:id', protect, deleteConversation);

export default router;
