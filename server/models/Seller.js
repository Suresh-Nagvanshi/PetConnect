const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Added password field
  phone: { type: String, required: true },
  houseNo: String,
  city: String,
  pincode: String,
  district: String,
  state: String,
  animalType: { type: String, required: true },
  breed: String,
  petName: { type: String, required: true },
  petAge: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
