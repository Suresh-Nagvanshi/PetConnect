const express = require('express');
const router = express.Router();
const Feedback = require('../models/ShowFeedback');

router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

module.exports = router;
