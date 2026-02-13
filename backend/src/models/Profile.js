const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    required: true,
    default: '/resumeAsDocument.pdf'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
