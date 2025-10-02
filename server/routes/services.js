const express = require('express');
const path = require('path');
const VetService = require('../models/VetService');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Received service creation POST body:', req.body);

    let imageUrl;
    if (req.file) {
      const filePath = req.file.path.replace(/\\/g, '/');
      const uploadIndex = filePath.indexOf('uploads/');
      imageUrl = uploadIndex !== -1 ? filePath.substring(uploadIndex) : filePath;
    }

    console.log('About to create VetService with vetId:', req.body.vetId);

    const service = new VetService({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      description: req.body.description,
      discount: req.body.discount,
      imageUrl,
      vetId: req.body.vetId,
    });

    console.log('Created new service object:', service);

    await service.save();
    res.status(201).json(service);

  } catch (err) {
    console.error('Service creation error:', err);
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const services = await VetService.find().populate('vetId');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const service = await VetService.findById(req.params.id).populate('vetId');
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      duration: req.body.duration,
      description: req.body.description,
      discount: req.body.discount,
      vetId: req.body.vetId,
    };

    if (req.file) {
      const filePath = req.file.path.replace(/\\/g, '/');
      const uploadIndex = filePath.indexOf('uploads/');
      updateData.imageUrl = uploadIndex !== -1 ? filePath.substring(uploadIndex) : filePath;
    }

    const updatedService = await VetService.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('vetId');
    if (!updatedService) return res.status(404).json({ error: 'Service not found' });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedService = await VetService.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted', deleted: deletedService });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
