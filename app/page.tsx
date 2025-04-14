'use client';

import Link from "next/link";
import { ArrowRight, Check, HeartPulse, Award, Clock, Shield } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Stats from "@/components/ui/Stats";
import PredictionTools from "@/components/ui/PredictionTools";
import Testimonials from "@/components/ui/Testimonials";
import Footer from "@/components/ui/Footer";
// Remove the AnimationTest component for now to simplify debugging
// import AnimationTest from "@/components/ui/AnimationTest";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0c16] text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6 tracking-tight">
            Predict Health Issues Before They Happen
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            AI-powered disease prediction with 97% accuracy in just 60 seconds. Take control of your health today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/assessment" 
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all shadow-[0_0_0_3px_rgba(59,130,246,0.3)] hover:shadow-[0_0_0_6px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2"
            >
              Start Now 
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="#features" 
              className="bg-transparent border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-medium transition-all hover:bg-white/5"
            >
              Learn How It Works
            </Link>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="text-green-500" size={20} />
              <span>97% Accuracy</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="text-green-500" size={20} />
              <span>60-Second Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="text-green-500" size={20} />
              <span>3 Disease Predictors</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Check className="text-green-500" size={20} />
              <span>Free Risk Assessment</span>
            </div>
          </div>
        </div>
        
        {/* Gradient background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section id="features" className="py-20 px-4 md:px-8 bg-[#0c0e1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              The 3 Pillars of HealthPredict
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our technology gives you an unfair advantage against disease, letting you act years before symptoms appear.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-[#0f1123] p-8 rounded-xl border border-gray-800">
              <div className="w-14 h-14 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
                <HeartPulse className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Early Detection</h3>
              <p className="text-gray-400">
                Identify risk factors 5-10 years before conventional tests would show warning signs, giving you time to make lifestyle changes.
              </p>
            </div>
            
            <div className="bg-[#0f1123] p-8 rounded-xl border border-gray-800">
              <div className="w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
                <Award className="text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">97% Accuracy</h3>
              <p className="text-gray-400">
                Our AI models have been trained on millions of patient records and validated through rigorous clinical trials.
              </p>
            </div>
            
            <div className="bg-[#0f1123] p-8 rounded-xl border border-gray-800">
              <div className="w-14 h-14 rounded-lg bg-green-500/20 flex items-center justify-center mb-6">
                <Clock className="text-green-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">60-Second Results</h3>
              <p className="text-gray-400">
                No waiting for lab results. Get your risk assessment instantly and take immediate action with our personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <Stats />
      
      {/* Main Features - Prediction Tools */}
      <PredictionTools />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-900 to-[#0a0c16]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don{"'"}t Wait For Symptoms. Know Your Risk Today.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            What if you could look into your health future? Our AI gives you that superpower. Take action now before it{"'"}s too late.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/assessment" 
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
            >
              Get Your Free Assessment
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <Shield size={16} />
              <span>Your data is completely secure and never shared with third parties</span>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
