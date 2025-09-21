const express = require('express');
const router = express.Router();  // <-- define router here

const Buyer = require('../models/Buyer'); // Your Mongoose model

router.post('/', async (req, res) => {    // <-- now 'router' is defined
  try {
    const buyerData = req.body;
    const buyer = new Buyer(buyerData);
    await buyer.save();
    res.status(201).json({ message: 'Buyer registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;  // Export router to be used in your main app
