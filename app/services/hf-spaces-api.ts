import { 
  DiabetesInput, DiabetesPrediction, 
  HeartInput, HeartPrediction, 
  KidneyInput, KidneyPrediction 
} from '../interfaces';

const API_URLS = {
  diabetes: 'https://prasan1101-ml-diabetes.hf.space/predict',
  heart: 'https://prasan1101-ml-heart.hf.space/predict',
  kidney: 'https://prasan1101-ml-kidney.hf.space/predict'
};

/**
 * Call the Diabetes prediction API on Hugging Face Spaces
 */
export async function callDiabetesAPI(input: DiabetesInput): Promise<DiabetesPrediction> {
  try {
    // Map the input to the expected API format
    const apiInput = {
      pregnancies: input.Pregnancies,
      glucose: input.Glucose,
      bloodPressure: input.BloodPressure,
      skinThickness: input.SkinThickness,
      insulin: input.Insulin,
      bmi: input.BMI,
      diabetesPedigree: input.DiabetesPedigreeFunction,
      age: input.Age
    };

    // Call the API
    console.log('Calling Diabetes API with input:', apiInput);
    const response = await fetch(API_URLS.diabetes, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiInput),
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Diabetes API error response:', errorText);
      throw new Error(`Failed to call Diabetes API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Diabetes API response:', result);

    // Transform the response to match our application's format
    return {
      predictionScore: result.probability || 0,
      riskLevel: getRiskLevelFromProbability(result.probability),
      recommendation: result.message || getDefaultRecommendation('diabetes'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error calling Diabetes API:', error);
    throw error;
  }
}

/**
 * Call the Heart Disease prediction API on Hugging Face Spaces
 */
export async function callHeartAPI(input: HeartInput): Promise<HeartPrediction> {
  try {
    // Map the input to the expected API format
    const apiInput = {
      age: input.Age,
      sex: input.Sex === 'male' ? 1 : 0,
      cp: input.ChestPainType,
      trestbps: input.RestingBP,
      chol: input.Cholesterol,
      fbs: input.FastingBS ? 1 : 0,
      restecg: input.RestingECG,
      thalach: input.MaxHR,
      exang: input.ExerciseAngina ? 1 : 0,
      oldpeak: input.Oldpeak,
      slope: input.ST_Slope,
      ca: 0, // These might need to be added to the interface
      thal: 1  // These might need to be added to the interface
    };

    // Call the API
    console.log('Calling Heart API with input:', apiInput);
    const response = await fetch(API_URLS.heart, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiInput),
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Heart API error response:', errorText);
      throw new Error(`Failed to call Heart API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Heart API response:', result);

    // Transform the response to match our application's format
    return {
      predictionScore: result.probability || 0,
      riskLevel: getRiskLevelFromProbability(result.probability),
      recommendation: result.message || getDefaultRecommendation('heart'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error calling Heart API:', error);
    throw error;
  }
}

/**
 * Call the Kidney Disease prediction API on Hugging Face Spaces
 */
export async function callKidneyAPI(input: KidneyInput): Promise<KidneyPrediction> {
  try {
    // Map the input to the expected API format
    const apiInput = {
      age: input.Age,
      bloodPressure: input.BloodPressure,
      specificGravity: input.SpecificGravity,
      albumin: input.Albumin,
      sugar: input.Sugar,
      redBloodCells: input.RedBloodCells,
      pus: input.PusCells === 'normal' ? 0 : 1,
      pusCellClumps: input.PusCellClumps,
      bacteria: input.Bacteria,
      bloodGlucose: input.BloodGlucoseRandom,
      bloodUrea: input.BloodUrea,
      serumCreatinine: input.SerumCreatinine,
      sodium: input.Sodium,
      potassium: input.Potassium,
      hemoglobin: input.Hemoglobin,
      packedCellVolume: input.PackedCellVolume,
      whiteBloodCellCount: input.WhiteBloodCellCount,
      redBloodCellCount: input.RedBloodCellCount,
      hypertension: input.Hypertension,
      diabetesMellitus: input.DiabetesMellitus,
      coronaryArteryDisease: input.CoronaryArteryDisease,
      appetite: input.Appetite,
      pedalEdema: input.PedalEdema,
      anemia: input.Anemia
    };

    // Call the API
    console.log('Calling Kidney API with input:', apiInput);
    const response = await fetch(API_URLS.kidney, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(apiInput),
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kidney API error response:', errorText);
      throw new Error(`Failed to call Kidney API: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Kidney API response:', result);

    // Transform the response to match our application's format
    return {
      predictionScore: result.probability || 0,
      riskLevel: getRiskLevelFromProbability(result.probability),
      recommendation: result.message || getDefaultRecommendation('kidney'),
      isMockPrediction: false
    };
  } catch (error) {
    console.error('Error calling Kidney API:', error);
    throw error;
  }
}

/**
 * Helper function to determine risk level from probability
 */
function getRiskLevelFromProbability(probability: number): 'low' | 'moderate' | 'high' {
  if (probability < 0.3) return 'low';
  if (probability < 0.7) return 'moderate';
  return 'high';
}

/**
 * Get default recommendation if API doesn't provide one
 */
function getDefaultRecommendation(modelType: 'diabetes' | 'heart' | 'kidney'): string {
  switch (modelType) {
    case 'diabetes':
      return 'We recommend consulting with a healthcare professional about your diabetes risk factors.';
    case 'heart':
      return 'We recommend consulting with a healthcare professional about your heart health risk factors.';
    case 'kidney':
      return 'We recommend consulting with a healthcare professional about your kidney health risk factors.';
    default:
      return 'Please consult with a healthcare professional for personalized advice.';
  }
} 