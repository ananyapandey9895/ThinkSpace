import express from 'express';
import {
    sendMessage,
    getMessages,
    markAsRead,
    markConversationAsRead,
    deleteMessage
} from '../controllers/messageController.js';
import { setTyping, getTyping } from '../controllers/typingController.js';
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

// Typing indicator
router.post('/typing', protect, setTyping);
router.get('/typing/:conversationId', protect, getTyping);

export default router;
