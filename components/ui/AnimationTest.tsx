"use client";

import { motion } from "framer-motion";

export default function AnimationTest() {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Animation Tests</h2>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Tailwind Animations</h3>
        
        <div className="flex flex-col space-y-4">
          <div className="p-4 border rounded-lg overflow-hidden">
            <div className="h-8 w-full bg-primary/20 rounded-md animate-accordion-down">
              Accordion Down
            </div>
          </div>
          
          <div className="relative w-full max-w-md overflow-hidden">
            <div className="whitespace-nowrap flex items-center gap-4 animate-marquee">
              <span>Marquee Animation Item 1</span>
              <span>Marquee Animation Item 2</span>
              <span>Marquee Animation Item 3</span>
              <span>Marquee Animation Item 4</span>
            </div>
          </div>
          
          <div>
            <span className="inline-block bg-gradient-to-r from-transparent via-primary/70 to-transparent bg-[length:var(--shiny-width)_100%] animate-shiny-text">
              This text has a shiny animation
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Framer Motion Animations</h3>
        
        <div className="flex space-x-4">
          <motion.div
            className="h-20 w-20 bg-primary rounded-lg"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
          
          <motion.div
            className="h-20 w-20 bg-secondary rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          
          <motion.div
            className="h-20 w-20 bg-accent rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)"
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>
      </div>
    </div>
  );
} 