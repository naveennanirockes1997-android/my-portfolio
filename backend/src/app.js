const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Allow frontend to send cookies (for JWT) and hit this API from the dev origin
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:8080',
      'http://localhost:5174',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:5174'
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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

module.exports = app;


