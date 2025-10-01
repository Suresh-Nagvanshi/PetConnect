const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Pet = require('../models/Pet');

// POST: create a new booking
router.post('/', async (req, res) => {
  try {
    const { petId, buyerId } = req.body;

    // Check if pet is already booked
    const existingBooking = await Booking.findOne({
      pet: petId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Pet is already booked or pending booking' });
    }

    // Create new booking
    const booking = new Booking({
      pet: petId,
      buyer: buyerId
    });
    await booking.save();

    // Update pet status to 'pending'
    await Pet.findByIdAndUpdate(petId, { status: 'pending' });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET: get bookings for seller's pets
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const { sellerId } = req.params;

    const bookings = await Booking.find()
      .populate({
        path: 'pet',
        match: { seller: sellerId },
        populate: { path: 'seller', select: 'firstName lastName phoneNumber' }
      })
      .populate('buyer', 'firstName lastName email phoneNumber');

    // Remove bookings with no pet (non seller's pets)
    const filtered = bookings.filter(b => b.pet != null);

    res.json(filtered);
  } catch (err) {
    console.error('Failed to fetch seller bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PATCH: update booking and pet status
router.patch('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body; // accepted, declined

    const booking = await Booking.findById(bookingId).populate('pet');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = status;
    await booking.save();

    if (status === 'accepted') {
      booking.pet.status = 'sold';
    } else if (status === 'declined') {
      booking.pet.status = 'available';
    }
    await booking.pet.save();

    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    console.error('Failed to update booking:', err);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

module.exports = router;
