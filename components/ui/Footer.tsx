"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-8 bg-[#070810] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">HealthPredict</h3>
            <p className="text-sm opacity-70">Advanced AI-powered disease prediction for better health outcomes.</p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Prediction Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/diabetes" className="text-sm opacity-70 hover:opacity-100">Diabetes</Link></li>
              <li><Link href="/heart" className="text-sm opacity-70 hover:opacity-100">Heart Disease</Link></li>
              <li><Link href="/kidney" className="text-sm opacity-70 hover:opacity-100">Kidney Disease</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm opacity-70 hover:opacity-100">Blog</Link></li>
              <li><Link href="/faq" className="text-sm opacity-70 hover:opacity-100">FAQ</Link></li>
              <li><Link href="/research" className="text-sm opacity-70 hover:opacity-100">Research</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm opacity-70 hover:opacity-100">About Us</Link></li>
              <li><Link href="/contact" className="text-sm opacity-70 hover:opacity-100">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm opacity-70 hover:opacity-100">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm opacity-70">© {new Date().getFullYear()} HealthPredict. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 