const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Load env variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = ["http://localhost:5173"]; // your frontend URL
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow cookies/auth headers
  })
);

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);


// Connect to MongoDB and start server
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
