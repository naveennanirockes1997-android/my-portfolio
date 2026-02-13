const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  github: {
    type: String,
  },
  tags: {
    type: [String], // Array of strings
    default: [],
  },
  skills: {
    type: [String], // Array of strings
    default: [],
  },
  highlights: {
    type: [String], // Array of strings
    default: [],
  },
}, {
  timestamps: true,
});

projectSchema.index({ createdAt: -1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ title: 'text', description: 'text' }); // Text index for search

module.exports = mongoose.model('Project', projectSchema);
