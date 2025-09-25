const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import your models
const Pet = require('./models/Pet');
const Feedback = require('./models/Feedback');

// Import routers
const contactRoutes = require('./routes/contact');
const productsRouter = require('./routes/products');
const buyersRouter = require('./routes/buyers');
const sellersRouter = require('./routes/sellers');
const vetsRouter = require('./routes/vets');
const authRoutes = require('./routes/auth');
const geocodeRouter = require('./routes/geocode');
const petRoutes = require('./routes/pets');
const path = require('path');


// Use routers for their endpoints
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/buyers', buyersRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/vets', vetsRouter);
app.use('/api/auth', authRoutes);
app.use('/api/geocode', geocodeRouter);
app.use('/api/pets', petRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Feedback routes (POST + GET)
app.post('/api/feedbacks', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all feedbacks
app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Root route - test server
app.get('/', (req, res) => {
  res.send('PetConnect backend is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  // Don't exit the process, but log the error
});

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
