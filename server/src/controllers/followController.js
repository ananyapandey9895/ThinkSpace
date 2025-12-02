import Follow from '../models/Follow.js';
import { createNotification } from './notificationController.js';

export const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.userId;

    if (followerId === userId) {
      return res.status(400).json({ message: 'Cannot follow yourself' });
    }

    const existing = await Follow.findOne({ followerId, followingId: userId });
    
    if (existing) {
      await existing.deleteOne();
      return res.json({ following: false });
    }

    await Follow.create({ followerId, followingId: userId });
    await createNotification(userId, 'follow', followerId);
    res.json({ following: true });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling follow', error: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follow.find({ followingId: userId })
      .populate('followerId', 'name handle image')
      .sort({ createdAt: -1 });
    res.json(followers.map(f => f.followerId));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching followers', error: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await Follow.find({ followerId: userId })
      .populate('followingId', 'name handle image')
      .sort({ createdAt: -1 });
    res.json(following.map(f => f.followingId));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching following', error: error.message });
  }
};

export const checkFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.userId;
    const follow = await Follow.findOne({ followerId, followingId: userId });
    res.json({ following: !!follow });
  } catch (error) {
    res.status(500).json({ message: 'Error checking follow', error: error.message });
  }
};
