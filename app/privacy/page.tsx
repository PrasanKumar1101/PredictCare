'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Last updated: June 1, 2024
          </p>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="prose prose-blue max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
            <p className="text-lg">
              At HealthPredict, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul>
              <li>Create an account</li>
              <li>Use our health prediction tools</li>
              <li>Fill out forms or surveys</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            
            <p>
              This information may include:
            </p>
            <ul>
              <li>Personal identifiers (name, email address)</li>
              <li>Health information you provide for predictions</li>
              <li>Demographics and medical history</li>
              <li>User-generated content (feedback, comments)</li>
            </ul>
            
            <p>
              We also automatically collect certain information when you use our platform, including:
            </p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and usage patterns</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process and deliver prediction results</li>
              <li>Personalize your experience</li>
              <li>Send important notifications and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
            
            <h2>Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
            </p>
            <ul>
              <li>With your express consent</li>
              <li>To trusted third parties who assist us in operating our website and providing services</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
            </ul>
            
            <p>
              All third-party service providers are required to maintain the confidentiality and security of your information and may only process it for the purposes we specify.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information, including:
            </p>
            <ul>
              <li>Encryption of sensitive information</li>
              <li>Secure networks and servers</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
            </ul>
            
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            
            <h2>Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Accessing, updating, or deleting your information</li>
              <li>Objecting to our processing of your data</li>
              <li>Requesting portability of your information</li>
              <li>Opting out of marketing communications</li>
              <li>Withdrawing consent (where processing is based on consent)</li>
            </ul>
            
            <p>
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so that we can delete such information.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new effective date. Your continued use of our services after such modifications constitutes your acknowledgment of the modified Privacy Policy.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              Email: privacy@healthpredict.ai<br />
              Address: 123 Innovation Drive, Boston, MA 02110, United States<br />
              Phone: +1 (555) 123-4567
            </p>
            
            <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
              <p className="mb-4">
                For more information about your privacy rights or if you are not satisfied with our response to your concerns, you may also contact your local data protection authority.
              </p>
              <p>
                By using our services, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 