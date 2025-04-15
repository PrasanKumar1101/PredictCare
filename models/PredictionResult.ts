import mongoose, { Schema, Document } from 'mongoose';
import type { PredictionResultModel as PredictionResultModelType, PredictionResultDocument as PredictionResultDocumentType } from '@/lib/types/models';

// Define the base prediction result structure
interface BasePredictionResult {
  userId: string;
  predictionDate: Date;
  predictionType: 'diabetes' | 'heart' | 'kidney';
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

// Define diabetes-specific fields
interface DiabetesPredictionData {
  pregnancies?: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

// Define heart-specific fields
interface HeartPredictionData {
  age: number;
  sex: number;
  chestPainType: number;
  restingBP: number;
  cholesterol: number;
  fastingBS: number;
  restingECG: number;
  maxHR: number;
  exerciseAngina: number;
  oldpeak: number;
  stSlope: number;
}

// Define kidney-specific fields
interface KidneyPredictionData {
  age: number;
  bloodPressure: number;
  specificGravity: number;
  albumin: number;
  sugar: number;
  redBloodCells: string;
  pus: number;
  pusCellClumps: string;
  bacteria: string;
  bloodGlucose: number;
  bloodUrea: number;
  serumCreatinine: number;
  sodium: number;
  potassium: number;
  hemoglobin: number;
  packedCellVolume: number;
  whiteBloodCellCount: number;
  redBloodCellCount: number;
  hypertension: string;
  diabetesMellitus: string;
  coronaryArteryDisease: string;
  appetite: string;
  pedalEdema: string;
  anemia: string;
}

// Combined prediction data type
type PredictionData = DiabetesPredictionData | HeartPredictionData | KidneyPredictionData;

// Final interface
export interface PredictionResultDocument extends BasePredictionResult, Document {
  inputData: PredictionData;
}

// Create a schema
const PredictionResultSchema = new Schema<PredictionResultDocument>(
  {
    userId: { type: String, required: true, index: true },
    predictionDate: { type: Date, default: Date.now },
    predictionType: { 
      type: String, 
      required: true, 
      enum: ['diabetes', 'heart', 'kidney']
    },
    riskScore: { type: Number, required: true },
    riskLevel: { 
      type: String, 
      required: true, 
      enum: ['low', 'medium', 'high']
    },
    recommendation: { type: String, required: true },
    inputData: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

// Check if mongoose is available (it will not be during build time server-side)
const isMongooseAvailable = typeof mongoose !== 'undefined' && mongoose.models;

// Create model or use fallback if mongoose isn't available
let PredictionResultModel: PredictionResultModelType;

if (isMongooseAvailable) {
  try {
    // Use existing model or create a new one
    // For Mongoose 8 compatibility
    // Handle model creation with proper type casting
    const model = mongoose.models.PredictionResult || 
      mongoose.model<PredictionResultDocument>('PredictionResult', PredictionResultSchema);
    
    // Cast to the required model type
    PredictionResultModel = model as unknown as PredictionResultModelType;
  } catch (error) {
    console.error('Error creating Mongoose model:', error);
    // Fallback to mock
    PredictionResultModel = createMockModel();
  }
} else {
  // Mock implementation for when mongoose isn't available (during build)
  PredictionResultModel = createMockModel();
}

function createMockModel(): PredictionResultModelType {
  return {
    create: async (data: Record<string, unknown>) => ({ 
      ...data, 
      _id: `mock_${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }) as unknown as PredictionResultDocumentType,
    find: () => ({
      sort: () => ({
        limit: () => Promise.resolve([])
      })
    })
  };
}

export default PredictionResultModel;