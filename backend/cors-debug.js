// Temporary CORS configuration for debugging
// Replace the existing CORS configuration in index.js with this for testing

const corsDebugConfig = {
  origin: true, // Allow all origins temporarily
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept']
};

// Usage: Replace the existing app.use(cors({...})) with:
// app.use(cors(corsDebugConfig));

module.exports = corsDebugConfig;
