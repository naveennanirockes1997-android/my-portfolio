const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'resume-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (path.extname(file.originalname).toLowerCase() !== '.pdf') {
      return cb(new Error('Only PDFs are allowed'));
    }
    cb(null, true);
  }
});

// @desc    Get profile details
// @route   GET /api/profile
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = await Profile.create({ resumeUrl: '/resumeAsDocument.pdf' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Upload resume PDF
// @route   POST /api/profile/upload
// @access  Private
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    
    let profile = await Profile.findOne();
    if (profile) {
      profile.resumeUrl = resumeUrl;
      profile.updatedAt = Date.now();
      await profile.save();
    } else {
      profile = await Profile.create({ resumeUrl });
    }
    
    res.json({ 
      message: 'Resume uploaded successfully',
      resumeUrl: resumeUrl,
      profile 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update profile/resume URL manually
// @route   POST /api/profile
// @access  Private
router.post('/', protect, async (req, res) => {
  const { resumeUrl } = req.body;

  try {
    let profile = await Profile.findOne();
    if (profile) {
      profile.resumeUrl = resumeUrl;
      profile.updatedAt = Date.now();
      await profile.save();
    } else {
      profile = await Profile.create({ resumeUrl });
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
