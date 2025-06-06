"use client";

import { motion } from "framer-motion";

interface AnimatedComponentProps {
  children: React.ReactNode;
}

export default function AnimatedComponent({ children }: AnimatedComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
} 