import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// Get all conversations for a user
export const getConversations = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const conversations = await Conversation.find({
            participants: userId
        })
            .populate('lastMessage')
            .sort({ lastMessageAt: -1 });

        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

// Get a specific conversation
export const getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const conversation = await Conversation.findById(id);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Check if user is a participant
        if (!conversation.participants.includes(userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json(conversation);
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
};

// Create a new conversation
export const createConversation = async (req, res) => {
    try {
        const { participants } = req.body;

        if (!participants || participants.length < 2) {
            return res.status(400).json({ error: 'At least 2 participants are required' });
        }

        // Check if conversation already exists between these participants
        const existingConversation = await Conversation.findOne({
            participants: { $all: participants, $size: participants.length }
        });

        if (existingConversation) {
            return res.json(existingConversation);
        }

        // Create new conversation
        const conversation = new Conversation({
            participants,
            lastMessageAt: new Date()
        });

        await conversation.save();
        res.status(201).json(conversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ error: 'Failed to create conversation' });
    }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const conversation = await Conversation.findById(id);

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Check if user is a participant
        if (!conversation.participants.includes(userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Delete all messages in the conversation
        await Message.deleteMany({ conversationId: id });

        // Delete the conversation
        await Conversation.findByIdAndDelete(id);

        res.json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
};
