// models/aiQuestionModel.js
const mongoose = require('mongoose');

const aiQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  keywords: {
    type: [String],
    default: []
  },
  triggerChatbot: {
    type: Boolean,
    default: false
  },
  commonResponses: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const AIQuestion = mongoose.model('AIQuestion', aiQuestionSchema);
module.exports = AIQuestion;
