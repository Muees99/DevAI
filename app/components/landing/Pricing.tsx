"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <motion.div
      id="pricing"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16 sm:mb-20"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Simple Pricing
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Start free, upgrade when you need more
        </p>
      </motion.div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {[
          {
            name: "Free",
            price: "$0",
            requests: "10 requests/mo",
            features: ["All 3 tools", "Community support", "Basic analytics"],
            cta: "Start Free",
            popular: false,
          },
          {
            name: "Pro",
            price: "$19",
            requests: "500 requests/mo",
            features: [
              "All 3 tools",
              "Priority processing",
              "Email support",
              "Export features",
            ],
            cta: "Go Pro",
            popular: true,
          },
          {
            name: "Team",
            price: "$49",
            requests: "Unlimited",
            features: [
              "All 3 tools",
              "Team collaboration",
              "Priority support",
              "Custom AI models",
            ],
            cta: "Contact Sales",
            popular: false,
          },
        ].map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={`p-6 sm:p-8 rounded-3xl border ${
              plan.popular
                ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50"
                : "bg-white/5 border-white/10"
            } backdrop-blur-xl relative flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-xs sm:text-sm font-semibold">
                Most Popular
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>

            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-3xl sm:text-5xl font-bold">
                {plan.price}
              </span>
              <span className="text-gray-400 text-sm sm:text-base">/month</span>
            </div>

            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              {plan.requests}
            </p>

            <button
              className={`w-full sm:w-auto py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold mb-6 transition-all flex items-center justify-center gap-2 ${
                plan.popular
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {plan.cta}
            </button>

            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
