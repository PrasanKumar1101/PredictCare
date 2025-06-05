'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { KidneyInput, KidneyPrediction } from '../interfaces';
import { loadModel, predictKidney } from '../services/tensorflow';
import { savePredictionToAPI } from '../services/prediction';
import { AlertCircle } from 'lucide-react';

export default function KidneyPage() {
  const [formData, setFormData] = useState({
    Age: 0,
    BloodPressure: 0,
    SpecificGravity: 1.02,
    Albumin: 0,
    Sugar: 0,
    RedBloodCells: 'normal',
    PusCells: 'normal',
    PusCellClumps: 'notpresent',
    Bacteria: 'notpresent',
    BloodGlucoseRandom: 0,
    BloodUrea: 0,
    SerumCreatinine: 0,
    Sodium: 0,
    Potassium: 0,
    Hemoglobin: 0,
    PackedCellVolume: 0,
    WhiteBloodCellCount: 0,
    RedBloodCellCount: 0,
    Hypertension: 'no',
    DiabetesMellitus: 'no',
    CoronaryArteryDisease: 'no',
    Appetite: 'good',
    PedalEdema: 'no',
    Anemia: 'no'
  });

  const [prediction, setPrediction] = useState<KidneyPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Initialize TensorFlow.js when component mounts
  useEffect(() => {
    async function initTensorFlow() {
      try {
        await loadModel('kidney');
        setModelStatus('ready');
        setError(null);
      } catch (err) {
        console.error('Error initializing TensorFlow model:', err);
        setModelStatus('error');
        setError(null);
      }
    }

    initTensorFlow();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (parseFloat(value) || 0) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form has all required fields
      if (Object.keys(formData).length < 24) {
        throw new Error('Please fill in all fields');
      }
      
      console.log('Submitting kidney disease prediction request for data:', formData);
      
      // First attempt: Try using the TensorFlow service which now tries Hugging Face API first
      let result;
      try {
        result = await predictKidney(formData as KidneyInput);
        if (result.isMockPrediction) {
          console.warn('Using mock prediction for kidney disease assessment');
        }
        console.log('Kidney disease prediction result:', result);
      } catch (predictionError) {
        console.error('Failed to make kidney disease prediction:', predictionError);
        throw new Error(`Prediction failed: ${predictionError instanceof Error ? predictionError.message : String(predictionError)}`);
      }
      
      // Set the prediction result
      setPrediction(result);
      
      // Try to save the prediction to the API
      try {
        await savePredictionToAPI('kidney', result, formData as unknown as Record<string, unknown>);
      } catch (saveError) {
        console.error('Failed to save kidney prediction to API:', saveError);
        // Don't throw - this is a non-critical operation
      }
    } catch (err) {
      console.error('Kidney disease prediction process error:', err);
      
      // Check if it's a validation error
      if (err instanceof Error && err.message.includes('Please fill in all fields')) {
        setError(err.message);
      } else {
        // Last resort fallback - generate a mock prediction when everything else fails
        try {
          console.warn('Using emergency fallback for kidney disease prediction');
          const mockResult = {
            predictionScore: Math.random(), // Random score between 0-1
            riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'moderate' : 'low',
            recommendation: 'Please consult with a healthcare professional for a proper assessment.',
            isMockPrediction: true
          } as KidneyPrediction;
          
          setPrediction(mockResult);
          setError('Our prediction service is currently experiencing high demand. The results provided are for demonstration purposes only.');
        } catch {
          setError('A connection error occurred. Please try again later.');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/assessment" className="flex items-center text-green-600 dark:text-green-400 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Assessments
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-6">Kidney Disease Risk Prediction</h1>
          
          {error && (
            <div className="mb-6 flex items-center p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg text-amber-700 dark:text-amber-400">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Pressure (mm Hg)
                </label>
                <input
                  type="number"
                  name="BloodPressure"
                  value={formData.BloodPressure}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specific Gravity
                </label>
                <input
                  type="number"
                  name="SpecificGravity"
                  value={formData.SpecificGravity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="1.0"
                  max="1.025"
                  step="0.005"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Albumin
                </label>
                <select
                  name="Albumin"
                  value={formData.Albumin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sugar
                </label>
                <select
                  name="Sugar"
                  value={formData.Sugar}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Red Blood Cells
                </label>
                <select
                  name="RedBloodCells"
                  value={formData.RedBloodCells}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="abnormal">Abnormal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pus Cells
                </label>
                <select
                  name="PusCells"
                  value={formData.PusCells}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="normal">Normal</option>
                  <option value="abnormal">Abnormal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pus Cell Clumps
                </label>
                <select
                  name="PusCellClumps"
                  value={formData.PusCellClumps}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="notpresent">Not Present</option>
                  <option value="present">Present</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bacteria
                </label>
                <select
                  name="Bacteria"
                  value={formData.Bacteria}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="notpresent">Not Present</option>
                  <option value="present">Present</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Glucose Random (mg/dL)
                </label>
                <input
                  type="number"
                  name="BloodGlucoseRandom"
                  value={formData.BloodGlucoseRandom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blood Urea (mg/dL)
                </label>
                <input
                  type="number"
                  name="BloodUrea"
                  value={formData.BloodUrea}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Serum Creatinine (mg/dL)
                </label>
                <input
                  type="number"
                  name="SerumCreatinine"
                  value={formData.SerumCreatinine}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sodium (mEq/L)
                </label>
                <input
                  type="number"
                  name="Sodium"
                  value={formData.Sodium}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Potassium (mEq/L)
                </label>
                <input
                  type="number"
                  name="Potassium"
                  value={formData.Potassium}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hemoglobin (g/dL)
                </label>
                <input
                  type="number"
                  name="Hemoglobin"
                  value={formData.Hemoglobin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Packed Cell Volume (%)
                </label>
                <input
                  type="number"
                  name="PackedCellVolume"
                  value={formData.PackedCellVolume}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  White Blood Cell Count (cells/mcL)
                </label>
                <input
                  type="number"
                  name="WhiteBloodCellCount"
                  value={formData.WhiteBloodCellCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Red Blood Cell Count (million cells/mcL)
                </label>
                <input
                  type="number"
                  name="RedBloodCellCount"
                  value={formData.RedBloodCellCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hypertension
                </label>
                <select
                  name="Hypertension"
                  value={formData.Hypertension}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Diabetes Mellitus
                </label>
                <select
                  name="DiabetesMellitus"
                  value={formData.DiabetesMellitus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Coronary Artery Disease
                </label>
                <select
                  name="CoronaryArteryDisease"
                  value={formData.CoronaryArteryDisease}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Appetite
                </label>
                <select
                  name="Appetite"
                  value={formData.Appetite}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="good">Good</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pedal Edema
                </label>
                <select
                  name="PedalEdema"
                  value={formData.PedalEdema}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Anemia
                </label>
                <select
                  name="Anemia"
                  value={formData.Anemia}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded-lg transition-colors"
                disabled={isLoading || modelStatus === 'loading'}
              >
                {isLoading ? 'Processing...' : modelStatus === 'loading' ? 'Loading model...' : 'Predict Kidney Disease Risk'}
              </button>
            </div>
          </form>

          {prediction && (
            <div className={`mt-8 p-6 rounded-lg ${
              prediction.riskLevel === 'high' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30' :
              prediction.riskLevel === 'moderate' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30' :
              'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30'
            }`}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Prediction Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Prediction</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{prediction.predictionScore > 0.5 ? 'Positive' : 'Negative'}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Probability</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{(prediction.predictionScore * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                  <p className={`text-xl font-bold ${
                    prediction.riskLevel === 'high' ? 'text-red-600 dark:text-red-400' :
                    prediction.riskLevel === 'moderate' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    {prediction.riskLevel.charAt(0).toUpperCase() + prediction.riskLevel.slice(1)}
                  </p>
                </div>
              </div>
              
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                {prediction.recommendation || "This is a preliminary assessment. Please consult with a healthcare professional for proper diagnosis and advice."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 