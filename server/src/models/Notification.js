import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['like', 'comment', 'follow', 'mention'], required: true },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  read: { type: Boolean, default: false }
}, { timestamps: true });

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
