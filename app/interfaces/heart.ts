// Heart Disease prediction model interface
export interface HeartInput {
  age: number;
  sex: number; // 1 = male, 0 = female
  cp: number; // chest pain type (0-3)
  trestbps: number; // resting blood pressure
  chol: number; // serum cholesterol in mg/dl
  fbs: number; // fasting blood sugar > 120 mg/dl (1 = true; 0 = false)
  restecg: number; // resting electrocardiographic results (0-2)
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina (1 = yes; 0 = no)
  oldpeak: number; // ST depression induced by exercise relative to rest
  slope: number; // the slope of the peak exercise ST segment (0-2)
  ca: number; // number of major vessels (0-3) colored by fluoroscopy
  thal: number; // 0 = normal; 1 = fixed defect; 2 = reversable defect
}

export interface HeartPrediction {
  prediction: number; // 0 or 1
  probability: number; // Probability score
  risk: 'Low' | 'Medium' | 'High';
  isMockPrediction?: boolean; // Indicates if this is a simulated prediction
}

export interface HeartResult {
  input: HeartInput;
  result: HeartPrediction;
} 