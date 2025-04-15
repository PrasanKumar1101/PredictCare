"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-gray-100 dark:bg-[#070810] text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">HealthPredict</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Advanced AI-powered disease prediction for better health outcomes.</p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Prediction Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/diabetes" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Diabetes</Link></li>
              <li><Link href="/heart" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Heart Disease</Link></li>
              <li><Link href="/kidney" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Kidney Disease</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">FAQ</Link></li>
              <li><Link href="/research" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} HealthPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 