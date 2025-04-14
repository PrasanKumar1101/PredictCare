"use client";

import { motion } from "framer-motion";

const stats = [
  { id: 1, value: "97%", label: "Accuracy in clinical tests" },
  { id: 2, value: "60 sec", label: "Fast results in under a minute" },
  { id: 3, value: "24/7", label: "Always available when you need it" }
];

export default function Stats() {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#0a0c16] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center p-6 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.p 
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1,
                  type: "spring"
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm md:text-base opacity-80">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 