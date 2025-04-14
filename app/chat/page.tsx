'use client';

import Link from 'next/link';
import Chatbot from '@/components/chatbot/Chatbot';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-blue-600 dark:text-blue-400 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-6">Brain Health Assistant</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Chat with our AI-powered brain health assistant to get answers to your questions about brain health,
              neurological wellness, memory improvement, and cognitive function.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our assistant provides educational information based on the latest research, but remember that it does not
              provide medical advice. Always consult with a healthcare professional for medical concerns.
            </p>
          </div>
          
          <Chatbot />
          
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            <p>Powered by Google{"'"}s Gemini AI. Responses are generated for educational purposes only and should not be considered medical advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 