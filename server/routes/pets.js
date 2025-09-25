const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const upload = require('../middleware/upload');
const path = require('path');

// Serve uploads statically (in your main app.js or index.js, do once)
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// POST: add a new pet with images
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { seller, animalType, breed, petName, petAge, shortDescription, longDescription } = req.body;
    // Save relative image paths (no server prefix)
    const imagePaths = req.files ? req.files.map(file => `pets/${file.filename}`) : [];

    const newPet = new Pet({
      seller,
      animalType,
      breed,
      petName,
      petAge,
      shortDescription,
      longDescription,
      imageUrls: imagePaths,
      status: 'available'
    });

    await newPet.save();

    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ error: 'Failed to add pet' });
  }
});

// GET: get pets (filter by seller optional)
router.get('/', async (req, res) => {
  try {
    const filter = { status: { $ne: 'sold' } };
    if (req.query.seller) {
      filter.seller = req.query.seller;
    }
    const pets = await Pet.find(filter).populate('seller', 'firstName lastName city state longitude latitude');
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

module.exports = router;
