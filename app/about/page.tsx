'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Heart, Brain, Microscope, Clock, Globe } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const teamMembers = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Founder & Chief Medical Officer',
    bio: 'Cardiologist with 15 years of experience and a passion for preventive medicine. Sarah founded HealthPredict to democratize access to health risk assessment.',
    image: '/team/sarah.jpg'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    bio: 'AI researcher with a Ph.D. in Machine Learning from Stanford. Michael leads our team of data scientists in building and refining our prediction models.',
    image: '/team/michael.jpg'
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Research Director',
    bio: 'Epidemiologist and public health expert who oversees clinical validation of our prediction models and ensures scientific accuracy of all health information.',
    image: '/team/aisha.jpg'
  },
  {
    name: 'David Kim',
    role: 'Head of Product',
    bio: 'Former healthtech executive with expertise in building user-centered digital health products that are both effective and accessible.',
    image: '/team/david.jpg'
  }
];

const values = [
  {
    icon: <Heart className="h-6 w-6 text-red-500" />,
    title: 'Compassion',
    description: 'We believe in treating users with empathy and understanding, especially when dealing with sensitive health information.'
  },
  {
    icon: <Award className="h-6 w-6 text-blue-500" />,
    title: 'Excellence',
    description: 'We are committed to the highest standards of scientific accuracy and technical performance in our prediction tools.'
  },
  {
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    title: 'Innovation',
    description: 'We continuously push the boundaries of what\'s possible in health prediction technology to provide better insights.'
  },
  {
    icon: <Microscope className="h-6 w-6 text-green-500" />,
    title: 'Transparency',
    description: 'We are open about how our models work, their limitations, and how we use data to build trust with our users.'
  },
  {
    icon: <Clock className="h-6 w-6 text-amber-500" />,
    title: 'Prevention',
    description: 'We believe early detection and prevention are key to better health outcomes and reduced healthcare costs.'
  },
  {
    icon: <Globe className="h-6 w-6 text-teal-500" />,
    title: 'Accessibility',
    description: 'We strive to make our tools available to everyone, regardless of geographic location or socioeconomic status.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Our Mission
            </h1>
            <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed">
              To empower individuals to take control of their health through accurate, accessible, and actionable disease prediction.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-blue-900 opacity-30"></div>
      </motion.div>

      {/* Story Section */}
      <motion.section 
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeIn}
              className="rounded-lg bg-gray-200 dark:bg-gray-800 h-80 flex items-center justify-center"
            >
              <p className="text-gray-500 dark:text-gray-400">Image Placeholder</p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                From Vision to Reality
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  HealthPredict began in 2022 when Dr. Sarah Johnson, a cardiologist, became frustrated by seeing patients only after they had developed advanced disease. She envisioned a tool that could identify risk factors years before symptoms appeared.
                </p>
                <p>
                  Partnering with AI researcher Michael Chen, they assembled a team of medical experts and data scientists to develop machine learning models trained on anonymized health records from millions of patients.
                </p>
                <p>
                  After two years of development and rigorous clinical validation, HealthPredict launched with three prediction tools focused on the most common chronic diseases: diabetes, heart disease, and kidney disease.
                </p>
                <p>
                  Today, our platform has helped over 500,000 users assess their disease risk and take preventive action, potentially saving thousands of lives through early intervention.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do at HealthPredict.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A passionate group of healthcare professionals, data scientists, and product experts united by our mission.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
              >
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">Photo Placeholder</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8">
            Help us transform healthcare through early detection and prevention.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a 
              href="/careers"
              className="px-8 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition-colors"
            >
              Careers
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 