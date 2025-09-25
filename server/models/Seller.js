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
  latitude: Number,      
  longitude: Number,
}, { timestamps: true });

module.exports = mongoose.model('Seller', sellerSchema);
