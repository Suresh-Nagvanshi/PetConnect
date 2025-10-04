const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const upload = require('../middleware/upload');

// POST: add a new pet with images
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { seller, animalType, breed, petName, petAge, shortDescription, longDescription } = req.body;
    const imageUrls = req.files ? req.files.map(file => `pets/${file.filename}`) : [];
    const newPet = new Pet({
      seller,
      animalType,
      breed,
      petName,
      petAge,
      shortDescription,
      longDescription,
      imageUrls,
      status: 'available'
    });
    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add pet' });
  }
});

// GET: get pets (optional filter by seller), including sold pets
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.seller) filter.seller = req.query.seller;
    const pets = await Pet.find(filter).populate(
      'seller',
      'firstName lastName city state longitude latitude phone email'
    );
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pets' });
  }
});

module.exports = router;
