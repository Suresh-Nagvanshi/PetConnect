// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Mongoose model

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Server-side validation
  if (!name || !email || !subject || !message)
    return res.status(400).json({ success: false, error: 'All fields required' });

  // Extra format checks can be added here for email, etc.

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

module.exports = router;
