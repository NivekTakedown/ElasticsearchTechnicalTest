const loadEnvironment = require('./src/config/environment');
const configureServer = require('./src/config/server');
const createElasticsearchClient = require('./src/config/elasticsearch');
const routes = require('./src/routes');

// Load environment variables
const env = loadEnvironment();

// Configure Express server
const app = configureServer();

// Create Elasticsearch client
const elasticsearchClient = createElasticsearchClient();

// API routes
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(env.port, async () => {
  console.log(`Server running on port ${env.port}`);
  try {
    await elasticsearchClient.ping();
    console.log('Connected to Elasticsearch');
  } catch (error) {
    console.error('Error connecting to Elasticsearch:', error);
  }
});

module.exports = app;