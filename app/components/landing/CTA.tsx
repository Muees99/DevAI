"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Ready to Ship Better Code?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
          Join the waitlist and be the first to access DevAI
        </p>
        <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2">
          Get Early Access
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
