import express from 'express';
import crypto from 'crypto';
import Post from '../models/Post.js';
import { protect } from '../middleware/authMiddleware.js';
import { createNotification } from '../controllers/notificationController.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a post
router.post('/create', protect, async (req, res) => {
    const { content, image, type, caption } = req.body;
    try {
        let postImage = image;
        if (!postImage && type === 'visual') {
            postImage = `https://picsum.photos/seed/${crypto.randomUUID()}/800/600`;
        }
        const newPost = new Post({ content, caption, image: postImage, user: req.userId, type });
        await newPost.save();
        const populated = await Post.findById(newPost._id).populate('user');
        res.status(201).json(populated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a post
router.put('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { content, caption, image } = req.body;
        if (content !== undefined) post.content = content;
        if (caption !== undefined) post.caption = caption;
        if (image !== undefined) post.image = image;

        await post.save();
        const updated = await Post.findById(post._id).populate('user');
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Like/Unlike a post
router.post('/:id/like', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userIndex = post.likes.indexOf(req.userId);
        if (userIndex > -1) {
            post.likes.splice(userIndex, 1);
        } else {
            post.likes.push(req.userId);
            await createNotification(post.user.toString(), 'like', req.userId, post._id);
        }

        await post.save();
        res.json({ likes: post.likes.length, liked: userIndex === -1 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Legacy spark endpoint (for backward compatibility)
router.post('/:id/spark', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userIndex = post.likes.indexOf(req.userId);
        if (userIndex === -1) {
            post.likes.push(req.userId);
        }

        await post.save();
        res.json({ stats: { likes: post.likes.length } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Track view
router.post('/:id/view', async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Track share
router.post('/:id/share', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { shares: 1 } },
            { new: true }
        );
        res.json({ shares: post.shares });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search posts by tag
router.get('/search/tags', async (req, res) => {
    try {
        const { tag } = req.query;
        const posts = await Post.find({ tags: tag }).populate('user').sort({ createdAt: -1 });
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get trending posts
router.get('/trending/posts', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user')
            .sort({ views: -1, likes: -1 })
            .limit(20);
        res.json({ posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
