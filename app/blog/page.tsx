'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Animation variants
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

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Understanding Diabetes Risk Factors',
    excerpt: 'Learn about the key risk factors for diabetes and how AI is helping to identify them earlier than ever before.',
    date: 'May 15, 2024',
    category: 'Diabetes',
    imageUrl: '/images/blog/diabetes.jpg'
  },
  {
    id: 2,
    title: 'The Future of AI in Predictive Healthcare',
    excerpt: 'How machine learning algorithms are revolutionizing the way we predict and prevent chronic diseases.',
    date: 'May 8, 2024',
    category: 'Technology',
    imageUrl: '/images/blog/ai-health.jpg'
  },
  {
    id: 3,
    title: 'Heart Disease Prevention: Latest Research',
    excerpt: 'Recent studies show promising advancements in early detection and prevention strategies for heart disease.',
    date: 'April 30, 2024',
    category: 'Heart Health',
    imageUrl: '/images/blog/heart.jpg'
  },
  {
    id: 4,
    title: 'Kidney Health: Signs You Shouldn\'t Ignore',
    excerpt: 'Understanding the subtle warning signs of kidney disease that often go unnoticed until it\'s too late.',
    date: 'April 22, 2024',
    category: 'Kidney Health',
    imageUrl: '/images/blog/kidney.jpg'
  },
  {
    id: 5,
    title: 'Nutrition and Disease Prevention',
    excerpt: 'How diet plays a crucial role in preventing chronic diseases and what foods you should incorporate into your meals.',
    date: 'April 15, 2024',
    category: 'Nutrition',
    imageUrl: '/images/blog/nutrition.jpg'
  },
  {
    id: 6,
    title: 'Data Privacy in Health Tech',
    excerpt: 'Exploring the balance between innovative health prediction and protecting user data privacy.',
    date: 'April 8, 2024',
    category: 'Privacy',
    imageUrl: '/images/blog/privacy.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            HealthPredict Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Latest insights on health prediction, disease prevention, and the technology behind our AI models.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div 
              key={post.id} 
              variants={fadeIn} 
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-300 dark:bg-gray-700">
                {/* Placeholder for image */}
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Image Placeholder
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    {post.category}
                  </span>
                  <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read More
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeIn} className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Subscribe to our newsletter to get the latest articles delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 min-w-0 px-4 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 