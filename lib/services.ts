import { DiabetesModel, HeartDiseaseModel, KidneyDiseaseModel, PredictionResult } from './types';

/**
 * Service class for disease prediction models
 */
export class DiseasePredictionService {
  /**
   * Predict diabetes based on input parameters
   * @param model The diabetes model input parameters
   * @returns Prediction result
   */
  static async predictDiabetes(model: DiabetesModel): Promise<PredictionResult> {
    try {
      const response = await fetch('/api/predict/diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      
      if (!response.ok) {
        throw new Error('Failed to predict diabetes');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error predicting diabetes:', error);
      return {
        result: false,
        message: 'Error predicting diabetes, please try again.',
      };
    }
  }
  
  /**
   * Predict heart disease based on input parameters
   * @param model The heart disease model input parameters
   * @returns Prediction result
   */
  static async predictHeartDisease(model: HeartDiseaseModel): Promise<PredictionResult> {
    try {
      const response = await fetch('/api/predict/heart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      
      if (!response.ok) {
        throw new Error('Failed to predict heart disease');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error predicting heart disease:', error);
      return {
        result: false,
        message: 'Error predicting heart disease, please try again.',
      };
    }
  }
  
  /**
   * Predict kidney disease based on input parameters
   * @param model The kidney disease model input parameters
   * @returns Prediction result
   */
  static async predictKidneyDisease(model: KidneyDiseaseModel): Promise<PredictionResult> {
    try {
      const response = await fetch('/api/predict/kidney', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      
      if (!response.ok) {
        throw new Error('Failed to predict kidney disease');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error predicting kidney disease:', error);
      return {
        result: false,
        message: 'Error predicting kidney disease, please try again.',
      };
    }
  }
} 