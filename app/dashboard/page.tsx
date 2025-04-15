'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Activity, Heart, Pill, 
  Calendar, ChevronRight, 
  FileText, Upload, Shield, 
  BarChart3, Bell, Settings 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample user data - in a real app, this would come from an API
const sampleUserData = {
  recentPredictions: [
    { type: 'diabetes', date: '2023-04-15', risk: 'low' },
    { type: 'heart', date: '2023-04-10', risk: 'moderate' }
  ],
  healthMetrics: {
    height: 175, // cm
    weight: 70, // kg
    bloodPressure: '120/80',
    lastUpdated: '2023-04-01'
  }
};

export default function DashboardPage() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Use client-side redirect if not authenticated
  if (isClient && isLoaded && !userId) {
    redirect('/custom-sign-in');
  }

  // Loading state
  if (!isClient || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-200 dark:bg-blue-700 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-48 mb-3"></div>
          <div className="h-3 bg-blue-100 dark:bg-blue-800 rounded w-32"></div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                className="h-14 w-14 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {getInitials(user?.fullName || user?.firstName)}
              </motion.div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {user?.firstName || 'User'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link href="/diabetes" className="flex flex-col items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-center">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Diabetes Check</span>
              </Link>
              
              <Link href="/heart" className="flex flex-col items-center p-4 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-center">
                <Heart className="h-6 w-6 text-red-600 dark:text-red-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Heart Health</span>
              </Link>
              
              <Link href="/kidney" className="flex flex-col items-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-center">
                <Pill className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Kidney Check</span>
              </Link>
              
              <Link href="/upload-prescription" className="flex flex-col items-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-center">
                <Upload className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Upload Prescription</span>
              </Link>
            </div>
          </section>
          
          {/* Recent Predictions */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Predictions
              </h2>
              <Link href="/assessment" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            {sampleUserData.recentPredictions.length > 0 ? (
              <div className="space-y-4">
                {sampleUserData.recentPredictions.map((prediction, index) => (
                  <motion.div
                    key={`${prediction.type}-${prediction.date}`}
                    className={`flex items-center p-4 rounded-lg ${
                      prediction.type === 'diabetes' 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : prediction.type === 'heart'
                        ? 'bg-red-50 dark:bg-red-900/20'
                        : 'bg-purple-50 dark:bg-purple-900/20'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className={`p-3 rounded-full ${
                      prediction.type === 'diabetes' 
                        ? 'bg-blue-100 dark:bg-blue-800' 
                        : prediction.type === 'heart'
                        ? 'bg-red-100 dark:bg-red-800'
                        : 'bg-purple-100 dark:bg-purple-800'
                    } mr-4`}>
                      {prediction.type === 'diabetes' && <Activity className="h-5 w-5 text-blue-700 dark:text-blue-300" />}
                      {prediction.type === 'heart' && <Heart className="h-5 w-5 text-red-700 dark:text-red-300" />}
                      {prediction.type === 'kidney' && <Pill className="h-5 w-5 text-purple-700 dark:text-purple-300" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                        {prediction.type} Risk Assessment
                      </h3>
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="text-gray-500 dark:text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(prediction.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      prediction.risk === 'low' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                        : prediction.risk === 'moderate'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {prediction.risk} risk
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p>No predictions yet.</p>
                <p className="text-sm mt-1">Start by checking your health risk with one of our tools.</p>
              </div>
            )}
          </section>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Health Metrics */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Health Metrics
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                Update
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Height</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {sampleUserData.healthMetrics.height} cm
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Weight</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {sampleUserData.healthMetrics.weight} kg
                </span>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">BMI</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {(sampleUserData.healthMetrics.weight / ((sampleUserData.healthMetrics.height/100) ** 2)).toFixed(1)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Blood Pressure</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {sampleUserData.healthMetrics.bloodPressure}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              Last updated: {new Date(sampleUserData.healthMetrics.lastUpdated).toLocaleDateString()}
            </div>
          </section>
          
          {/* Health Tips */}
          <section className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 mr-2" />
              <h2 className="text-lg font-semibold">
                Health Tips
              </h2>
            </div>
            
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="inline-block rounded-full bg-white/20 p-1 mr-2 mt-0.5">
                  <BarChart3 size={14} />
                </span>
                <span>Regular blood pressure monitoring can help identify hypertension early.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block rounded-full bg-white/20 p-1 mr-2 mt-0.5">
                  <Activity size={14} />
                </span>
                <span>Aim for at least 30 minutes of moderate exercise 5 days a week.</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block rounded-full bg-white/20 p-1 mr-2 mt-0.5">
                  <Heart size={14} />
                </span>
                <span>Reduce salt intake to help maintain healthy blood pressure levels.</span>
              </li>
            </ul>
            
            <button className="w-full mt-4 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-lg text-sm font-medium">
              View All Tips
            </button>
          </section>
        </div>
      </div>
    </div>
  );
} 