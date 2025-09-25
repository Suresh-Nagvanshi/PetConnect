require('dotenv').config();
const express = require('express');
// No need for: const fetch = require('node-fetch');

const router = express.Router();

router.get('/', async (req, res) => {
  const address = req.query.address;
  if (!address) return res.status(400).json({ error: 'Address is required' });

  const apiKey = process.env.LOCATIONIQ_API_KEY;
  const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

  try {
    const response = await fetch(url); // Now fetch() uses Node's built-in
    const data = await response.json();
    if (data.length > 0) {
      res.json({
        latitude: data[0].lat,
        longitude: data[0].lon,
        formatted_address: data[0].display_name,
      });
    } else {
      res.status(404).json({ error: 'No location found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

module.exports = router;
