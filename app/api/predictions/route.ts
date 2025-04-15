/* eslint-disable */
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

// Import either the real or mock MongoDB connection
// The BUILD_ENV is determined at build time
// In development/production, we'll use the real implementation
// During build, we'll use the mock
// Using any type to handle dynamic imports
let dbConnect: any;
let PredictionResult: any;

try {
  // Try to import the real MongoDB connection
  const mongoModule = require('@/lib/mongodb');
  dbConnect = mongoModule.default;
  
  // Try to import the real PredictionResult model
  const predictionModule = require('@/models/PredictionResult');
  PredictionResult = predictionModule.default;
} catch (error) {
  // If imports fail, use the mock
  console.warn('Using mock MongoDB implementation');
  const mockModule = require('@/lib/mongodb-mock');
  dbConnect = mockModule.default;
  PredictionResult = mockModule.PredictionResult;
}

// Simple validation helper
function validatePredictionData(data: Record<string, unknown>): { valid: boolean; error?: string } {
  if (!data) return { valid: false, error: 'No data provided' };
  
  const { predictionType, predictionScore, riskLevel, recommendation, inputData } = data;
  
  if (!predictionType || predictionScore === undefined || !riskLevel || !recommendation || !inputData) {
    return { valid: false, error: 'Missing required fields' };
  }
  
  if (!(['diabetes', 'heart', 'kidney'] as string[]).includes(predictionType as string)) {
    return { valid: false, error: 'Invalid prediction type' };
  }
  
  return { valid: true };
}

type PredictionData = {
  predictionType: 'diabetes' | 'heart' | 'kidney';
  predictionScore: number;
  riskLevel: string;
  recommendation: string;
  inputData: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: User not authenticated' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await req.json();
    
    // Validate data
    const validation = validatePredictionData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: `Bad Request: ${validation.error}` },
        { status: 400 }
      );
    }
    
    const { predictionType, predictionScore, riskLevel, recommendation, inputData } = body as PredictionData;
    
    // Connect to MongoDB
    await dbConnect();
    
    // Create a new prediction result
    const newPrediction = await PredictionResult.create({
      userId,
      predictionDate: new Date(),
      predictionType,
      riskLevel,
      riskScore: predictionScore,
      recommendation,
      inputData
    });
    
    return NextResponse.json({
      success: true,
      data: newPrediction
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error saving prediction:', error);
    
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: User not authenticated' },
        { status: 401 }
      );
    }
    
    // Connect to MongoDB
    await dbConnect();
    
    // Parse query parameters
    const url = new URL(req.url);
    const predictionType = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    
    // Build query
    const query: Record<string, unknown> = { userId };
    if (predictionType) {
      query.predictionType = predictionType;
    }
    
    // Get user's prediction history
    const predictions = await PredictionResult.find(query)
      .sort({ predictionDate: -1 })
      .limit(limit);
    
    return NextResponse.json({ predictions });
    
  } catch (error) {
    console.error('Error fetching predictions:', error);
    
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Define PUT and DELETE as aliases of the GET (provides a placeholder response)
export const PUT = GET;
export const DELETE = GET; 