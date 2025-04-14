// Disease Prediction Model Interfaces

// Diabetes prediction model interface
export interface DiabetesModel {
  age: number;
  gender: number; // 0 for female, 1 for male
  polyuria: number; // 0 for no, 1 for yes
  polydipsia: number; // 0 for no, 1 for yes
  sudden_weight_loss: number; // 0 for no, 1 for yes
  weakness: number; // 0 for no, 1 for yes
  polyphagia: number; // 0 for no, 1 for yes
  genital_thrush: number; // 0 for no, 1 for yes
  visual_blurring: number; // 0 for no, 1 for yes
  itching: number; // 0 for no, 1 for yes
  irritability: number; // 0 for no, 1 for yes
  delayed_healing: number; // 0 for no, 1 for yes
  partial_paresis: number; // 0 for no, 1 for yes
  muscle_stiffness: number; // 0 for no, 1 for yes
  alopecia: number; // 0 for no, 1 for yes
  obesity: number; // 0 for no, 1 for yes
}

// Heart disease prediction model interface
export interface HeartDiseaseModel {
  age: number;
  sex: number; // 0 for female, 1 for male
  cp: number; // chest pain type (0-3)
  trestbps: number; // resting blood pressure
  chol: number; // serum cholesterol in mg/dl
  fbs: number; // fasting blood sugar > 120 mg/dl (0 = false, 1 = true)
  restecg: number; // resting electrocardiographic results (0-2)
  thalach: number; // maximum heart rate achieved
  exang: number; // exercise induced angina (0 = no, 1 = yes)
  oldpeak: number; // ST depression induced by exercise relative to rest
  slope: number; // slope of the peak exercise ST segment (0-2)
  ca: number; // number of major vessels colored by fluoroscopy (0-3)
  thal: number; // 0 = normal; 1 = fixed defect; 2 = reversible defect
}

// Kidney disease prediction model interface
export interface KidneyDiseaseModel {
  age: number;
  blood_pressure: number;
  specific_gravity: number;
  albumin: number;
  sugar: number;
  red_blood_cells: number; // 0 for abnormal, 1 for normal
  pus_cell: number; // 0 for abnormal, 1 for normal
  pus_cell_clumps: number; // 0 for not present, 1 for present
  bacteria: number; // 0 for not present, 1 for present
  blood_glucose_random: number;
  blood_urea: number;
  serum_creatinine: number;
  sodium: number;
  potassium: number;
  haemoglobin: number;
  packed_cell_volume: number;
  white_blood_cell_count: number;
  red_blood_cell_count: number;
  hypertension: number; // 0 for no, 1 for yes
  diabetes_mellitus: number; // 0 for no, 1 for yes
  coronary_artery_disease: number; // 0 for no, 1 for yes
  appetite: number; // 0 for good, 1 for poor
  peda_edema: number; // 0 for no, 1 for yes
  aanemia: number; // 0 for no, 1 for yes
}

// Prediction results
export interface PredictionResult {
  result: boolean;
  message: string;
} 