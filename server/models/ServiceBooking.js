const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",  // Assuming 'Buyer' is the model name for buyers
    default: null,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",  // Assuming 'Seller' is the model name for sellers
    default: null,
  },
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vet",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VetService",
    required: true,
  },
  appointmentTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  declineReason: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);
