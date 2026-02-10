const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const { protect } = require('../middleware/auth');

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a certification
// @route   POST /api/certifications
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, issuer, date, link, image } = req.body;

  try {
    const certification = new Certification({
      title,
      issuer,
      date,
      link,
      image,
    });

    const createdCertification = await certification.save();
    res.status(201).json(createdCertification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a certification
// @route   DELETE /api/certifications/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });

    await certification.deleteOne();
    res.json({ message: 'Certification removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
