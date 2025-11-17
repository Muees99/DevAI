"use client";

import React from "react";
import { Check, Code, FileText, Bug } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="features"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32"
    >
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Everything You Need
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Three powerful AI tools in one platform
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            icon: Code,
            title: "Code Review",
            description:
              "AI-powered code analysis for security, performance, and best practices",
            features: [
              "Security scanning",
              "Performance tips",
              "Style suggestions",
            ],
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: FileText,
            title: "Documentation",
            description:
              "Auto-generate README files, API docs, and inline comments",
            features: [
              "README generation",
              "API documentation",
              "Code comments",
            ],
            color: "from-purple-500 to-pink-500",
          },
          {
            icon: Bug,
            title: "Bug Analyzer",
            description:
              "Paste error logs and get instant solutions with explanations",
            features: ["Error diagnosis", "Solution steps", "Reference links"],
            color: "from-orange-500 to-red-500",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -5 }}
            className="p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all flex flex-col"
          >
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
            >
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              {feature.description}
            </p>

            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {feature.features.map((item, j) => (
                <li key={j} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
