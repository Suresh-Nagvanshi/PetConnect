const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const upload = require('../middleware/upload');

// POST: add a new pet with images
router.post('/', upload.array('images', 5), async (req, res) => {
  try {

    
    console.log('Received files:', req.files);
    const { seller, animalType, breed, petName, petAge, shortDescription, longDescription } = req.body;

    // Map uploaded files to relative paths for DB storage
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

    console.log('New pet added:', newPet);

    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    console.error('Error adding pet:', error);
    res.status(500).json({ error: 'Failed to add pet' });
  }
});

// GET: get pets (optional filter by seller)
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
