// Export all model interfaces
export * from './diabetes';
export * from './heart';
export * from './kidney';

// Common interfaces for the application
export interface PredictionResponse {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export type ModelType = 'diabetes' | 'heart' | 'kidney';

// Diabetes prediction interfaces
export interface DiabetesInput {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
}

export interface DiabetesPrediction {
  predictionScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendation: string;
  isMockPrediction: boolean;
}

// Heart disease prediction interfaces
export interface HeartInput {
  Age: number;
  Sex: 'male' | 'female';
  ChestPainType: number;
  RestingBP: number;
  Cholesterol: number;
  FastingBS: boolean;
  RestingECG: number;
  MaxHR: number;
  ExerciseAngina: boolean;
  Oldpeak: number;
  ST_Slope: number;
}

export interface HeartPrediction {
  predictionScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendation: string;
  isMockPrediction: boolean;
}

// Kidney disease prediction interfaces
export interface KidneyInput {
  Age: number;
  BloodPressure: number;
  SpecificGravity: number;
  Albumin: number;
  Sugar: number;
  RedBloodCells: 'normal' | 'abnormal';
  PusCells: 'normal' | 'abnormal';
  PusCellClumps: 'present' | 'notpresent';
  Bacteria: 'present' | 'notpresent';
  BloodGlucoseRandom: number;
  BloodUrea: number;
  SerumCreatinine: number;
  Sodium: number;
  Potassium: number;
  Hemoglobin: number;
  PackedCellVolume: number;
  WhiteBloodCellCount: number;
  RedBloodCellCount: number;
  Hypertension: 'yes' | 'no';
  DiabetesMellitus: 'yes' | 'no';
  CoronaryArteryDisease: 'yes' | 'no';
  Appetite: 'good' | 'poor';
  PedalEdema: 'yes' | 'no';
  Anemia: 'yes' | 'no';
}

export interface KidneyPrediction {
  predictionScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendation: string;
  isMockPrediction: boolean;
}

// User profile interfaces
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  healthMetrics?: HealthMetrics;
  predictions?: UserPredictions;
}

export interface HealthMetrics {
  height?: number; // in cm
  weight?: number; // in kg
  age?: number;
  bloodType?: string;
  allergies?: string[];
  chronicConditions?: string[];
}

export interface UserPredictions {
  diabetes?: DiabetesPrediction & { date: string };
  heart?: HeartPrediction & { date: string };
  kidney?: KidneyPrediction & { date: string };
} 