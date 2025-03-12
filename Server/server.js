// ES Module imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import router from './routes/shayari.js';

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env'), override: true });

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
app.use(cors({
  origin: ['http://localhost:3000', 'https://mjaypoetry.onrender.com', 'https://shayari-mern.onrender.com', 'https://shayari-mern.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Shayari API',
    status: 'Server is running'
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
