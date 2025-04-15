'use client';

import Link from "next/link";
import { ArrowRight, Check, HeartPulse, Award, Clock, Shield, Zap } from "lucide-react";
import Stats from "@/components/ui/Stats";
import PredictionTools from "@/components/ui/PredictionTools";
import Testimonials from "@/components/ui/Testimonials";
import Footer from "@/components/ui/Footer";
// Remove the AnimationTest component for now to simplify debugging
// import AnimationTest from "@/components/ui/AnimationTest";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#070810] text-gray-800 dark:text-white">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            AI-Powered Health Prediction Tools
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Predict your risk of diabetes, heart disease, and kidney disease with our advanced machine learning models.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/diabetes"
              className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="w-full py-12 bg-gray-50 dark:bg-[#080910] px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HealthPredict?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Accurate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant predictions powered by advanced machine learning models trained on extensive medical datasets.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your health data never leaves your device. All predictions are processed locally for maximum privacy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
                <HeartPulse className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive personalized recommendations based on your prediction results to improve your health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <Stats />

      {/* Prediction Tools */}
      <PredictionTools />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="w-full py-16 px-4 sm:px-6 bg-gradient-to-r from-primary/90 to-blue-600/90 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your health?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Start using our prediction tools today and gain valuable insights into your health risks.
          </p>
          <Link
            href="/diabetes"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-primary font-medium hover:bg-gray-100 transition-colors"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
