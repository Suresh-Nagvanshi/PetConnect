const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');

// For security, use bcrypt to hash passwords before saving
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const sellerData = {
      ...rest,
      password: hashedPassword,
    };

    const seller = new Seller(sellerData);
    await seller.save();

    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
