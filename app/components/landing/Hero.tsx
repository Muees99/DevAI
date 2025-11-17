// ============================================
// FILE: components/landing/Hero.tsx
// ============================================

"use client";

import { motion } from "framer-motion";
import { AnimatedBackground } from "../../components/shared/AnimatedBackground";
import { Navbar } from "../../components/shared/Navbar";
import { WaitlistForm } from "../../components/landing/WaitlistForm";

export function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      <AnimatedBackground />
      <Navbar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm">
            ✨ AI-Powered Development Tools
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Ship Better Code
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            10x Faster
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          AI-powered code reviews, documentation generation, and bug detection.
          Your personal development assistant.
        </motion.p>

        <WaitlistForm />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-gray-500 mt-6"
        >
          🚀 Join 500+ developers on the waitlist
        </motion.p>
      </div>
    </section>
  );
}
