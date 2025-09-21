const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,    // Add password field
  phone: String,
  houseNo: String,
  city: String,
  pincode: String,
  district: String,
  state: String
});

module.exports = mongoose.model('Buyer', buyerSchema);
