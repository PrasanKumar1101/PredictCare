'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DiabetesInput, DiabetesPrediction } from '../interfaces';
import { loadModel, predictDiabetes } from '../services/tensorflow';
import { AlertCircle } from 'lucide-react';

export default function DiabetesPage() {
  const [formData, setFormData] = useState<DiabetesInput>({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0,
    DiabetesPedigreeFunction: 0,
    Age: 0
  });

  const [prediction, setPrediction] = useState<DiabetesPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  // Initialize TensorFlow.js when component mounts
  useEffect(() => {
    async function initTensorFlow() {
      try {
        await loadModel('diabetes');
        setModelStatus('ready');
        setError(null);
      } catch (err) {
        console.error('Error initializing TensorFlow model:', err);
        setModelStatus('error');
        setError('Unable to load the prediction model. Using fallback predictions.');
      }
    }

    initTensorFlow();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the TensorFlow.js service to make predictions
      const result = await predictDiabetes(formData);
      setPrediction(result);
      
      // Display warning if using mock model
      if (result.isMockPrediction) {
        setError('Using simulated predictions as the model could not be loaded.');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError('An error occurred during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/assessment" className="flex items-center text-blue-600 dark:text-blue-400 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Assessments
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-6">Diabetes Risk Prediction</h1>
          
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
                  Pregnancies
                </label>
                <input
                  type="number"
                  name="Pregnancies"
                  value={formData.Pregnancies}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Glucose (mg/dL)
                </label>
                <input
                  type="number"
                  name="Glucose"
                  value={formData.Glucose}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Skin Thickness (mm)
                </label>
                <input
                  type="number"
                  name="SkinThickness"
                  value={formData.SkinThickness}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Insulin (μU/ml)
                </label>
                <input
                  type="number"
                  name="Insulin"
                  value={formData.Insulin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  BMI (kg/m²)
                </label>
                <input
                  type="number"
                  name="BMI"
                  value={formData.BMI}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Diabetes Pedigree Function
                </label>
                <input
                  type="number"
                  name="DiabetesPedigreeFunction"
                  value={formData.DiabetesPedigreeFunction}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-lg transition-colors"
                disabled={isLoading || modelStatus === 'loading'}
              >
                {isLoading ? 'Processing...' : modelStatus === 'loading' ? 'Loading model...' : 'Predict Diabetes Risk'}
              </button>
            </div>
          </form>

          {prediction && (
            <div className={`mt-8 p-6 rounded-lg ${
              prediction.risk === 'High' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30' :
              prediction.risk === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30' :
              'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30'
            }`}>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Prediction Result</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Prediction</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{prediction.prediction === 1 ? 'Positive' : 'Negative'}</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Probability</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{(prediction.probability * 100).toFixed(2)}%</p>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                  <p className={`text-xl font-bold ${
                    prediction.risk === 'High' ? 'text-red-600 dark:text-red-400' :
                    prediction.risk === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    {prediction.risk}
                  </p>
                </div>
              </div>
              
              {prediction.isMockPrediction && (
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded text-amber-700 dark:text-amber-400 text-sm">
                  <strong>Note:</strong> This is a simulated prediction as the model could not be loaded.
                </div>
              )}
              
              <p className="mt-6 text-gray-600 dark:text-gray-300">
                This is a preliminary assessment. Please consult with a healthcare professional for proper diagnosis and advice.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 