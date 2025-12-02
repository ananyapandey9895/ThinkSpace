const typingUsers = new Map();

export const setTyping = async (req, res) => {
  try {
    const { conversationId, userId, isTyping } = req.body;

    if (!conversationId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const key = `${conversationId}:${userId}`;
    
    if (isTyping) {
      typingUsers.set(key, Date.now());
      setTimeout(() => typingUsers.delete(key), 5000);
    } else {
      typingUsers.delete(key);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update typing status' });
  }
};

export const getTyping = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const typing = [];
    
    for (const [key, timestamp] of typingUsers.entries()) {
      if (key.startsWith(conversationId) && Date.now() - timestamp < 5000) {
        typing.push(key.split(':')[1]);
      }
    }

    res.json({ typing });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get typing status' });
  }
};
