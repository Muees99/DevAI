import React from "react";

export default function BugAnalyzerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      {children}
    </div>
  );
}
