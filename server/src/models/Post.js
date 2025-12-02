import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String },
    caption: { type: String },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    category: { type: String },
    type: { type: String, enum: ['thought', 'visual'], default: 'thought' }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
