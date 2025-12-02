import User from '../models/User.js';
import Post from '../models/Post.js';
import Follow from '../models/Follow.js';

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postCount = await Post.countDocuments({ user: userId });
    const followerCount = await Follow.countDocuments({ followingId: userId });
    const followingCount = await Follow.countDocuments({ followerId: userId });

    res.json({
      ...user.toObject(),
      postCount,
      followerCount,
      followingCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, bio, image } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (image) user.image = image;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .populate('user', 'name handle image')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { handle: { $regex: query, $options: 'i' } }
      ]
    })
      .select('name handle image bio')
      .limit(20);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
};

export const getProfileByHandle = async (req, res) => {
  try {
    const { handle } = req.params;
    const user = await User.findOne({ handle }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postCount = await Post.countDocuments({ user: user._id });
    const followerCount = await Follow.countDocuments({ followingId: user._id });
    const followingCount = await Follow.countDocuments({ followerId: user._id });

    res.json({
      ...user.toObject(),
      postCount,
      followerCount,
      followingCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};
