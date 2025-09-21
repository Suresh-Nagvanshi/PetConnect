const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  clinicName: String,
  houseNo: String,
  city: String,
  pincode: String,
  district: String,
  state: String,
  qualifications: String,
  licenseNumber: String,
  yearsExperience: Number,
  agreedToTerms: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema);
