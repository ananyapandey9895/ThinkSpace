import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    senderId: {
        type: String, // Clerk user ID
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'file'],
        default: 'text'
    },
    readBy: [{
        userId: String,
        seenAt: { type: Date, default: Date.now }
    }],
    attachments: [{
        url: String,
        type: { type: String, enum: ['image', 'video', 'audio', 'file'] }
    }],
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index for faster queries
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });

export default mongoose.model('Message', messageSchema);
