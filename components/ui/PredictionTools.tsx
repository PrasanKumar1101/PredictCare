"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, Activity, Droplet } from "lucide-react";

interface PredictionToolProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const PredictionTool = ({ title, description, icon, link }: PredictionToolProps) => {
  return (
    <motion.div
      className="p-6 rounded-lg border border-white/10 bg-[#0f1123] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
      </div>
      <p className="text-sm md:text-base opacity-80 mb-6">{description}</p>
      <motion.div
        className="mt-auto"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Link 
          href={link} 
          className="flex items-center text-sm md:text-base font-medium"
        >
          Check Your Risk <ArrowRight size={16} className="ml-2" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default function PredictionTools() {
  const tools = [
    {
      id: 1,
      title: "Diabetes Prediction",
      description: "Know your risk before symptoms appear. Our AI analyzes your metrics to spot patterns humans miss.",
      icon: <Activity size={24} className="text-primary" />,
      link: "/diabetes"
    },
    {
      id: 2,
      title: "Heart Disease Prediction",
      description: "Your heart deserves the best care. Get personalized insights based on your unique health profile.",
      icon: <Heart size={24} className="text-primary" />,
      link: "/heart"
    },
    {
      id: 3,
      title: "Kidney Disease Prediction",
      description: "Early detection saves lives. Our AI identifies subtle warning signs that traditional tests might miss.",
      icon: <Droplet size={24} className="text-primary" />,
      link: "/kidney"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-[#0a0c16] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Cutting-Edge Health Prediction Tools</h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Our AI-powered tools analyze your health data to provide accurate predictions and recommendations.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <PredictionTool 
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              link={tool.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 