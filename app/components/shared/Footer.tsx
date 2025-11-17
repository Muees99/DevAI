import React from "react";
import { Sparkles } from "lucide-react";
import { FaXTwitter, FaGithub } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamic year

  return (
    <footer className="relative z-10 border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-white text-lg">DevAI</span>
          </div>
          <p className="text-gray-400 text-xs md:text-sm max-w-xs">
            Your AI-Powered Development Assistant - Code Reviews, Documentation
            & Bug Detection in Seconds
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs text-center md:text-left">
          © {currentYear} DevAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
