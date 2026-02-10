const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlights: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Experience', experienceSchema);
