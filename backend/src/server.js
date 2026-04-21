require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobsRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Performance Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/jobs', jobsRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Web3 Jobs Backend Server',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(error.statusCode || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 Web3 Jobs Backend Server`);
  console.log(`📡 Running on port: ${PORT}`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}/api/jobs`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});