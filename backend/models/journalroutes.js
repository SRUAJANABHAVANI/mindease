const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

router.post('/', async (req, res) => {
  const { entry } = req.body;
  const newEntry = new Journal({ entry });
  await newEntry.save();
  res.json({ message: 'Journal saved!' });
});

module.exports = router;
