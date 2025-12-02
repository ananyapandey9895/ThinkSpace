import express from 'express';
import {
    sendMessage,
    getMessages,
    markAsRead,
    markConversationAsRead,
    deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

// Send a new message
router.post('/', sendMessage);

// Get messages for a conversation
router.get('/:conversationId', getMessages);

// Mark a message as read
router.put('/:messageId/read', markAsRead);

// Mark all messages in a conversation as read
router.put('/conversation/:conversationId/read', markConversationAsRead);

// Delete a message
router.delete('/:messageId', deleteMessage);

export default router;
