"use client";

import { motion } from "framer-motion";

interface TestimonialProps {
  name: string;
  title: string;
  quote: string;
}

const Testimonial = ({ name, title, quote }: TestimonialProps) => {
  return (
    <motion.div 
      className="bg-[#0f1123] p-6 rounded-xl border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm opacity-70">{title}</p>
        </div>
      </div>
      <p className="text-sm md:text-base italic opacity-90">&quot;{quote}&quot;</p>
    </motion.div>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      title: "Verified User",
      quote: "I discovered I was at risk for diabetes months before any symptoms. Thanks to early intervention, my doctor says I've avoided developing type 2 diabetes altogether."
    },
    {
      id: 2,
      name: "Amanda Smith",
      title: "Verified User",
      quote: "The heart disease predictor gave me a 'medium risk' result that prompted me to see my doctor. Turns out I had high blood pressure I wasn't aware of. Early detection is everything."
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Users Say</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Testimonial 
              key={testimonial.id}
              name={testimonial.name}
              title={testimonial.title}
              quote={testimonial.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 