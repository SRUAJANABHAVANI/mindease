// controllers/journalController.js
const Journal = require('../models/Journal');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Create new journal entry
const createEntry = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;

    const journal = new Journal({
      user: req.user.userId,
      title,
      content,
      mood,
      tags,
      isPrivate
    });

    await journal.save();

    // Add journal entry to user's journalEntries array
    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { journalEntries: journal._id } }
    );

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating journal entry',
      error: error.message
    });
  }
};

// Get all journal entries for a user
const getEntries = async (req, res) => {
  try {
    const journals = await Journal.find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: journals.length,
      data: journals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching journal entries',
      error: error.message
    });
  }
};

// Get single journal entry
const getEntry = async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    res.json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching journal entry',
      error: error.message
    });
  }
};

// Update journal entry
const updateEntry = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;

    const journal = await Journal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId
      },
      {
        title,
        content,
        mood,
        tags,
        isPrivate,
        updatedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    res.json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating journal entry',
      error: error.message
    });
  }
};

// Delete journal entry
const deleteEntry = async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!journal) {
      return res.status(404).json({
        success: false,
        message: 'Journal entry not found'
      });
    }

    // Remove journal entry from user's journalEntries array
    await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { journalEntries: journal._id } }
    );

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting journal entry',
      error: error.message
    });
  }
};

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry
};
