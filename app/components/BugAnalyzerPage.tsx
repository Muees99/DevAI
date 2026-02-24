"use client";
import React, { JSX, useState } from "react";
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
} from "lucide-react";


// TYPE DEFINITIONS

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


// CONSTANTS

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


// UTILITY FUNCTIONS

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


// SUB-COMPONENTS

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
      <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
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
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
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
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mb-4">
      <Bug className="w-10 h-10 text-purple-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">No Analysis Yet</h3>
    <p className="text-gray-400 mb-4">
      Paste your code in the editor and click &quot;Analyze Code&quot; to get
      started
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
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
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


// MAIN COMPONENT
export default function BugAnalyzerPage() {
  const [code, setCode] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code to analyze");
      return;
    }

    setAnalyzing(true);

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
    } catch (error) {
      console.error("Analysis error:", error);
      alert(
        error instanceof Error
          ? `Failed to analyze code: ${error.message}`
          : "Failed to analyze code. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setAnalysis(null);
  };

  const handleExport = () => {
    if (analysis) {
      downloadJSON(analysis);
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
              setSelectedLanguage={setSelectedLanguage}
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
    </div>
  );
}