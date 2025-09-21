const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vetSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  clinicName: String,
  houseNumber: String,
  city: String,
  pincode: String,
  district: String,
  state: String,
  qualifications: String,
  licenseNumber: String,
  yearsExperience: { type: Number, min: 0 },
  agreedToTerms: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema);
