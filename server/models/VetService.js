const mongoose = require('mongoose');

const VetServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  duration: Number,
  description: String,
  discount: Number,
  imageUrl: String,

  // Add this field to reference the Seller (Vet)
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true },

});

module.exports = mongoose.model('VetService', VetServiceSchema);
