// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Code,
//   FileText,
//   Bug,
//   Sparkles,
//   Check,
//   ArrowRight,
//   Github,
//   Twitter,
// } from "lucide-react";

// export default function LandingPage() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleWaitlist = (e) => {
//     e.preventDefault();
//     // TODO: Connect to API
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//           }}
//           transition={{ duration: 20, repeat: Infinity }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             scale: [1, 1.3, 1],
//             rotate: [0, -90, 0],
//           }}
//           transition={{ duration: 15, repeat: Infinity }}
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
//         />
//       </div>

//       {/* Navbar */}
//       <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex items-center gap-2"
//         >
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//             <Sparkles className="w-6 h-6" />
//           </div>
//           <span className="text-2xl font-bold">DevAI</span>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex gap-4"
//         >
//           <a
//             href="#features"
//             className="text-gray-300 hover:text-white transition"
//           >
//             Features
//           </a>
//           <a
//             href="#pricing"
//             className="text-gray-300 hover:text-white transition"
//           >
//             Pricing
//           </a>
//         </motion.div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-6"
//         >
//           <span className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm">
//             ✨ AI-Powered Development Tools
//           </span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
//         >
//           Ship Better Code
//           <br />
//           <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//             10x Faster
//           </span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
//         >
//           AI-powered code reviews, documentation generation, and bug detection.
//           Your personal development assistant.
//         </motion.p>

//         {/* Waitlist Form */}
//         <motion.form
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           onSubmit={handleWaitlist}
//           className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8"
//         >
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             Join Waitlist
//             <ArrowRight className="w-5 h-5" />
//           </button>
//         </motion.form>

//         {submitted && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-green-400 flex items-center justify-center gap-2"
//           >
//             <Check className="w-5 h-5" />
//             You&apos;re on the list! We&apos;ll notify you soon.
//           </motion.div>
//         )}

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="text-sm text-gray-500"
//         >
//           🚀 Join 500+ developers on the waitlist
//         </motion.p>
//       </section>

//       {/* Features Section */}
//       <section
//         id="features"
//         className="relative z-10 max-w-7xl mx-auto px-6 py-32"
//       >
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Everything You Need
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Three powerful AI tools in one platform
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               icon: Code,
//               title: "Code Review",
//               description:
//                 "AI-powered code analysis for security, performance, and best practices",
//               features: [
//                 "Security scanning",
//                 "Performance tips",
//                 "Style suggestions",
//               ],
//               color: "from-blue-500 to-cyan-500",
//             },
//             {
//               icon: FileText,
//               title: "Documentation",
//               description:
//                 "Auto-generate README files, API docs, and inline comments",
//               features: [
//                 "README generation",
//                 "API documentation",
//                 "Code comments",
//               ],
//               color: "from-purple-500 to-pink-500",
//             },
//             {
//               icon: Bug,
//               title: "Bug Analyzer",
//               description:
//                 "Paste error logs and get instant solutions with explanations",
//               features: [
//                 "Error diagnosis",
//                 "Solution steps",
//                 "Reference links",
//               ],
//               color: "from-orange-500 to-red-500",
//             },
//           ].map((feature, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               whileHover={{ y: -10 }}
//               className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all"
//             >
//               <div
//                 className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
//               >
//                 <feature.icon className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
//               <p className="text-gray-400 mb-6">{feature.description}</p>
//               <ul className="space-y-2">
//                 {feature.features.map((item, j) => (
//                   <li
//                     key={j}
//                     className="flex items-center gap-2 text-sm text-gray-300"
//                   >
//                     <Check className="w-4 h-4 text-green-400" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section
//         id="pricing"
//         className="relative z-10 max-w-7xl mx-auto px-6 py-32"
//       >
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="text-center mb-20"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-4">
//             Simple Pricing
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Start free, upgrade when you need more
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {[
//             {
//               name: "Free",
//               price: "$0",
//               requests: "10 requests/mo",
//               features: ["All 3 tools", "Community support", "Basic analytics"],
//               cta: "Start Free",
//               popular: false,
//             },
//             {
//               name: "Pro",
//               price: "$19",
//               requests: "500 requests/mo",
//               features: [
//                 "All 3 tools",
//                 "Priority processing",
//                 "Email support",
//                 "Export features",
//               ],
//               cta: "Go Pro",
//               popular: true,
//             },
//             {
//               name: "Team",
//               price: "$49",
//               requests: "Unlimited",
//               features: [
//                 "All 3 tools",
//                 "Team collaboration",
//                 "Priority support",
//                 "Custom AI models",
//               ],
//               cta: "Contact Sales",
//               popular: false,
//             },
//           ].map((plan, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.2 }}
//               className={`p-8 rounded-3xl border ${
//                 plan.popular
//                   ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50"
//                   : "bg-white/5 border-white/10"
//               } backdrop-blur-xl relative`}
//             >
//               {plan.popular && (
//                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
//                   Most Popular
//                 </div>
//               )}

//               <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
//               <div className="mb-4">
//                 <span className="text-5xl font-bold">{plan.price}</span>
//                 <span className="text-gray-400">/month</span>
//               </div>
//               <p className="text-gray-400 mb-6">{plan.requests}</p>

//               <button
//                 className={`w-full py-4 rounded-full font-semibold mb-6 transition-all ${
//                   plan.popular
//                     ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg"
//                     : "bg-white/10 hover:bg-white/20"
//                 }`}
//               >
//                 {plan.cta}
//               </button>

//               <ul className="space-y-3">
//                 {plan.features.map((feature, j) => (
//                   <li key={j} className="flex items-center gap-2 text-sm">
//                     <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 backdrop-blur-xl"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Ready to Ship Better Code?
//           </h2>
//           <p className="text-xl text-gray-300 mb-8">
//             Join the waitlist and be the first to access DevAI
//           </p>
//           <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2">
//             Get Early Access
//             <ArrowRight className="w-5 h-5" />
//           </button>
//         </motion.div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-10 border-t border-white/10 py-12">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-2">
//             <Sparkles className="w-6 h-6 text-blue-400" />
//             <span className="font-bold">DevAI</span>
//           </div>

//           <div className="flex gap-6">
//             <a href="#" className="text-gray-400 hover:text-white transition">
//               <Twitter className="w-5 h-5" />
//             </a>
//             <a href="#" className="text-gray-400 hover:text-white transition">
//               <Github className="w-5 h-5" />
//             </a>
//           </div>

//           <p className="text-gray-500 text-sm">
//             © 2025 DevAI. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }
import LandingPage from "./(marketing)/page";

export default function Home() {
  return <LandingPage />;
}

