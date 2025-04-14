"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header 
      className="w-full py-4 px-4 md:px-8 flex justify-between items-center bg-white/5 backdrop-blur-lg dark:bg-[#0a0c16]/80 text-gray-900 dark:text-white border-b border-gray-200/10 dark:border-white/5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-xl font-bold">HealthPredict</Link>
      
      <div className="hidden md:flex space-x-8">
        <Link href="#features" className="hover:text-blue-500 transition-colors">Your Health</Link>
        <Link href="/assessment" className="hover:text-blue-500 transition-colors">Risk Assessment</Link>
        <Link href="#testimonials" className="hover:text-blue-500 transition-colors">Our Expertise</Link>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200/20 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <Link 
          href="/custom-sign-in"
          className="hidden md:flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-200/20 dark:hover:bg-white/10 transition-colors"
        >
          <LogIn size={16} />
          <span>Sign In</span>
        </Link>
        
        <Link 
          href="/custom-sign-up"
          className="hidden md:flex items-center gap-1 text-sm font-medium bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlus size={16} />
          <span>Sign Up</span>
        </Link>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      
      {isMenuOpen && (
        <motion.div 
          className="absolute top-16 right-0 left-0 mx-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-4 md:hidden z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link 
            href="#features" 
            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Your Health
          </Link>
          <Link 
            href="/assessment" 
            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Risk Assessment
          </Link>
          <Link 
            href="#testimonials" 
            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Expertise
          </Link>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex flex-col space-y-3">
            <Link 
              href="/custom-sign-in" 
              className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn size={16} />
              Sign In
            </Link>
            <Link 
              href="/custom-sign-up" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlus size={16} />
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
} 