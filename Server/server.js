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
  PORT: process.env.PORT || '8083 (default)',
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_URL: `http://localhost:${process.env.PORT || 8083}`
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
    console.log('🔍 Request from origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked origin:', origin);
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route with detailed info
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shayari API',
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes with error handling
app.use('/api', (req, res, next) => {
  console.log(`🛣️ API Route: ${req.method} ${req.path}`);
  next();
}, router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
console.log('🚀 Attempting to connect to MongoDB...');

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

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running on:
   - Local: http://localhost:${PORT}
   - Production: https://mjaypoetry.onrender.com
   - Environment: ${process.env.NODE_ENV}
   - Port: ${PORT}
  `);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('👋 Received SIGTERM signal. Closing server...');
  server.close(() => {
    console.log('🔄 Server closed. Disconnecting from MongoDB...');
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed. Exiting...');
      process.exit(0);
    });
  });
});
