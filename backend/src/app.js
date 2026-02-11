const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
const adminUrl = process.env.ADMIN_URL || 'http://localhost:5173';

// CORS configuration for production adaptability
app.use(
  cors({
    origin: [
      frontendUrl,
      adminUrl,
      'http://localhost:8080',
      'http://localhost:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:5173'
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Root health check
app.get('/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date() }));

const projectRoutes = require('./routes/projects');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const experienceRoutes = require('./routes/experience');
const certificationRoutes = require('./routes/certifications');

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/certifications', certificationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;


