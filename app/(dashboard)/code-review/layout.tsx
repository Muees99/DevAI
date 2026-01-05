// import React from "react";

// export default function CodeReviewLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <div className="min-h-screen">{children}</div>;
// }

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CodeReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Optional Navigation */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
}