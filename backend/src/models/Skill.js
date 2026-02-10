const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Tools', 'Other'],
  },
  icon: {
    type: String, // Icon name from lucide-react if needed, or simple string
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Skill', skillSchema);
