import express from 'express';
import {
    getConversations,
    getConversation,
    createConversation,
    deleteConversation
} from '../controllers/conversationController.js';

const router = express.Router();

// Get all conversations for a user
router.get('/', getConversations);

// Get a specific conversation
router.get('/:id', getConversation);

// Create a new conversation
router.post('/', createConversation);

// Delete a conversation
router.delete('/:id', deleteConversation);

export default router;
