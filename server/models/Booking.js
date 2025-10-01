// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending'
  },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
