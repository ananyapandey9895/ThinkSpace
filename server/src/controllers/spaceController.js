import Space from '../models/Space.js';

export const createSpace = async (req, res) => {
  try {
    const { name, icon, colorTheme } = req.body;
    const space = await Space.create({
      name,
      icon,
      colorTheme,
      members: [req.userId]
    });
    res.status(201).json(space);
  } catch (error) {
    res.status(500).json({ message: 'Error creating space', error: error.message });
  }
};

export const getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.find().populate('members', 'name handle image');
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching spaces', error: error.message });
  }
};

export const getSpaceById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id).populate('members', 'name handle image');
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.json(space);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching space', error: error.message });
  }
};

export const joinSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    if (space.members.includes(req.userId)) {
      return res.status(400).json({ message: 'Already a member' });
    }

    space.members.push(req.userId);
    await space.save();
    res.json({ message: 'Joined space', space });
  } catch (error) {
    res.status(500).json({ message: 'Error joining space', error: error.message });
  }
};

export const leaveSpace = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ message: 'Space not found' });
    }

    space.members = space.members.filter(id => id.toString() !== req.userId);
    await space.save();
    res.json({ message: 'Left space', space });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving space', error: error.message });
  }
};
