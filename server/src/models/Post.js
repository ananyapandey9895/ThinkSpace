import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    caption: { type: String },
    image: { type: String },
    media: [{ url: String, type: { type: String, enum: ['image', 'video'] } }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    category: { type: String },
    type: { type: String, enum: ['thought', 'visual'], default: 'thought' },
    tags: [String],
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.index({ tags: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ views: -1 });

export default mongoose.model('Post', postSchema);
