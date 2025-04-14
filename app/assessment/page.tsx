"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Heart, Droplet, ArrowRight } from "lucide-react";

export default function AssessmentSelection() {
  const assessments = [
    {
      id: 1,
      title: "Diabetes Risk Assessment",
      description: "Predict your risk of developing diabetes based on your health metrics and lifestyle factors.",
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      link: "/diabetes",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      title: "Heart Disease Risk Assessment",
      description: "Evaluate your cardiovascular health and identify potential risk factors for heart disease.",
      icon: <Heart className="h-10 w-10 text-red-500" />,
      link: "/heart",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    {
      id: 3,
      title: "Kidney Disease Risk Assessment",
      description: "Analyze your kidney health metrics to detect early warning signs of kidney disease.",
      icon: <Droplet className="h-10 w-10 text-purple-500" />,
      link: "/kidney",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Choose Your Health Assessment
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select one of our AI-powered risk assessments to get personalized insights about your health.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-1">
          {assessments.map((assessment, index) => (
            <motion.div
              key={assessment.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={assessment.link}>
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className={`${assessment.bgColor} p-4 rounded-full mb-6 md:mb-0 md:mr-6 inline-flex`}>
                      {assessment.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {assessment.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {assessment.description}
                      </p>
                      <div className="flex items-center text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent from-blue-600 to-blue-400">
                        Begin Assessment
                        <ArrowRight size={16} className="ml-2 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 