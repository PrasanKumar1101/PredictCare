"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#0a0c16] text-white text-center">
      <motion.div
        className="max-w-4xl mx-auto space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Your Health Your Future Our Expertise
        </h1>
        
        <p className="text-lg md:text-xl opacity-90">
          Advanced AI-powered disease prediction that gives you peace of mind in just 60 seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/start" 
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-medium"
            >
              Start Now <ArrowRight size={16} />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/chat" 
              className="flex items-center justify-center gap-2 border border-white/40 px-6 py-3 rounded-md font-medium"
            >
              Chat with AI
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 