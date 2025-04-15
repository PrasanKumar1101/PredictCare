import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import dbConnect from '@/lib/mongodb';
import PredictionResult from '@/models/PredictionResult';
import { z } from 'zod';

const predictionSchema = z.object({
  predictionType: z.enum(['diabetes', 'heart', 'kidney']),
  riskScore: z.number(),
  riskLevel: z.string(),
  recommendation: z.string(),
  inputData: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
});

type PredictionData = z.infer<typeof predictionSchema>;

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    
    // Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized: User not authenticated' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const body = await req.json();
    
    // Validate required fields
    const { predictionType, riskScore, riskLevel, recommendation, inputData } = body as PredictionData;
    
    if (!predictionType || riskScore === undefined || !riskLevel || !recommendation || !inputData) {
      return NextResponse.json(
        { error: 'Bad Request: Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate prediction type
    if (!['diabetes', 'heart', 'kidney'].includes(predictionType)) {
      return NextResponse.json(
        { error: 'Bad Request: Invalid prediction type' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await dbConnect();
    
    // Create a new prediction result
    const newPrediction = await PredictionResult.create({
      userId,
      predictionDate: new Date(),
      predictionType,
      riskScore,
      riskLevel,
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
    const { userId } = auth();
    
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