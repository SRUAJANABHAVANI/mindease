// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  processQuestion, 
  saveInteraction,
  getChatHistory
} = require('../controllers/aiController');

// AI routes
router.post('/ask', protect, processQuestion);
router.get('/history', protect, getChatHistory);

module.exports = router;
