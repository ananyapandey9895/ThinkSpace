import Post from '../models/Post.js';
import Follow from '../models/Follow.js';
import Space from '../models/Space.js';

export const getHomeFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const following = await Follow.find({ followerId: userId }).select('followingId');
    const followingIds = following.map(f => f.followingId);
    
    const joinedSpaces = await Space.find({ members: userId }).select('_id');
    const spaceIds = joinedSpaces.map(s => s._id);

    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    const posts = await Post.find({
      $or: [
        { user: { $in: followingIds } },
        { createdAt: { $gte: twoDaysAgo }, likes: { $exists: true, $not: { $size: 0 } } }
      ]
    })
      .populate('user', 'name handle image')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed', error: error.message });
  }
};

export const getExploreFeed = async (req, res) => {
  try {
    const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

    const posts = await Post.find({ createdAt: { $gte: threeDaysAgo } })
      .populate('user', 'name handle image')
      .sort({ likes: -1, views: -1 })
      .limit(50);

    const spaces = await Space.find().sort({ members: -1 }).limit(10);

    res.json({ posts, spaces });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching explore feed', error: error.message });
  }
};
