const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import your models (assumed defined in separate model files)
const Pet = require('./models/Pet');
const Feedback = require('./models/Feedback');
const contactRoutes = require('./routes/contact'); // Import contact route

// Import petstore router
const productsRouter = require('./routes/products');

// Use your petstore router for /api/pets endpoints
app.use('/api/products', productsRouter);

// Use contact route for /api/contact
app.use('/api/contact', contactRoutes);

// Import buyers router for handling buyer registrations
const buyersRouter = require('./routes/buyers');
// Use buyers router for /api/buyers endpoints
app.use('/api/buyers', buyersRouter);

// Import sellers router for handling seller registrations
const sellersRouter = require('./routes/sellers');
// Use sellers router for /api/sellers endpoints
app.use('/api/sellers', sellersRouter);

// Import vets router for handling vet registrations
const vetsRouter = require('./routes/vets');
// Use vets router for /api/vets endpoints
app.use('/api/vets', vetsRouter);





// Root route - test server
app.get('/', (req, res) => {
  res.send('PetConnect backend is running!');
});

// Feedback POST route
app.post('/feedback', async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/petconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
