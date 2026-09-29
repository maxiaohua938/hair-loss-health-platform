const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize, User, SleepRecord, MedicationPlan, MedicationRecord, Article } = require('./models');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sleepRoutes = require('./routes/sleep');
const medicationRoutes = require('./routes/medication');
const articleRoutes = require('./routes/articles');

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/articles', articleRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Database Connection and Server Start
const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Database connected successfully');
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

module.exports = app;
