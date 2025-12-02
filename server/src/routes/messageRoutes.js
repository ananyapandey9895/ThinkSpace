import express from 'express';
import {
    sendMessage,
    getMessages,
    markAsRead,
    markConversationAsRead,
    deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Send a new message
router.post('/', protect, sendMessage);

// Get messages for a conversation
router.get('/:conversationId', protect, getMessages);

// Mark a message as read
router.put('/:messageId/read', protect, markAsRead);

// Mark all messages in a conversation as read
router.put('/conversation/:conversationId/read', protect, markConversationAsRead);

// Delete a message
router.delete('/:messageId', protect, deleteMessage);

export default router;
