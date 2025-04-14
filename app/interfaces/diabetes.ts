// Diabetes prediction model interface
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
  prediction: number; // 0 or 1
  probability: number; // Probability score
  risk: 'Low' | 'Medium' | 'High';
  isMockPrediction?: boolean; // Indicates if this is a simulated prediction
}

export interface DiabetesResult {
  input: DiabetesInput;
  result: DiabetesPrediction;
} 