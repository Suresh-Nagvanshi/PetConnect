const express = require('express');
const router = express.Router();
const Vet = require('../models/Vet');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      clinicName,
      houseNumber,
      city,
      pincode,
      district,
      state,
      qualifications,
      licenseNumber,
      yearsExperience,
      agreedToTerms,
    } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVet = new Vet({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      clinicName,
      houseNumber,
      city,
      pincode,
      district,
      state,
      qualifications,
      licenseNumber,
      yearsExperience,
      agreedToTerms,
    });

    await newVet.save();
    res.status(201).json({ message: 'Vet registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
