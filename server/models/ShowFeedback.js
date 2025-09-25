const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  feedback: String,
  date: String,
  type: String
}, { collection: 'Feedbacks' });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
