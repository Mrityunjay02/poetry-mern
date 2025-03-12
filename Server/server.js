// CommonJS imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./routes/shayari.js');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

// Debug: Print environment status (but not sensitive values)
console.log('Environment Status:', {
  MONGODB_URI: process.env.MONGODB_URI ? '✓ Set' : '✗ Missing',
  PORT: process.env.PORT || '3000 (default)',
  NODE_ENV: process.env.NODE_ENV || 'development'
});

if (!process.env.MONGODB_URI) {
  console.error('\n❌ MongoDB URI is required! Please set MONGODB_URI environment variable.');
  console.error('   If running locally: Add MONGODB_URI to your .env file');
  console.error('   If using Render: Add MONGODB_URI in Environment settings\n');
  process.exit(1);
}

const app = express();

// CORS configuration with detailed logging
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://mjaypoetry.onrender.com',
      'https://shayari-mern.onrender.com',
      'https://shayari-mern.vercel.app',
      'https://poetry-mern.c3dotfh.mjayp.projects.vercel.app'
    ];
    console.log('Incoming request from origin:', origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route with detailed info
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shayari API',
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', router);

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;

console.log('🚀 Attempting to connect to MongoDB...');

// Connect using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🎉 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('💔 Mongoose disconnected');
});

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('Allowed origins:', corsOptions.origin);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal. Closing server...');
  mongoose.connection.close();
  process.exit(0);
});
