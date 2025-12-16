const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  counselor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 60, // duration in minutes
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['video', 'chat', 'in-person'],
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  concerns: [{
    type: String,
    trim: true
  }],
  followUp: {
    required: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying
appointmentSchema.index({ student: 1, date: 1 });
appointmentSchema.index({ counselor: 1, date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema); 