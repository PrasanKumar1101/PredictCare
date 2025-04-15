import mongoose, { Schema, Document } from 'mongoose';

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

// Final interface combining base and specific data
export interface PredictionResultDocument extends BasePredictionResult, Document {
  inputData: PredictionData;
}

// Create the schema
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

// Create and export the model
export default mongoose.models.PredictionResult || 
  mongoose.model<PredictionResultDocument>('PredictionResult', PredictionResultSchema); 