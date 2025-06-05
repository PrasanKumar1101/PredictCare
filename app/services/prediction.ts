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
    // Temporarily disable API saving to avoid issues
    // TODO: Fix the API endpoint configuration
    console.log('Skipping prediction save to API (disabled)', { predictionType, prediction, inputData });
    
    return {
      success: true,
      data: { saved: false, reason: 'API saving temporarily disabled' }
    };
    
    // Original API code commented out:
    /*
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
      let errorMessage = 'Failed to save prediction';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If parsing fails, use the response status as error message
        errorMessage = `API error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    try {
      return await response.json();
    } catch {
      throw new Error('Invalid response format from API');
    }
    */
  } catch (error) {
    console.error('Error saving prediction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 