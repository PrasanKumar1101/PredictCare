'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How accurate are the health predictions?',
    answer: 'Our AI models have been trained on extensive medical datasets and validated through clinical studies. The diabetes prediction model has an accuracy of 97%, the heart disease model 95%, and the kidney disease model 94%. However, these predictions should be used as a screening tool and not as a substitute for medical advice.'
  },
  {
    question: 'Is my health data secure?',
    answer: 'Yes, we take data security very seriously. All your personal and health data is encrypted and stored securely. We never share your data with third parties without your explicit consent. Our platform is HIPAA-compliant and follows industry best practices for data protection.'
  },
  {
    question: 'How does the prediction process work?',
    answer: 'Our AI algorithms analyze various health metrics that you input into the system. These metrics are processed through our machine learning models which have been trained on millions of patient records. The models identify patterns and correlations that may indicate risk for specific conditions, providing you with a risk assessment and personalized recommendations.'
  },
  {
    question: 'Do I need to create an account to use the prediction tools?',
    answer: 'You can use the basic prediction tools without creating an account. However, creating a free account allows you to save your prediction history, track changes over time, and receive personalized health insights based on your results.'
  },
  {
    question: 'Can I use HealthPredict for medical diagnosis?',
    answer: 'No, HealthPredict is not intended for diagnosis. Our tools provide risk assessments that can help you understand your health status better and identify potential areas of concern. Always consult with a healthcare professional for proper diagnosis and treatment.'
  },
  {
    question: 'How often should I check my health predictions?',
    answer: 'For general monitoring, we recommend checking your health predictions every 3-6 months. However, if you make significant lifestyle changes or experience new symptoms, you may want to check more frequently. Always follow your healthcare provider\'s advice regarding monitoring schedules.'
  },
  {
    question: 'Are the prediction tools suitable for everyone?',
    answer: 'Our prediction tools are designed for adults 18 years and older. They may not be suitable for pregnant women or individuals with certain pre-existing conditions. The tools are currently optimized for general population screening and may have varying accuracy for different demographic groups.'
  },
  {
    question: 'What should I do if I receive a high-risk prediction?',
    answer: 'If you receive a high-risk prediction, we recommend consulting with a healthcare professional. Share your prediction results with them as a starting point for discussion. Remember that a high-risk prediction is not a diagnosis but an indication that further evaluation may be beneficial.'
  },
  {
    question: 'How can I improve my prediction scores?',
    answer: 'Our system provides personalized recommendations based on your results. Generally, maintaining a healthy diet, regular physical activity, adequate sleep, stress management, and avoiding tobacco and excessive alcohol can improve your health metrics. Follow the specific recommendations provided after your assessment.'
  },
  {
    question: 'Does HealthPredict replace regular health check-ups?',
    answer: 'No, HealthPredict is designed to complement, not replace, regular health check-ups. Our tools can help you monitor your health between visits and provide talking points for discussions with your healthcare provider.'
  }
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get answers to common questions about HealthPredict and our AI-powered health predictions.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => setOpenItem(openItem === index ? null : index)}
                aria-expanded={openItem === index}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openItem === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our support team is here to help you with any questions or concerns.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
} 