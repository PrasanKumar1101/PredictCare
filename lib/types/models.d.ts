import { Document } from 'mongoose';

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

// Document interface
export interface PredictionResultDocument extends BasePredictionResult, Document {
  inputData: PredictionData;
}

// Model interface for PredictionResult
export interface PredictionResultModel {
  create: (data: Record<string, unknown>) => Promise<PredictionResultDocument>;
  find: (query?: Record<string, unknown>) => {
    sort: (options: Record<string, number>) => {
      limit: (limit: number) => Promise<PredictionResultDocument[]>;
    };
  };
  // Add additional methods that might be used
  findOne?: (query?: Record<string, unknown>) => Promise<PredictionResultDocument | null>;
  findById?: (id: string) => Promise<PredictionResultDocument | null>;
  updateOne?: (query: Record<string, unknown>, update: Record<string, unknown>) => Promise<{ modifiedCount: number }>;
  deleteOne?: (query: Record<string, unknown>) => Promise<{ deletedCount: number }>;
} 