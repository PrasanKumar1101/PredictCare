import * as tf from '@tensorflow/tfjs';
import { DiabetesInput, DiabetesPrediction, HeartInput, HeartPrediction, KidneyInput, KidneyPrediction } from '../interfaces';

// Cache for loaded models
const modelCache: {
  [key: string]: tf.LayersModel | null;
} = {
  diabetes: null,
  heart: null,
  kidney: null
};

// Flag to track if we're using mock models
const mockModelFlags: Record<string, boolean> = {
  diabetes: false,
  heart: false,
  kidney: false
};

/**
 * Loads a TensorFlow.js model from the /public/models directory
 * @param modelType - The type of model to load (diabetes, heart, kidney)
 * @returns A promise that resolves to the loaded model
 */
export async function loadModel(modelType: 'diabetes' | 'heart' | 'kidney'): Promise<tf.LayersModel> {
  try {
    // If model is already cached, return it
    if (modelCache[modelType]) {
      return modelCache[modelType]!;
    }

    // Attempt to load the model from the public directory
    const modelUrl = `/models/${modelType}/model.json`;
    console.log(`Loading model from: ${modelUrl}`);
    
    const model = await tf.loadLayersModel(modelUrl);
    modelCache[modelType] = model;
    
    console.log(`Model ${modelType} loaded successfully`);
    return model;
  } catch (error) {
    console.error(`Error loading ${modelType} model:`, error);
    mockModelFlags[modelType] = true; // Set flag to indicate we're using a mock model
    throw new Error(`Failed to load ${modelType} model: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Check if we're using a mock model for a specific type
 */
export function isUsingMockModel(modelType: 'diabetes' | 'heart' | 'kidney'): boolean {
  return mockModelFlags[modelType];
}

/**
 * Normalize input data for diabetes model
 */
export function normalizeDiabetesInput(input: DiabetesInput): tf.Tensor {
  // Normalize values - these values are examples and should be based on your actual model
  const normalizedData = [
    input.Pregnancies / 17.0, // Max pregnancies in the dataset
    input.Glucose / 200.0,
    input.BloodPressure / 122.0,
    input.SkinThickness / 99.0,
    input.Insulin / 846.0,
    input.BMI / 67.1,
    input.DiabetesPedigreeFunction / 2.42,
    input.Age / 81.0
  ];
  
  return tf.tensor2d([normalizedData]);
}

/**
 * Normalize input data for heart model
 */
export function normalizeHeartInput(input: HeartInput): tf.Tensor {
  // Normalize values
  const normalizedData = [
    input.Age / 100.0,
    input.Sex === 'male' ? 1 : 0,
    input.ChestPainType / 3.0,
    input.RestingBP / 200.0,
    input.Cholesterol / 400.0,
    input.FastingBS ? 1 : 0,
    input.RestingECG / 2.0,
    input.MaxHR / 200.0,
    input.ExerciseAngina ? 1 : 0,
    input.Oldpeak / 6.0,
    input.ST_Slope / 2.0
  ];
  
  return tf.tensor2d([normalizedData]);
}

/**
 * Normalize input data for kidney model
 */
export function normalizeKidneyInput(input: KidneyInput): tf.Tensor {
  // Kidney model uses categorical values that need one-hot encoding
  // This is a simplified version - actual implementation would be more complex
  
  // Convert string values to numbers
  const rbc = input.RedBloodCells === 'normal' ? 1 : 0;
  const pc = input.PusCells === 'normal' ? 1 : 0;
  const pcc = input.PusCellClumps === 'present' ? 1 : 0;
  const ba = input.Bacteria === 'present' ? 1 : 0;
  const htn = input.Hypertension === 'yes' ? 1 : 0;
  const dm = input.DiabetesMellitus === 'yes' ? 1 : 0;
  const cad = input.CoronaryArteryDisease === 'yes' ? 1 : 0;
  const appet = input.Appetite === 'good' ? 1 : 0;
  const pe = input.PedalEdema === 'yes' ? 1 : 0;
  const ane = input.Anemia === 'yes' ? 1 : 0;
  
  const normalizedData = [
    input.Age / 100.0,
    input.BloodPressure / 180.0,
    input.SpecificGravity / 1.025,
    input.Albumin / 5.0,
    input.Sugar / 5.0,
    rbc,
    pc,
    pcc,
    ba,
    input.BloodGlucoseRandom / 500.0,
    input.BloodUrea / 200.0,
    input.SerumCreatinine / 20.0,
    input.Sodium / 150.0,
    input.Potassium / 10.0,
    input.Hemoglobin / 20.0,
    input.PackedCellVolume / 50.0,
    input.WhiteBloodCellCount / 20000.0,
    input.RedBloodCellCount / 8.0,
    htn,
    dm,
    cad,
    appet,
    pe,
    ane
  ];
  
  return tf.tensor2d([normalizedData]);
}

/**
 * Predicts diabetes risk using the loaded model
 */
export async function predictDiabetes(input: DiabetesInput): Promise<DiabetesPrediction> {
  try {
    // Attempt to use the cached model
    const model = modelCache.diabetes;
    
    // If model isn't loaded or failed to load, use mock prediction
    if (!model) {
      console.warn('Diabetes model not loaded, using mock prediction');
      return mockDiabetesPrediction(input);
    }
    
    // Normalize input values
    const inputTensor = tf.tensor2d([
      [
        input.Pregnancies / 17, // Max pregnancies in dataset
        input.Glucose / 200,
        input.BloodPressure / 122,
        input.SkinThickness / 99,
        input.Insulin / 846,
        input.BMI / 67.1,
        input.DiabetesPedigreeFunction / 2.42,
        input.Age / 81
      ]
    ]);
    
    // Make prediction
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictionValue = await prediction.data();
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    const predictionScore = predictionValue[0];
    
    return {
      predictionScore,
      riskLevel: getRiskLevel(predictionScore),
      recommendation: getRecommendation(predictionScore, 'diabetes'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error during diabetes prediction:', error);
    return mockDiabetesPrediction(input);
  }
}

/**
 * Predicts heart disease risk using the loaded model
 */
export async function predictHeart(input: HeartInput): Promise<HeartPrediction> {
  try {
    // Attempt to use the cached model
    const model = modelCache.heart;
    
    // If model isn't loaded or failed to load, use mock prediction
    if (!model) {
      console.warn('Heart model not loaded, using mock prediction');
      return mockHeartPrediction(input);
    }
    
    // Normalize input values (basic normalization, adjust as needed)
    const inputTensor = tf.tensor2d([
      [
        input.Age / 100,
        input.Sex === 'male' ? 1 : 0,
        input.ChestPainType / 4, // Assume 4 types
        input.RestingBP / 200,
        input.Cholesterol / 600,
        input.FastingBS ? 1 : 0,
        input.RestingECG / 3, // Assume 3 types
        input.MaxHR / 220,
        input.ExerciseAngina ? 1 : 0,
        input.Oldpeak / 6.2,
        input.ST_Slope / 3 // Assume 3 types
      ]
    ]);
    
    // Make prediction
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictionValue = await prediction.data();
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    const predictionScore = predictionValue[0];
    
    return {
      predictionScore,
      riskLevel: getRiskLevel(predictionScore),
      recommendation: getRecommendation(predictionScore, 'heart'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error during heart prediction:', error);
    return mockHeartPrediction(input);
  }
}

/**
 * Predicts kidney disease risk using the loaded model
 */
export async function predictKidney(input: KidneyInput): Promise<KidneyPrediction> {
  try {
    // Attempt to use the cached model
    const model = modelCache.kidney;
    
    // If model isn't loaded or failed to load, use mock prediction
    if (!model) {
      console.warn('Kidney model not loaded, using mock prediction');
      return mockKidneyPrediction(input);
    }
    
    // Normalize input values (basic normalization, adjust as needed)
    const inputTensor = tf.tensor2d([
      [
        input.Age / 100,
        input.BloodPressure / 180,
        input.SpecificGravity / 1.025,
        input.Albumin / 5,
        input.Sugar / 5,
        input.RedBloodCells === 'normal' ? 0 : 1,
        input.PusCells === 'normal' ? 0 : 1,
        input.PusCellClumps === 'present' ? 1 : 0,
        input.Bacteria === 'present' ? 1 : 0,
        input.BloodGlucoseRandom / 500,
        input.BloodUrea / 100,
        input.SerumCreatinine / 10,
        input.Sodium / 160,
        input.Potassium / 8,
        input.Hemoglobin / 17,
        input.PackedCellVolume / 54,
        input.WhiteBloodCellCount / 26400,
        input.RedBloodCellCount / 8,
        input.Hypertension === 'yes' ? 1 : 0,
        input.DiabetesMellitus === 'yes' ? 1 : 0,
        input.CoronaryArteryDisease === 'yes' ? 1 : 0,
        input.Appetite === 'good' ? 0 : 1,
        input.PedalEdema === 'yes' ? 1 : 0,
        input.Anemia === 'yes' ? 1 : 0
      ]
    ]);
    
    // Make prediction
    const prediction = model.predict(inputTensor) as tf.Tensor;
    const predictionValue = await prediction.data();
    
    // Clean up tensors
    inputTensor.dispose();
    prediction.dispose();
    
    const predictionScore = predictionValue[0];
    
    return {
      predictionScore,
      riskLevel: getRiskLevel(predictionScore),
      recommendation: getRecommendation(predictionScore, 'kidney'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error during kidney prediction:', error);
    return mockKidneyPrediction(input);
  }
}

// Utility functions
function getRiskLevel(predictionScore: number): 'low' | 'moderate' | 'high' {
  if (predictionScore < 0.3) return 'low';
  if (predictionScore < 0.7) return 'moderate';
  return 'high';
}

function getRecommendation(
  predictionScore: number, 
  modelType: 'diabetes' | 'heart' | 'kidney'
): string {
  const riskLevel = getRiskLevel(predictionScore);
  
  if (modelType === 'diabetes') {
    if (riskLevel === 'low') {
      return 'Your risk is low. Maintain a healthy lifestyle with regular exercise and a balanced diet.';
    } else if (riskLevel === 'moderate') {
      return 'You have a moderate risk. Consider reducing sugar intake, increasing physical activity, and scheduling a check-up with your doctor.';
    } else {
      return 'Your risk is high. Please consult your healthcare provider as soon as possible for proper evaluation and guidance.';
    }
  }
  
  else if (modelType === 'heart') {
    if (riskLevel === 'low') {
      return 'Your risk is low. Maintain heart-healthy habits like regular exercise and a diet low in saturated fats.';
    } else if (riskLevel === 'moderate') {
      return 'You have a moderate risk. Consider lifestyle changes such as increased exercise, reduced sodium intake, and stress management.';
    } else {
      return 'Your risk is high. Please consult a cardiologist soon for a comprehensive heart health evaluation.';
    }
  }
  
  else { // kidney
    if (riskLevel === 'low') {
      return 'Your risk is low. Stay hydrated and maintain a balanced diet to support kidney health.';
    } else if (riskLevel === 'moderate') {
      return 'You have a moderate risk. Consider reducing salt intake, managing blood pressure, and scheduling a kidney function test.';
    } else {
      return 'Your risk is high. Please consult a nephrologist soon for proper evaluation and care plan.';
    }
  }
}

// Mock prediction functions for fallback
function mockDiabetesPrediction(input: DiabetesInput): DiabetesPrediction {
  // Generate a somewhat realistic prediction based on input factors
  let score = 0.3; // Base score
  
  // Adjust based on known risk factors
  if (input.Age > 45) score += 0.1;
  if (input.BMI > 30) score += 0.15;
  if (input.Glucose > 140) score += 0.2;
  if (input.DiabetesPedigreeFunction > 0.8) score += 0.1;
  
  // Ensure score is between 0 and 1
  score = Math.min(Math.max(score, 0), 1);
  
  return {
    predictionScore: score,
    riskLevel: getRiskLevel(score),
    recommendation: getRecommendation(score, 'diabetes'),
    isMockPrediction: true
  };
}

function mockHeartPrediction(input: HeartInput): HeartPrediction {
  // Generate a somewhat realistic prediction based on input factors
  let score = 0.25; // Base score
  
  // Adjust based on known risk factors
  if (input.Age > 50) score += 0.1;
  if (input.Sex === 'male') score += 0.05;
  if (input.ChestPainType > 2) score += 0.15;
  if (input.RestingBP > 140) score += 0.1;
  if (input.Cholesterol > 240) score += 0.1;
  if (input.FastingBS) score += 0.1;
  if (input.ExerciseAngina) score += 0.15;
  
  // Ensure score is between 0 and 1
  score = Math.min(Math.max(score, 0), 1);
  
  return {
    predictionScore: score,
    riskLevel: getRiskLevel(score),
    recommendation: getRecommendation(score, 'heart'),
    isMockPrediction: true
  };
}

function mockKidneyPrediction(input: KidneyInput): KidneyPrediction {
  // Generate a somewhat realistic prediction based on input factors
  let score = 0.2; // Base score
  
  // Adjust based on known risk factors
  if (input.Age > 60) score += 0.1;
  if (input.BloodPressure > 130) score += 0.1;
  if (input.Albumin > 2) score += 0.15;
  if (input.BloodUrea > 50) score += 0.2;
  if (input.SerumCreatinine > 1.5) score += 0.15;
  if (input.Hypertension === 'yes') score += 0.1;
  if (input.DiabetesMellitus === 'yes') score += 0.1;
  
  // Ensure score is between 0 and 1
  score = Math.min(Math.max(score, 0), 1);
  
  return {
    predictionScore: score,
    riskLevel: getRiskLevel(score),
    recommendation: getRecommendation(score, 'kidney'),
    isMockPrediction: true
  };
} 