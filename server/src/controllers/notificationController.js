import Notification from '../models/Notification.js';

export const createNotification = async (userId, type, actorId, postId = null, commentId = null) => {
  if (userId === actorId) return;
  await Notification.create({ userId, type, actorId, postId, commentId });
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const { unreadOnly } = req.query;
    
    const query = { userId };
    if (unreadOnly === 'true') query.read = false;

    const notifications = await Notification.find(query)
      .populate('actorId', 'name handle image')
      .populate('postId', 'content')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notification', error: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    await Notification.updateMany({ userId, read: false }, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notifications', error: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await Notification.countDocuments({ userId, read: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error getting count', error: error.message });
  }
};
