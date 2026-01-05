"use client";
import React, { useState } from "react";
import {
  Code,
  FileCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
  Zap,
  Shield,
  Eye,
  Download,
  Loader2,
  GitBranch,
  Users,
  Clock,
} from "lucide-react";

// Type Definitions
type Severity = "critical" | "major" | "minor";
type Impact = "high" | "medium" | "low";
type Complexity = "low" | "medium" | "high";
type Category = "readability" | "performance" | "security" | "best-practices" | "documentation";

interface ContentItem {
  type: string;
  text?: string;
}

interface ApiResponse {
  content: ContentItem[];
}

interface Issue {
  severity: Severity;
  category: Category;
  title: string;
  description: string;
  lineNumber: number | null;
  suggestion: string;
}

interface Improvement {
  title: string;
  description: string;
  impact: Impact;
}

interface Scores {
  readability: number;
  maintainability: number;
  performance: number;
  security: number;
  bestPractices: number;
  documentation: number;
}

interface Review {
  overallScore: number;
  summary: string;
  strengths: string[];
  scores: Scores;
  issues: Issue[];
  improvements: Improvement[];
  codeSmells: number;
  complexity: Complexity;
}

export default function CodeReview() {
  const [code, setCode] = useState<string>("");
  const [reviewing, setReviewing] = useState<boolean>(false);
  const [review, setReview] = useState<Review | null>(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>("javascript");

  const languages: string[] = [
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
  ];

  const handleReview = async (): Promise<void> => {
    if (!code.trim()) {
      alert("Please enter some code to review");
      return;
    }

    setReviewing(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
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
              content: `You are an expert code reviewer. Review the following ${selectedLanguage} code for quality, best practices, and improvements. Return ONLY a valid JSON object (no markdown, no preamble) with this exact structure:
{
  "overallScore": number (0-100),
  "summary": "brief overview of code quality",
  "strengths": ["strength 1", "strength 2"],
  "scores": {
    "readability": number (0-100),
    "maintainability": number (0-100),
    "performance": number (0-100),
    "security": number (0-100),
    "bestPractices": number (0-100),
    "documentation": number (0-100)
  },
  "issues": [
    {
      "severity": "critical|major|minor",
      "category": "readability|performance|security|best-practices|documentation",
      "title": "issue title",
      "description": "detailed description",
      "lineNumber": number or null,
      "suggestion": "how to improve"
    }
  ],
  "improvements": [
    {
      "title": "improvement title",
      "description": "what to improve",
      "impact": "high|medium|low"
    }
  ],
  "codeSmells": number,
  "complexity": "low|medium|high"
}

Code to review:
\`\`\`${selectedLanguage}
${code}
\`\`\``,
            },
          ],
        }),
      });

      // const data = await response.json();
      // const resultText = data.content
      //   .map((item: any) => (item.type === "text" ? item.text : ""))
      //   .join("\n")
      //   .trim();


      const data: ApiResponse = await response.json();
      const resultText = data.content
        .map((item: ContentItem) => (item.type === "text" ? item.text : ""))
        .join("\n")
        .trim();

      const cleanText = resultText.replace(/```json|```/g, "").trim();
      const parsed: Review = JSON.parse(cleanText);

      setReview(parsed);
    } catch (error) {
      console.error("Review error:", error);
      alert("Failed to review code. Please try again.");
    } finally {
      setReviewing(false);
    }
  };

  const handleExport = (): void => {
    if (!review) return;
    const blob = new Blob([JSON.stringify(review, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code-review-${Date.now()}.json`;
    a.click();
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number): string => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 40) return "from-orange-500 to-red-500";
    return "from-red-500 to-rose-500";
  };

  const getSeverityColor = (severity: Severity): string => {
    const colors: Record<Severity, string> = {
      critical: "bg-red-500/20 text-red-400 border-red-500/50",
      major: "bg-orange-500/20 text-orange-400 border-orange-500/50",
      minor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    };
    return colors[severity] || colors.minor;
  };

  const getImpactColor = (impact: Impact): string => {
    const colors: Record<Impact, string> = {
      high: "bg-purple-500/20 text-purple-400",
      medium: "bg-blue-500/20 text-blue-400",
      low: "bg-gray-500/20 text-gray-400",
    };
    return colors[impact] || colors.low;
  };

  // const getCategoryIcon = (category: Category): JSX.Element => {
  //   const icons: Record<Category, JSX.Element> = {
  //     readability: <Eye className="w-4 h-4" />,
  //     performance: <Zap className="w-4 h-4" />,
  //     security: <Shield className="w-4 h-4" />,
  //     "best-practices": <Target className="w-4 h-4" />,
  //     documentation: <BookOpen className="w-4 h-4" />,
  //   };
  //   return icons[category] || <Code className="w-4 h-4" />;
  // };

  const getCategoryIcon = (category: Category): React.ReactElement => {
    const icons: Record<Category, React.ReactElement> = {
      readability: <Eye className="w-4 h-4" />,
      performance: <Zap className="w-4 h-4" />,
      security: <Shield className="w-4 h-4" />,
      "best-practices": <Target className="w-4 h-4" />,
      documentation: <BookOpen className="w-4 h-4" />,
    };
    return icons[category] || <Code className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Code Review</h1>
              <p className="text-gray-400">
                Automated quality assessment and improvement suggestions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Code Input */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Code Submission
                </h2>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="bg-slate-900">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Paste your ${selectedLanguage} code for review...

Example:
class UserManager {
  constructor() {
    this.users = [];
  }
  
  addUser(user) {
    this.users.push(user);
  }
  
  getUser(id) {
    return this.users.find(u => u.id === id);
  }
}`}
                className="w-full h-96 p-4 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleReview}
                  disabled={reviewing || !code.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {reviewing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Reviewing...
                    </>
                  ) : (
                    <>
                      <GitBranch className="w-5 h-5" />
                      Review Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Review Info Cards */}
            {review && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div
                    className={`text-2xl font-bold ${getScoreColor(
                      review.overallScore
                    )}`}
                  >
                    {review.overallScore}%
                  </div>
                  <div className="text-xs text-gray-400">Overall Score</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {review.issues.length}
                  </div>
                  <div className="text-xs text-gray-400">Issues Found</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-white capitalize">
                    {review.complexity}
                  </div>
                  <div className="text-xs text-gray-400">Complexity</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Review Results */}
          <div className="space-y-4">
            {!review ? (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                  <FileCode className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to Review
                </h3>
                <p className="text-gray-400 mb-4">
                  Submit your code to receive comprehensive quality assessment
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-sm text-gray-400">
                  <span className="px-3 py-1 bg-white/5 rounded-full">
                    Quality Metrics
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full">
                    Best Practices
                  </span>
                  <span className="px-3 py-1 bg-white/5 rounded-full">
                    Improvements
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Overall Score Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">
                      Review Summary
                    </h2>
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-white/10"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 56 * (1 - review.overallScore / 100)
                            }`}
                            className="transition-all duration-1000"
                          />
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                className="text-blue-500"
                                stopColor="currentColor"
                              />
                              <stop
                                offset="100%"
                                className="text-purple-500"
                                stopColor="currentColor"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div
                              className={`text-3xl font-bold ${getScoreColor(
                                review.overallScore
                              )}`}
                            >
                              {review.overallScore}
                            </div>
                            <div className="text-xs text-gray-400">Score</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm text-center mb-4">
                      {review.summary}
                    </p>

                    {review.strengths.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-green-400">
                          ✨ Strengths:
                        </div>
                        {review.strengths.map((strength, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{strength}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quality Scores */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Quality Metrics
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(review.scores).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span
                            className={`text-sm font-bold ${getScoreColor(
                              value
                            )}`}
                          >
                            {value}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-900/50 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${getScoreGradient(
                              value
                            )} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Issues & Recommendations
                  </h3>

                  <div className="space-y-3">
                    {review.issues.map((issue, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/50 rounded-lg border border-white/10 p-4"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                              issue.severity
                            )}`}
                          >
                            {issue.severity.toUpperCase()}
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                            {getCategoryIcon(issue.category)}
                            {issue.category}
                          </div>
                          {issue.lineNumber && (
                            <div className="px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400">
                              Line {issue.lineNumber}
                            </div>
                          )}
                        </div>

                        <h4 className="text-white font-semibold text-sm mb-1">
                          {issue.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2">
                          {issue.description}
                        </p>

                        <div className="p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-xs text-blue-400 mb-1">
                            💡 Suggestion:
                          </div>
                          <p className="text-xs text-gray-300">
                            {issue.suggestion}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                {review.improvements.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Suggested Improvements
                    </h3>

                    <div className="space-y-3">
                      {review.improvements.map((improvement, index) => (
                        <div
                          key={index}
                          className="bg-slate-900/50 rounded-lg border border-white/10 p-4"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${getImpactColor(
                                improvement.impact
                              )}`}
                            >
                              {improvement.impact.toUpperCase()} IMPACT
                            </div>
                          </div>
                          <h4 className="text-white font-semibold text-sm mb-1">
                            {improvement.title}
                          </h4>
                          <p className="text-gray-400 text-xs">
                            {improvement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
