const express = require('express');
const Vet = require('../models/Vet');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const vet = new Vet(req.body);
    await vet.save();
    res.status(201).json({ message: 'Vet registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
