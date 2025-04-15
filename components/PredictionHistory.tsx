'use client';

import { useState, useEffect } from 'react';
import { Activity, Heart, Pill, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';

interface Prediction {
  _id: string;
  predictionType: 'diabetes' | 'heart' | 'kidney';
  predictionDate: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  recommendation: string;
}

export default function PredictionHistory() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchPredictions() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get the authentication token
        const token = await getToken();
        
        // Fetch predictions from the API
        const response = await fetch('/api/predictions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching predictions: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPredictions(data.predictions || []);
      } catch (err) {
        console.error('Error fetching predictions:', err);
        setError('Failed to load prediction history');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPredictions();
  }, [getToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Loading predictions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">No prediction history found.</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete a health assessment to see your results here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction, index) => (
        <motion.div
          key={prediction._id}
          className={`flex items-center p-4 rounded-lg ${
            prediction.predictionType === 'diabetes' 
              ? 'bg-blue-50 dark:bg-blue-900/20' 
              : prediction.predictionType === 'heart'
              ? 'bg-red-50 dark:bg-red-900/20'
              : 'bg-purple-50 dark:bg-purple-900/20'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className={`p-3 rounded-full ${
            prediction.predictionType === 'diabetes' 
              ? 'bg-blue-100 dark:bg-blue-800' 
              : prediction.predictionType === 'heart'
              ? 'bg-red-100 dark:bg-red-800'
              : 'bg-purple-100 dark:bg-purple-800'
          } mr-4`}>
            {prediction.predictionType === 'diabetes' && <Activity className="h-5 w-5 text-blue-700 dark:text-blue-300" />}
            {prediction.predictionType === 'heart' && <Heart className="h-5 w-5 text-red-700 dark:text-red-300" />}
            {prediction.predictionType === 'kidney' && <Pill className="h-5 w-5 text-purple-700 dark:text-purple-300" />}
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
              {prediction.predictionType} Risk Assessment
            </h3>
            <div className="flex items-center mt-1">
              <Calendar size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(prediction.predictionDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            prediction.riskLevel === 'low' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
              : prediction.riskLevel === 'medium'
              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }`}>
            {prediction.riskLevel} risk ({prediction.riskScore.toFixed(2)})
          </div>
        </motion.div>
      ))}
    </div>
  );
} 