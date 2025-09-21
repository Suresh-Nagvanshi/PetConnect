const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Buyer = require('../models/Buyer');

router.post('/', async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the buyer with hashed password
    const newBuyer = new Buyer({
      ...rest,
      password: hashedPassword,
    });

    await newBuyer.save();

    res.status(201).json({ message: 'Buyer registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
