'use client';

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from 'framer-motion';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="p-4">
        <Link href="/" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
      
      <motion.div 
        className="flex flex-1 flex-col justify-center items-center p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join HealthPredict</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Create your account to access all features
              </p>
            </div>
            
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white transition-colors',
                  card: 'bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700',
                  headerTitle: 'text-gray-900 dark:text-white text-xl',
                  headerSubtitle: 'text-gray-600 dark:text-gray-400',
                  socialButtonsBlockButton: 'border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                  formFieldInput: 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500',
                  footer: 'text-gray-600 dark:text-gray-400',
                  footerActionLink: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
                  dividerLine: 'bg-gray-200 dark:bg-gray-700',
                  dividerText: 'text-gray-500 dark:text-gray-400'
                }
              }}
              routing="path"
              path="/custom-sign-up"
              signInUrl="/custom-sign-in"
              redirectUrl="/dashboard"
            />
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            By signing up, you agree to our 
            <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline mx-1">
              Privacy Policy
            </Link>
            and
            <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
              Terms of Service
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 