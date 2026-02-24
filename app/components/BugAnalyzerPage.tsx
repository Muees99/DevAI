// "use client";
// import React, { JSX, useState } from "react";
// import {
//   Upload,
//   Code,
//   AlertTriangle,
//   AlertCircle,
//   Info,
//   CheckCircle,
//   Download,
//   Trash2,
//   Send,
//   Loader2,
//   Bug,
//   Zap,
//   Shield,
//   TrendingUp,
//   ArrowLeft,
// } from "lucide-react";

// // TYPE DEFINITIONS

// type BugSeverity = "critical" | "high" | "medium" | "low";
// type BugType = "syntax" | "logic" | "security" | "performance";

// interface BugItem {
//   line?: number;
//   severity: BugSeverity;
//   type: BugType;
//   title: string;
//   description: string;
//   suggestion: string;
//   code?: string;
// }

// interface AnalysisResult {
//   summary: string;
//   totalBugs: number;
//   bugs: BugItem[];
//   qualityScore: number;
//   metrics: {
//     security: number;
//     performance: number;
//     maintainability: number;
//   };
// }

// interface AnthropicResponse {
//   content: Array<{
//     type: string;
//     text: string;
//   }>;
// }

// // CONSTANTS

// const LANGUAGES = [
//   "javascript",
//   "python",
//   "java",
//   "typescript",
//   "cpp",
//   "csharp",
//   "go",
//   "rust",
//   "php",
//   "ruby",
// ] as const;

// const SEVERITY_CONFIG: Record<
//   BugSeverity,
//   { color: string; icon: JSX.Element }
// > = {
//   critical: {
//     color: "bg-red-500/20 text-red-400 border-red-500/50",
//     icon: <AlertCircle className="w-5 h-5" />,
//   },
//   high: {
//     color: "bg-orange-500/20 text-orange-400 border-orange-500/50",
//     icon: <AlertTriangle className="w-5 h-5" />,
//   },
//   medium: {
//     color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
//     icon: <Info className="w-5 h-5" />,
//   },
//   low: {
//     color: "bg-blue-500/20 text-blue-400 border-blue-500/50",
//     icon: <CheckCircle className="w-5 h-5" />,
//   },
// };

// const TYPE_ICONS: Record<BugType, JSX.Element> = {
//   syntax: <Code className="w-4 h-4" />,
//   logic: <Bug className="w-4 h-4" />,
//   security: <Shield className="w-4 h-4" />,
//   performance: <Zap className="w-4 h-4" />,
// };

// // UTILITY FUNCTIONS

// const extractTextFromResponse = (data: AnthropicResponse): string => {
//   return data.content
//     .filter((item) => item.type === "text" && item.text)
//     .map((item) => item.text)
//     .join("\n")
//     .trim();
// };

// const parseAnalysisResult = (text: string): AnalysisResult => {
//   const cleanText = text.replace(/```json|```/g, "").trim();
//   return JSON.parse(cleanText);
// };

// const downloadJSON = (data: AnalysisResult) => {
//   const blob = new Blob([JSON.stringify(data, null, 2)], {
//     type: "application/json",
//   });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `bug-analysis-${Date.now()}.json`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// };

// // SUB-COMPONENTS

// const BackButton: React.FC = () => (
//   <div className="border-b border-white/10">
//     <div className="max-w-7xl mx-auto px-6 py-4">
//       <button
//         onClick={() => window.location.assign("/dashboard")}
//         className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         <span>Back to Dashboard</span>
//       </button>
//     </div>
//   </div>
// );

// const PageHeader: React.FC = () => (
//   <div className="mb-8">
//     <div className="flex items-center gap-3 mb-2">
//       <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
//         <Bug className="w-6 h-6 text-white" />
//       </div>
//       <div>
//         <h1 className="text-3xl font-bold text-white">Bug Analyzer</h1>
//         <p className="text-gray-400">
//           AI-powered code analysis and bug detection
//         </p>
//       </div>
//     </div>
//   </div>
// );

// interface CodeInputProps {
//   code: string;
//   setCode: (code: string) => void;
//   selectedLanguage: string;
//   setSelectedLanguage: (lang: string) => void;
//   analyzing: boolean;
//   onAnalyze: () => void;
//   onClear: () => void;
// }

// const CodeInput: React.FC<CodeInputProps> = ({
//   code,
//   setCode,
//   selectedLanguage,
//   setSelectedLanguage,
//   analyzing,
//   onAnalyze,
//   onClear,
// }) => (
//   <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-xl font-bold text-white flex items-center gap-2">
//         <Code className="w-5 h-5" />
//         Code Input
//       </h2>
//       <select
//         value={selectedLanguage}
//         onChange={(e) => setSelectedLanguage(e.target.value)}
//         className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//       >
//         {LANGUAGES.map((lang) => (
//           <option key={lang} value={lang} className="bg-slate-900">
//             {lang.charAt(0).toUpperCase() + lang.slice(1)}
//           </option>
//         ))}
//       </select>
//     </div>

//     <textarea
//       value={code}
//       onChange={(e) => setCode(e.target.value)}
//       placeholder={`Paste your ${selectedLanguage} code here...

// Example:
// function calculateTotal(items) {
//   let total = 0;
//   for (let i = 0; i <= items.length; i++) {
//     total += items[i].price;
//   }
//   return total;
// }`}
//       className="w-full h-96 p-4 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-none"
//     />

//     <div className="flex gap-3 mt-4">
//       <button
//         onClick={onAnalyze}
//         disabled={analyzing || !code.trim()}
//         className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
//       >
//         {analyzing ? (
//           <>
//             <Loader2 className="w-5 h-5 animate-spin" />
//             Analyzing...
//           </>
//         ) : (
//           <>
//             <Send className="w-5 h-5" />
//             Analyze Code
//           </>
//         )}
//       </button>
//       <button
//         onClick={onClear}
//         disabled={analyzing}
//         className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         <Trash2 className="w-5 h-5" />
//       </button>
//     </div>
//   </div>
// );

// interface MetricsCardProps {
//   analysis: AnalysisResult;
// }

// const MetricsCard: React.FC<MetricsCardProps> = ({ analysis }) => {
//   const metrics = [
//     {
//       label: "Security",
//       value: analysis.metrics.security,
//       icon: <Shield className="w-5 h-5" />,
//       color: "text-purple-400",
//     },
//     {
//       label: "Performance",
//       value: analysis.metrics.performance,
//       icon: <Zap className="w-5 h-5" />,
//       color: "text-blue-400",
//     },
//     {
//       label: "Maintainability",
//       value: analysis.metrics.maintainability,
//       icon: <TrendingUp className="w-5 h-5" />,
//       color: "text-green-400",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {metrics.map((metric) => (
//         <div
//           key={metric.label}
//           className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4"
//         >
//           <div className={`flex items-center gap-2 ${metric.color} mb-2`}>
//             {metric.icon}
//           </div>
//           <div className="text-2xl font-bold text-white">{metric.value}%</div>
//           <div className="text-xs text-gray-400">{metric.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const EmptyState: React.FC = () => (
//   <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
//     <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mb-4">
//       <Bug className="w-10 h-10 text-purple-400" />
//     </div>
//     <h3 className="text-xl font-bold text-white mb-2">No Analysis Yet</h3>
//     <p className="text-gray-400 mb-4">
//       Paste your code in the editor and click &quot;Analyze Code&quot; to get
//       started
//     </p>
//     <div className="flex flex-wrap gap-2 justify-center text-sm text-gray-400">
//       <span className="px-3 py-1 bg-white/5 rounded-full">Bug Detection</span>
//       <span className="px-3 py-1 bg-white/5 rounded-full">Security Audit</span>
//       <span className="px-3 py-1 bg-white/5 rounded-full">
//         Performance Tips
//       </span>
//     </div>
//   </div>
// );

// interface SummaryCardProps {
//   analysis: AnalysisResult;
//   onExport: () => void;
// }

// const SummaryCard: React.FC<SummaryCardProps> = ({ analysis, onExport }) => (
//   <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//     <div className="flex items-center justify-between mb-4">
//       <h2 className="text-xl font-bold text-white">Analysis Results</h2>
//       <button
//         onClick={onExport}
//         className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all"
//       >
//         <Download className="w-4 h-4" />
//         Export
//       </button>
//     </div>

//     <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
//       <p className="text-gray-300 text-sm">{analysis.summary}</p>
//     </div>

//     <div className="flex items-center gap-4 mb-4">
//       <div className="flex-1">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm text-gray-400">Quality Score</span>
//           <span className="text-lg font-bold text-white">
//             {analysis.qualityScore}%
//           </span>
//         </div>
//         <div className="w-full bg-slate-900/50 rounded-full h-3">
//           <div
//             className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
//             style={{ width: `${analysis.qualityScore}%` }}
//           />
//         </div>
//       </div>
//     </div>

//     <div className="flex items-center gap-2 text-sm">
//       <span className="text-gray-400">Total Issues Found:</span>
//       <span className="font-bold text-white">{analysis.totalBugs}</span>
//     </div>
//   </div>
// );

// interface BugCardProps {
//   bug: BugItem;
//   index: number;
// }

// const BugCard: React.FC<BugCardProps> = ({ bug, index }) => {
//   const severityConfig = SEVERITY_CONFIG[bug.severity];

//   return (
//     <div className="bg-slate-900/50 rounded-lg border border-white/10 p-4 hover:border-purple-500/50 transition-all">
//       <div className="flex items-start gap-3 mb-3 flex-wrap">
//         <div
//           className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${severityConfig.color}`}
//         >
//           {severityConfig.icon}
//           {bug.severity.toUpperCase()}
//         </div>
//         <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
//           {TYPE_ICONS[bug.type]}
//           {bug.type}
//         </div>
//         {bug.line && (
//           <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
//             Line {bug.line}
//           </div>
//         )}
//       </div>

//       <h4 className="text-white font-semibold mb-2">{bug.title}</h4>
//       <p className="text-gray-400 text-sm mb-3">{bug.description}</p>

//       {bug.code && (
//         <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
//           <div className="text-xs text-red-400 mb-1">Problematic Code:</div>
//           <code className="text-xs text-gray-300 font-mono block whitespace-pre-wrap break-all">
//             {bug.code}
//           </code>
//         </div>
//       )}

//       <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
//         <div className="text-xs text-green-400 mb-1 font-semibold">
//           💡 Suggestion:
//         </div>
//         <p className="text-xs text-gray-300">{bug.suggestion}</p>
//       </div>
//     </div>
//   );
// };

// interface BugsListProps {
//   analysis: AnalysisResult;
// }

// const BugsList: React.FC<BugsListProps> = ({ analysis }) => (
//   <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-h-[600px] overflow-y-auto">
//     <h3 className="text-lg font-bold text-white mb-4">Detected Issues</h3>
//     <div className="space-y-4">
//       {analysis.bugs?.length > 0 ? (
//         analysis.bugs.map((bug, index) => (
//           <BugCard key={index} bug={bug} index={index} />
//         ))
//       ) : (
//         <p className="text-gray-400 text-center py-8">No bugs detected</p>
//       )}
//     </div>
//   </div>
// );

// // MAIN COMPONENT
// export default function BugAnalyzerPage() {
//   const [code, setCode] = useState("");
//   const [analyzing, setAnalyzing] = useState(false);
//   const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");

//   const handleAnalyze = async () => {
//     if (!code.trim()) {
//       alert("Please enter some code to analyze");
//       return;
//     }

//     setAnalyzing(true);

//     try {
//       const response = await fetch("/api/analyze", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 1000,
//           messages: [
//             {
//               role: "user",
//               content: `You are an expert code analyzer. Analyze the following ${selectedLanguage} code for bugs, security issues, and performance problems. Return your analysis as a JSON object with this exact structure:
// {
//   "summary": "Brief overview of findings",
//   "totalBugs": number,
//   "bugs": [
//     {
//       "line": number (optional),
//       "severity": "critical" | "high" | "medium" | "low",
//       "type": "syntax" | "logic" | "security" | "performance",
//       "title": "Short title",
//       "description": "Detailed description",
//       "suggestion": "How to fix it",
//       "code": "Problematic code snippet (optional)"
//     }
//   ],
//   "qualityScore": number (0-100),
//   "metrics": {
//     "security": number (0-100),
//     "performance": number (0-100),
//     "maintainability": number (0-100)
//   }
// }

// Code to analyze:
// \`\`\`${selectedLanguage}
// ${code}
// \`\`\``,
//             },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API request failed with status ${response.status}`);
//       }

//       const data: AnthropicResponse = await response.json();
//       const resultText = extractTextFromResponse(data);
//       const parsed = parseAnalysisResult(resultText);

//       setAnalysis(parsed);
//     } catch (error) {
//       console.error("Analysis error:", error);
//       alert(
//         error instanceof Error
//           ? `Failed to analyze code: ${error.message}`
//           : "Failed to analyze code. Please try again."
//       );
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const handleClear = () => {
//     setCode("");
//     setAnalysis(null);
//   };

//   const handleExport = () => {
//     if (analysis) {
//       downloadJSON(analysis);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <BackButton />

//       <div className="max-w-7xl mx-auto">
//         <PageHeader />

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Left Panel - Code Input */}
//           <div className="space-y-4">
//             <CodeInput
//               code={code}
//               setCode={setCode}
//               selectedLanguage={selectedLanguage}
//               setSelectedLanguage={setSelectedLanguage}
//               analyzing={analyzing}
//               onAnalyze={handleAnalyze}
//               onClear={handleClear}
//             />

//             {analysis && <MetricsCard analysis={analysis} />}
//           </div>

//           {/* Right Panel - Analysis Results */}
//           <div className="space-y-4">
//             {!analysis ? (
//               <EmptyState />
//             ) : (
//               <>
//                 <SummaryCard analysis={analysis} onExport={handleExport} />
//                 <BugsList analysis={analysis} />
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, JSX } from "react"; 
import {
  Upload,
  Code,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Download,
  Trash2,
  Send,
  Loader2,
  Bug,
  Zap,
  Shield,
  TrendingUp,
  ArrowLeft,
  History,
  Clock,
  X,
  Eye,
  Activity,
  ChevronRight,
  Filter,
  Search,
  FileText,
  PlayCircle,
  XCircle,
  CheckCircle2,
} from "lucide-react";

// ===========================
// TYPE DEFINITIONS
// ===========================

type BugSeverity = "critical" | "high" | "medium" | "low";
type BugType = "syntax" | "logic" | "security" | "performance";

interface BugItem {
  line?: number;
  severity: BugSeverity;
  type: BugType;
  title: string;
  description: string;
  suggestion: string;
  code?: string;
}

interface AnalysisResult {
  summary: string;
  totalBugs: number;
  bugs: BugItem[];
  qualityScore: number;
  metrics: {
    security: number;
    performance: number;
    maintainability: number;
  };
}

interface AnthropicResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

type ActivityType =
  | "analysis_started"
  | "analysis_completed"
  | "analysis_failed"
  | "code_cleared"
  | "language_changed"
  | "export_completed"
  | "history_cleared";

interface ActivityItem {
  id: string;
  type: ActivityType;
  timestamp: number;
  description: string;
  metadata?: {
    language?: string;
    qualityScore?: number;
    bugsFound?: number;
    errorMessage?: string;
    codeLength?: number;
  };
}

// ===========================
// CONSTANTS
// ===========================

const LANGUAGES = [
  "javascript",
  "python",
  "java",
  "typescript",
  "cpp",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
] as const;

const ACTIVITY_STORAGE_KEY = "bug-analyzer-activities";
const MAX_ACTIVITY_ITEMS = 50;

const SEVERITY_CONFIG: Record<
  BugSeverity,
  { color: string; icon: JSX.Element }
> = {
  critical: {
    color: "bg-red-500/20 text-red-400 border-red-500/50",
    icon: <AlertCircle className="w-5 h-5" />,
  },
  high: {
    color: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  medium: {
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    icon: <Info className="w-5 h-5" />,
  },
  low: {
    color: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    icon: <CheckCircle className="w-5 h-5" />,
  },
};

const TYPE_ICONS: Record<BugType, JSX.Element> = {
  syntax: <Code className="w-4 h-4" />,
  logic: <Bug className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  performance: <Zap className="w-4 h-4" />,
};

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: JSX.Element; color: string; label: string }
> = {
  analysis_started: {
    icon: <PlayCircle className="w-4 h-4" />,
    color: "text-blue-400",
    label: "Analysis Started",
  },
  analysis_completed: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-green-400",
    label: "Analysis Completed",
  },
  analysis_failed: {
    icon: <XCircle className="w-4 h-4" />,
    color: "text-red-400",
    label: "Analysis Failed",
  },
  code_cleared: {
    icon: <Trash2 className="w-4 h-4" />,
    color: "text-orange-400",
    label: "Code Cleared",
  },
  language_changed: {
    icon: <Code className="w-4 h-4" />,
    color: "text-purple-400",
    label: "Language Changed",
  },
  export_completed: {
    icon: <Download className="w-4 h-4" />,
    color: "text-cyan-400",
    label: "Export Completed",
  },
  history_cleared: {
    icon: <Trash2 className="w-4 h-4" />,
    color: "text-red-400",
    label: "History Cleared",
  },
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

const extractTextFromResponse = (data: AnthropicResponse): string => {
  return data.content
    .filter((item) => item.type === "text" && item.text)
    .map((item) => item.text)
    .join("\n")
    .trim();
};

const parseAnalysisResult = (text: string): AnalysisResult => {
  const cleanText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanText);
};

const downloadJSON = (data: AnalysisResult) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bug-analysis-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatFullTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// ===========================
// ACTIVITY MANAGEMENT
// ===========================

const loadActivities = (): ActivityItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load activities:", error);
    return [];
  }
};

const saveActivity = (
  type: ActivityType,
  description: string,
  metadata?: ActivityItem["metadata"],
): ActivityItem[] => {
  const activity: ActivityItem = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp: Date.now(),
    description,
    metadata,
  };

  const existing = loadActivities();
  const updated = [activity, ...existing].slice(0, MAX_ACTIVITY_ITEMS);

  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

const clearAllActivities = (): void => {
  localStorage.removeItem(ACTIVITY_STORAGE_KEY);
};

// ===========================
// SUB-COMPONENTS
// ===========================

const BackButton: React.FC = () => (
  <div className="border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <button
        onClick={() => window.location.assign("/dashboard")}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>
    </div>
  </div>
);

const PageHeader: React.FC = () => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-3  rounded-xl">
        <Bug className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">Bug Analyzer</h1>
        <p className="text-gray-400">
          AI-powered code analysis and bug detection
        </p>
      </div>
    </div>
  </div>
);

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  analyzing: boolean;
  onAnalyze: () => void;
  onClear: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  selectedLanguage,
  setSelectedLanguage,
  analyzing,
  onAnalyze,
  onClear,
}) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Code className="w-5 h-5" />
        Code Input
      </h2>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang} className="bg-slate-900">
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder={`Paste your ${selectedLanguage} code here...

Example:
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].price;
  }
  return total;
}`}
      className="w-full h-96 p-4 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm resize-none"
    />

    <div className="flex gap-3 mt-4">
      <button
        onClick={onAnalyze}
        disabled={analyzing || !code.trim()}
        className="flex-1 flex items-center justify-center gap-2  hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
      >
        {analyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Analyze Code
          </>
        )}
      </button>
      <button
        onClick={onClear}
        disabled={analyzing}
        className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </div>
);

interface MetricsCardProps {
  analysis: AnalysisResult;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ analysis }) => {
  const metrics = [
    {
      label: "Security",
      value: analysis.metrics.security,
      icon: <Shield className="w-5 h-5" />,
      color: "text-purple-400",
    },
    {
      label: "Performance",
      value: analysis.metrics.performance,
      icon: <Zap className="w-5 h-5" />,
      color: "text-blue-400",
    },
    {
      label: "Maintainability",
      value: analysis.metrics.maintainability,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4"
        >
          <div className={`flex items-center gap-2 ${metric.color} mb-2`}>
            {metric.icon}
          </div>
          <div className="text-2xl font-bold text-white">{metric.value}%</div>
          <div className="text-xs text-gray-400">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
    <div className="inline-flex items-center justify-center w-20 h-20  rounded-full mb-4">
      <Bug className="w-10 h-10 text-purple-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">No Analysis Yet</h3>
    <p className="text-gray-400 mb-4">
      Paste your code in the editor and click Analyze Code to get started
    </p>
    <div className="flex flex-wrap gap-2 justify-center text-sm text-gray-400">
      <span className="px-3 py-1 bg-white/5 rounded-full">Bug Detection</span>
      <span className="px-3 py-1 bg-white/5 rounded-full">Security Audit</span>
      <span className="px-3 py-1 bg-white/5 rounded-full">
        Performance Tips
      </span>
    </div>
  </div>
);

interface SummaryCardProps {
  analysis: AnalysisResult;
  onExport: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ analysis, onExport }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white">Analysis Results</h2>
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>

    <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
      <p className="text-gray-300 text-sm">{analysis.summary}</p>
    </div>

    <div className="flex items-center gap-4 mb-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Quality Score</span>
          <span className="text-lg font-bold text-white">
            {analysis.qualityScore}%
          </span>
        </div>
        <div className="w-full bg-slate-900/50 rounded-full h-3">
          <div
            className=" h-3 rounded-full transition-all duration-500"
            style={{ width: `${analysis.qualityScore}%` }}
          />
        </div>
      </div>
    </div>

    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-400">Total Issues Found:</span>
      <span className="font-bold text-white">{analysis.totalBugs}</span>
    </div>
  </div>
);

interface BugCardProps {
  bug: BugItem;
  index: number;
}

const BugCard: React.FC<BugCardProps> = ({ bug, index }) => {
  const severityConfig = SEVERITY_CONFIG[bug.severity];

  return (
    <div className="bg-slate-900/50 rounded-lg border border-white/10 p-4 hover:border-purple-500/50 transition-all">
      <div className="flex items-start gap-3 mb-3 flex-wrap">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${severityConfig.color}`}
        >
          {severityConfig.icon}
          {bug.severity.toUpperCase()}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
          {TYPE_ICONS[bug.type]}
          {bug.type}
        </div>
        {bug.line && (
          <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400">
            Line {bug.line}
          </div>
        )}
      </div>

      <h4 className="text-white font-semibold mb-2">{bug.title}</h4>
      <p className="text-gray-400 text-sm mb-3">{bug.description}</p>

      {bug.code && (
        <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-xs text-red-400 mb-1">Problematic Code:</div>
          <code className="text-xs text-gray-300 font-mono block whitespace-pre-wrap break-all">
            {bug.code}
          </code>
        </div>
      )}

      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="text-xs text-green-400 mb-1 font-semibold">
          💡 Suggestion:
        </div>
        <p className="text-xs text-gray-300">{bug.suggestion}</p>
      </div>
    </div>
  );
};

interface BugsListProps {
  analysis: AnalysisResult;
}

const BugsList: React.FC<BugsListProps> = ({ analysis }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-h-[600px] overflow-y-auto">
    <h3 className="text-lg font-bold text-white mb-4">Detected Issues</h3>
    <div className="space-y-4">
      {analysis.bugs?.length > 0 ? (
        analysis.bugs.map((bug, index) => (
          <BugCard key={index} bug={bug} index={index} />
        ))
      ) : (
        <p className="text-gray-400 text-center py-8">No bugs detected</p>
      )}
    </div>
  </div>
);

interface ActivitySidebarProps {
  activities: ActivityItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClearAll: () => void;
}

const ActivitySidebar: React.FC<ActivitySidebarProps> = ({
  activities,
  isOpen,
  onToggle,
  onClearAll,
}) => {
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter = filter === "all" || activity.type === filter;
    const matchesSearch =
      searchTerm === "" ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 px-4 py-6 rounded-l-lg transition-all ${
          isOpen
            ? "bg-purple-500/20 text-purple-400 border-l border-t border-b border-purple-500/50"
            : "bg-white/10 text-gray-300 hover:text-white border-l border-t border-b border-white/20"
        }`}
        style={{ right: isOpen ? "400px" : "0" }}
      >
        <Activity className="w-5 h-5" />
        <span className="text-sm font-semibold">Activity</span>
        {activities.length > 0 && (
          <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">
            {activities.length}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-[400px] bg-slate-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Activity Log</h2>
              </div>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  filter === "all"
                    ? "bg-purple-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {Object.entries(ACTIVITY_CONFIG).map(([type, config]) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as ActivityType)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    filter === type
                      ? "bg-purple-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">
                  {searchTerm || filter !== "all"
                    ? "No matching activities"
                    : "No activities yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredActivities.map((activity) => {
                  const config = ACTIVITY_CONFIG[activity.type];
                  return (
                    <div
                      key={activity.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${config.color} mt-0.5`}>
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-white">
                              {config.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mb-2">
                            {activity.description}
                          </p>

                          {/* Metadata */}
                          {activity.metadata && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {activity.metadata.language && (
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                                  {activity.metadata.language}
                                </span>
                              )}
                              {activity.metadata.qualityScore !== undefined && (
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                                  Score: {activity.metadata.qualityScore}%
                                </span>
                              )}
                              {activity.metadata.bugsFound !== undefined && (
                                <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                                  {activity.metadata.bugsFound} bugs
                                </span>
                              )}
                              {activity.metadata.codeLength !== undefined && (
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">
                                  {activity.metadata.codeLength} chars
                                </span>
                              )}
                            </div>
                          )}

                          {/* Error Message */}
                          {activity.metadata?.errorMessage && (
                            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400 mb-2">
                              {activity.metadata.errorMessage}
                            </div>
                          )}

                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span
                              title={formatFullTimestamp(activity.timestamp)}
                            >
                              {formatTimestamp(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {activities.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <button
                onClick={onClearAll}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Activity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={onToggle} />
      )}
    </>
  );
};

// ===========================
// MAIN COMPONENT
// ===========================

export default function BugAnalyzerPage() {
  const [code, setCode] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [activitySidebarOpen, setActivitySidebarOpen] = useState(false);

  // Load activities on mount
  useEffect(() => {
    setActivities(loadActivities());
  }, []);

  const addActivity = (
    type: ActivityType,
    description: string,
    metadata?: ActivityItem["metadata"],
  ) => {
    const updated = saveActivity(type, description, metadata);
    setActivities(updated);
  };

  const handleLanguageChange = (lang: string) => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
      addActivity(
        "language_changed",
        `Changed language from ${selectedLanguage} to ${lang}`,
        { language: lang },
      );
    }
  };

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code to analyze");
      return;
    }

    setAnalyzing(true);
    addActivity(
      "analysis_started",
      `Started analyzing ${selectedLanguage} code`,
      {
        language: selectedLanguage,
        codeLength: code.length,
      },
    );

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are an expert code analyzer. Analyze the following ${selectedLanguage} code for bugs, security issues, and performance problems. Return your analysis as a JSON object with this exact structure:
{
  "summary": "Brief overview of findings",
  "totalBugs": number,
  "bugs": [
    {
      "line": number (optional),
      "severity": "critical" | "high" | "medium" | "low",
      "type": "syntax" | "logic" | "security" | "performance",
      "title": "Short title",
      "description": "Detailed description",
      "suggestion": "How to fix it",
      "code": "Problematic code snippet (optional)"
    }
  ],
  "qualityScore": number (0-100),
  "metrics": {
    "security": number (0-100),
    "performance": number (0-100),
    "maintainability": number (0-100)
  }
}

Code to analyze:
\`\`\`${selectedLanguage}
${code}
\`\`\``,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: AnthropicResponse = await response.json();
      const resultText = extractTextFromResponse(data);
      const parsed = parseAnalysisResult(resultText);

      setAnalysis(parsed);

      addActivity(
        "analysis_completed",
        `Successfully analyzed ${selectedLanguage} code`,
        {
          language: selectedLanguage,
          qualityScore: parsed.qualityScore,
          bugsFound: parsed.totalBugs,
        },
      );
    } catch (error) {
      console.error("Analysis error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      addActivity("analysis_failed", `Analysis failed: ${errorMessage}`, {
        language: selectedLanguage,
        errorMessage,
      });

      alert(`Failed to analyze code: ${errorMessage}`);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setAnalysis(null);
    addActivity("code_cleared", "Cleared code editor and analysis results");
  };

  const handleExport = () => {
    if (analysis) {
      downloadJSON(analysis);
      addActivity(
        "export_completed",
        "Exported analysis results to JSON file",
        {
          language: selectedLanguage,
          qualityScore: analysis.qualityScore,
        },
      );
    }
  };

  const handleClearAllActivities = () => {
    if (confirm("Are you sure you want to clear all activity history?")) {
      clearAllActivities();
      setActivities([]);
      addActivity("history_cleared", "Cleared all activity history");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <BackButton />

      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Code Input */}
          <div className="space-y-4">
            <CodeInput
              code={code}
              setCode={setCode}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={handleLanguageChange}
              analyzing={analyzing}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
            />

            {analysis && <MetricsCard analysis={analysis} />}
          </div>

          {/* Right Panel - Analysis Results */}
          <div className="space-y-4">
            {!analysis ? (
              <EmptyState />
            ) : (
              <>
                <SummaryCard analysis={analysis} onExport={handleExport} />
                <BugsList analysis={analysis} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Activity Sidebar */}
      <ActivitySidebar
        activities={activities}
        isOpen={activitySidebarOpen}
        onToggle={() => setActivitySidebarOpen(!activitySidebarOpen)}
        onClearAll={handleClearAllActivities}
      />
    </div>
  );
}