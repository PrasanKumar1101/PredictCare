'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Activity, Heart, Pill, 
  ChevronRight, 
  Upload, Shield, 
  BarChart3, Bell, Settings 
} from 'lucide-react';
import PredictionHistory from '@/components/PredictionHistory';

// Sample user data - in a real app, this would come from an API
const sampleUserData = {
  healthMetrics: {
    height: 175, // cm
    weight: 70, // kg
    bloodPressure: '120/80',
    lastUpdated: '2023-04-01'
  }
};

export default function DashboardPage() {
  const { isLoaded, userId } = useAuth();
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-14 w-14"
                  }
                }}
              />
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
            
            <PredictionHistory />
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