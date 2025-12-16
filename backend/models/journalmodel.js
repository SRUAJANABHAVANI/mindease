// models/journalModel.js
const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'excited', 'anxious', 'other'],
    default: 'neutral'
  },
  tags: {
    type: [String],
    default: []
  },
  isPrivate: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;