const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private
router.post('/', protect, async (req, res) => {
  const { company, position, duration, description, highlights } = req.body;

  try {
    const experience = new Experience({
      company,
      position,
      duration,
      description,
      highlights,
    });

    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    await experience.deleteOne();
    res.json({ message: 'Experience removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
