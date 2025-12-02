import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: String, // Clerk user IDs
    required: true
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for faster queries
conversationSchema.index({ participants: 1 });
conversationSchema.index({ lastMessageAt: -1 });

export default mongoose.model('Conversation', conversationSchema);
