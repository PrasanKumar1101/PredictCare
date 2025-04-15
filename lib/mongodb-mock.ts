// This is a mock implementation for MongoDB to use during build time
// or when a real MongoDB connection is not available

/**
 * Mock MongoDB connection function
 * Used during build time or when no MongoDB connection is available
 */
export async function dbConnect() {
  console.warn('Using mock MongoDB connection');
  return null;
}

/**
 * Mock PredictionResult model
 * Provides minimal implementation to prevent build errors
 */
export const PredictionResult = {
  // Create a new document
  create: async (data: Record<string, unknown>) => ({ 
    ...data, 
    _id: `mock_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date()
  }),
  
  // Mock find method with chainable methods
  find: () => ({
    sort: () => ({
      limit: () => Promise.resolve([])
    })
  }),
  
  // Additional methods that might be needed
  findOne: () => Promise.resolve(null),
  findById: () => Promise.resolve(null),
  updateOne: () => Promise.resolve({ modifiedCount: 0 }),
  deleteOne: () => Promise.resolve({ deletedCount: 0 })
};

// Default export for the mock MongoDB connection
export default dbConnect; 