const express = require('express');
const loadEnvironment = require('./src/config/environment');
const configureServer = require('./src/config/server');
const createElasticsearchClient = require('./src/config/elasticsearch');
const userRoutes = require('./src/routes/userRoutes');
const { errorHandler, notFoundHandler, logRequest } = require('./src/middlewares/middlewares');
const userService = require('./src/services/userService');

// Load environment variables
const env = loadEnvironment();

// Configure Express server
const app = configureServer();

// Create Elasticsearch client
const elasticsearchClient = createElasticsearchClient();

// Logging middleware
app.use(logRequest);

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api', userRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

// Initialize Elasticsearch index and start server
const initializeAndStart = async () => {
  try {
    await elasticsearchClient.ping();
    console.log('Connected to Elasticsearch');

    await userService.initializeIndex();
    console.log('User index initialized');

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
};

initializeAndStart();

module.exports = app;