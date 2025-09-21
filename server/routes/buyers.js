const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');

router.post('/', async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).json({ message: 'Buyer registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
