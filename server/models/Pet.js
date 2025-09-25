const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  animalType: { type: String, required: true },
  breed: String,
  petName: { type: String, required: true },
  petAge: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  imageUrls: [{ type: String }],  // Array of image paths relative to /uploads/
  status: { type: String, enum: ['available', 'sold', null], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
