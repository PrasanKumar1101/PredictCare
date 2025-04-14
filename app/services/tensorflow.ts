import * as tf from '@tensorflow/tfjs';
import { DiabetesInput, HeartInput, KidneyInput } from '../interfaces';

// Paths to our model files (we would need to convert .pkl to tensorflow.js format)
const MODEL_URLS = {
  diabetes: '/models/diabetes/model.json',
  heart: '/models/heart/model.json',
  kidney: '/models/kidney/model.json'
};

// Cache for loaded models
const loadedModels: Record<string, tf.LayersModel> = {};

// Flag to track if we're using mock models
const mockModelFlags: Record<string, boolean> = {
  diabetes: false,
  heart: false,
  kidney: false
};

/**
 * Create a simple mock model for fallback when real models aren't available
 */
function createMockModel(inputShape: number): tf.LayersModel {
  const model = tf.sequential();
  model.add(tf.layers.dense({
    inputShape: [inputShape],
    units: 1,
    activation: 'sigmoid'
  }));
  model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });
  
  return model;
}

/**
 * Load a TensorFlow.js model with fallback to mock model
 */
export async function loadModel(modelType: 'diabetes' | 'heart' | 'kidney'): Promise<tf.LayersModel> {
  if (loadedModels[modelType]) {
    return loadedModels[modelType];
  }

  try {
    // Try to load the real model
    console.log(`Attempting to load ${modelType} model from ${MODEL_URLS[modelType]}`);
    const model = await tf.loadLayersModel(MODEL_URLS[modelType]);
    loadedModels[modelType] = model;
    mockModelFlags[modelType] = false;
    console.log(`Successfully loaded ${modelType} model`);
    return model;
  } catch (error) {
    console.warn(`Could not load ${modelType} model: ${error}. Using mock model instead.`);
    
    // Create a mock model as fallback
    let inputShape = 8; // Default for diabetes
    if (modelType === 'heart') inputShape = 13;
    if (modelType === 'kidney') inputShape = 24;
    
    const mockModel = createMockModel(inputShape);
    loadedModels[modelType] = mockModel;
    mockModelFlags[modelType] = true;
    
    return mockModel;
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
    input.age / 100.0,
    input.sex,
    input.cp / 3.0,
    input.trestbps / 200.0,
    input.chol / 400.0,
    input.fbs,
    input.restecg / 2.0,
    input.thalach / 200.0,
    input.exang,
    input.oldpeak / 6.0,
    input.slope / 2.0,
    input.ca / 3.0,
    input.thal / 3.0
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
  const rbc = input.rbc === 'normal' ? 1 : 0;
  const pc = input.pc === 'normal' ? 1 : 0;
  const pcc = input.pcc === 'present' ? 1 : 0;
  const ba = input.ba === 'present' ? 1 : 0;
  const htn = input.htn === 'yes' ? 1 : 0;
  const dm = input.dm === 'yes' ? 1 : 0;
  const cad = input.cad === 'yes' ? 1 : 0;
  const appet = input.appet === 'good' ? 1 : 0;
  const pe = input.pe === 'yes' ? 1 : 0;
  const ane = input.ane === 'yes' ? 1 : 0;
  
  const normalizedData = [
    input.age / 100.0,
    input.bp / 180.0,
    (input.sg - 1.0) / 0.025, // Range is typically 1.005-1.025
    input.al / 5.0,
    input.su / 5.0,
    rbc,
    pc,
    pcc,
    ba,
    input.bgr / 500.0,
    input.bu / 200.0,
    input.sc / 20.0,
    input.sod / 150.0,
    input.pot / 10.0,
    input.hemo / 20.0,
    input.pcv / 50.0,
    input.wc / 20000.0,
    input.rc / 8.0,
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
 * Make a prediction using the diabetes model
 */
export async function predictDiabetes(input: DiabetesInput) {
  const model = await loadModel('diabetes');
  const normalizedInput = normalizeDiabetesInput(input);
  
  try {
    // Run prediction
    const prediction = model.predict(normalizedInput) as tf.Tensor;
    const value = prediction.dataSync()[0];
    
    // Cleanup
    prediction.dispose();
    normalizedInput.dispose();
    
    // If using mock model, notify by adding a little randomness
    const isMock = isUsingMockModel('diabetes');
    const actualValue = isMock ? (Math.random() * 0.8) + 0.1 : value;
    
    // Determine risk level as a literal type
    let risk: 'Low' | 'Medium' | 'High';
    if (actualValue > 0.7) {
      risk = 'High';
    } else if (actualValue > 0.4) {
      risk = 'Medium';
    } else {
      risk = 'Low';
    }
    
    return {
      prediction: actualValue > 0.5 ? 1 : 0,
      probability: actualValue,
      risk,
      isMockPrediction: isMock
    };
  } catch (error) {
    console.error("Error during diabetes prediction:", error);
    normalizedInput.dispose();
    
    // Return mock data in case of error
    const mockValue = Math.random();
    let mockRisk: 'Low' | 'Medium' | 'High';
    
    if (mockValue > 0.7) {
      mockRisk = 'High';
    } else if (mockValue > 0.4) {
      mockRisk = 'Medium';
    } else {
      mockRisk = 'Low';
    }
    
    return {
      prediction: mockValue > 0.5 ? 1 : 0,
      probability: mockValue,
      risk: mockRisk,
      isMockPrediction: true
    };
  }
}

/**
 * Make a prediction using the heart model
 */
export async function predictHeart(input: HeartInput) {
  const model = await loadModel('heart');
  const normalizedInput = normalizeHeartInput(input);
  
  try {
    // Run prediction
    const prediction = model.predict(normalizedInput) as tf.Tensor;
    const value = prediction.dataSync()[0];
    
    // Cleanup
    prediction.dispose();
    normalizedInput.dispose();
    
    // If using mock model, notify by adding a little randomness
    const isMock = isUsingMockModel('heart');
    const actualValue = isMock ? (Math.random() * 0.8) + 0.1 : value;
    
    // Determine risk level as a literal type
    let risk: 'Low' | 'Medium' | 'High';
    if (actualValue > 0.7) {
      risk = 'High';
    } else if (actualValue > 0.4) {
      risk = 'Medium';
    } else {
      risk = 'Low';
    }
    
    return {
      prediction: actualValue > 0.5 ? 1 : 0,
      probability: actualValue,
      risk,
      isMockPrediction: isMock
    };
  } catch (error) {
    console.error("Error during heart prediction:", error);
    normalizedInput.dispose();
    
    // Return mock data in case of error
    const mockValue = Math.random();
    
    let mockRisk: 'Low' | 'Medium' | 'High';
    if (mockValue > 0.7) {
      mockRisk = 'High';
    } else if (mockValue > 0.4) {
      mockRisk = 'Medium';
    } else {
      mockRisk = 'Low';
    }
    
    return {
      prediction: mockValue > 0.5 ? 1 : 0,
      probability: mockValue,
      risk: mockRisk,
      isMockPrediction: true
    };
  }
}

/**
 * Make a prediction using the kidney model
 */
export async function predictKidney(input: KidneyInput) {
  const model = await loadModel('kidney');
  const normalizedInput = normalizeKidneyInput(input);
  
  try {
    // Run prediction
    const prediction = model.predict(normalizedInput) as tf.Tensor;
    const value = prediction.dataSync()[0];
    
    // Cleanup
    prediction.dispose();
    normalizedInput.dispose();
    
    // If using mock model, add some randomness
    const isMock = isUsingMockModel('kidney');
    const actualValue = isMock ? (Math.random() * 0.8) + 0.1 : value;
    
    // Determine risk level as a literal type
    let risk: 'Low' | 'Medium' | 'High';
    if (actualValue > 0.7) {
      risk = 'High';
    } else if (actualValue > 0.4) {
      risk = 'Medium';
    } else {
      risk = 'Low';
    }
    
    return {
      prediction: actualValue > 0.5 ? 'ckd' : 'notckd',
      probability: actualValue,
      risk,
      isMockPrediction: isMock
    };
  } catch (error) {
    console.error("Error during kidney prediction:", error);
    normalizedInput.dispose();
    
    // Return mock data in case of error
    const mockValue = Math.random();
    
    let mockRisk: 'Low' | 'Medium' | 'High';
    if (mockValue > 0.7) {
      mockRisk = 'High';
    } else if (mockValue > 0.4) {
      mockRisk = 'Medium';
    } else {
      mockRisk = 'Low';
    }
    
    return {
      prediction: mockValue > 0.5 ? 'ckd' : 'notckd',
      probability: mockValue,
      risk: mockRisk,
      isMockPrediction: true
    };
  }
} 