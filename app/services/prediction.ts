import { DiabetesPrediction, HeartPrediction, KidneyPrediction, ModelType, PredictionResponse } from '../interfaces';

/**
 * Save a prediction result to the database
 * @param predictionType The type of prediction (diabetes, heart, kidney)
 * @param prediction The prediction result
 * @param inputData The input data used for the prediction
 * @returns A promise that resolves to the response from the API
 */
export async function savePredictionToAPI(
  predictionType: ModelType,
  prediction: DiabetesPrediction | HeartPrediction | KidneyPrediction,
  inputData: Record<string, unknown>
): Promise<PredictionResponse> {
  try {
    // Create the payload for the API
    const payload = {
      predictionType,
      predictionScore: prediction.predictionScore,
      riskLevel: prediction.riskLevel,
      recommendation: prediction.recommendation,
      inputData
    };
    
    // Send the request to the API
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save prediction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving prediction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 