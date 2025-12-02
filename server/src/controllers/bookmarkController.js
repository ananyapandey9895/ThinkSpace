import Bookmark from '../models/Bookmark.js';
import Post from '../models/Post.js';

export const toggleBookmark = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existing = await Bookmark.findOne({ userId, postId });
    
    if (existing) {
      await existing.deleteOne();
      return res.json({ bookmarked: false, message: 'Bookmark removed' });
    }

    await Bookmark.create({ userId, postId });
    res.json({ bookmarked: true, message: 'Post bookmarked' });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling bookmark', error: error.message });
  }
};

export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.userId;
    const bookmarks = await Bookmark.find({ userId })
      .populate({
        path: 'postId',
        populate: { path: 'user', select: 'name handle image' }
      })
      .sort({ createdAt: -1 });

    const posts = bookmarks.map(b => b.postId).filter(p => p);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
  }
};

export const checkBookmark = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    const bookmark = await Bookmark.findOne({ userId, postId });
    res.json({ bookmarked: !!bookmark });
  } catch (error) {
    res.status(500).json({ message: 'Error checking bookmark', error: error.message });
  }
};
