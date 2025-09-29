const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const Vet = require('../models/Vet');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  console.log(`Login attempt for role: ${role}, email: ${email}`);

  try {
    let user;

    if (role === 'buyer') {
      user = await Buyer.findOne({ email });
    } else if (role === 'seller') {
      user = await Seller.findOne({ email });
    } else if (role === 'veterinarian') {
      user = await Vet.findOne({ email });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Authentication successful; optionally create session or JWT token here.

    res.json({ message: 'Login successful', role, userId: user._id, firstName: user.firstName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
