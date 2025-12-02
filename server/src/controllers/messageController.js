import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const { conversationId, senderId, content, type = 'text', attachments = [] } = req.body;

        if (!conversationId || !senderId || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (!conversation.participants.includes(senderId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const message = new Message({
            conversationId,
            senderId,
            content,
            type,
            attachments,
            readBy: [{ userId: senderId, seenAt: new Date() }]
        });

        await message.save();

        conversation.lastMessage = message._id;
        conversation.lastMessageAt = message.createdAt;
        await conversation.save();

        res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Get messages for a conversation
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { userId, limit = 50, before } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Verify conversation exists and user is a participant
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (!conversation.participants.includes(userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Build query
        const query = {
            conversationId,
            deleted: false
        };

        if (before) {
            query.createdAt = { $lt: new Date(before) };
        }

        // Fetch messages
        const messages = await Message.find(query)
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json(messages.reverse()); // Return in chronological order
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Mark message as read
export const markAsRead = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        const alreadyRead = message.readBy.some(r => r.userId === userId);
        if (!alreadyRead) {
            message.readBy.push({ userId, seenAt: new Date() });
            await message.save();
        }

        res.json(message);
    } catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: 'Failed to mark message as read' });
    }
};

// Mark all messages in a conversation as read
export const markConversationAsRead = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Verify conversation exists and user is a participant
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        if (!conversation.participants.includes(userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const messages = await Message.find({
            conversationId,
            deleted: false,
            'readBy.userId': { $ne: userId }
        });

        for (const msg of messages) {
            msg.readBy.push({ userId, seenAt: new Date() });
            await msg.save();
        }

        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error('Error marking conversation as read:', error);
        res.status(500).json({ error: 'Failed to mark conversation as read' });
    }
};

// Delete a message (soft delete)
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Only sender can delete their message
        if (message.senderId !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }

        message.deleted = true;
        await message.save();

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
};
