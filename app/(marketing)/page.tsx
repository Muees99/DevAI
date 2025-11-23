// FILE: app/(marketing)/page.tsx

import { Hero } from "../components/landing/Hero";
import Features  from "../components/landing/Features";
import  Pricing from "../components/landing/Pricing";
import  CTA  from "../components/landing/CTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Hero />
      <Features />
      <Pricing />
      <CTA />
    </div>
  );
}
