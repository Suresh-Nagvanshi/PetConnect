const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  houseNo: String,
  city: String,
  pincode: String,
  district: String,
  state: String,
}, { timestamps: true });

module.exports = mongoose.model('Buyer', buyerSchema);
