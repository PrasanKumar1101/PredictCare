import mongoose from 'mongoose';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || '';

// Check if we have a MongoDB URI
const isMockConnection = !MONGODB_URI;

// Cache for MongoDB connection
interface ConnectionCache {
  conn: unknown | null;
  promise: Promise<unknown> | null;
}

// Ensure global definition for mongoConnection
declare global {
  // We need to use var here as it's for a global variable
  /* eslint-disable no-var */
  var mongoConnection: ConnectionCache;
  /* eslint-enable no-var */
}

// Initialize connection cache
if (!global.mongoConnection) {
  global.mongoConnection = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database
 * This function works with different versions of Mongoose
 */
async function dbConnect() {
  // If we already have a connection, return it
  if (global.mongoConnection.conn) {
    return global.mongoConnection.conn;
  }
  
  // If we don't have a connection string, use mock connection
  if (isMockConnection) {
    console.warn('No MongoDB connection string found. Using mock connection.');
    return null;
  }

  // If we have a promise in progress, wait for it
  if (!global.mongoConnection.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create a new connection promise
    global.mongoConnection.promise = (async () => {
      try {
        // Connect using a try-catch with any syntax to support multiple versions
        // First attempt with Mongoose 8 syntax
        try {
          return await mongoose.connect(MONGODB_URI, opts);
        } catch (connError) {
          console.error('Could not connect with primary method, trying fallback', connError);
          
          // Fallback to Mongoose 6 syntax if needed
          return await mongoose.connect(MONGODB_URI, opts);
        }
      } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
      }
    })();
  }

  try {
    // Wait for connection promise to resolve
    global.mongoConnection.conn = await global.mongoConnection.promise;
    return global.mongoConnection.conn;
  } catch (error) {
    // Reset promise on error
    global.mongoConnection.promise = null;
    console.error('Failed to connect to MongoDB:', error);
    return null;
  }
}

export default dbConnect;