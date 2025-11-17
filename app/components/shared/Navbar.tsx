// ============================================
// FILE: components/shared/Navbar.tsx
// ============================================

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold">DevAI</span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-4"
      >
        <Link
          href="#features"
          className="text-gray-300 hover:text-white transition"
        >
          Features
        </Link>
        <Link
          href="#pricing"
          className="text-gray-300 hover:text-white transition"
        >
          Pricing
        </Link>
      </motion.div>
    </nav>
  );
}
