// "use client";
// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   TrendingUp,
//   TrendingDown,
//   BarChart3,
//   PieChart,
//   Activity,
//   Calendar,
//   Download,
//   RefreshCw,
//   Bug,
//   FileCode,
//   Shield,
//   Zap,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";

// export default function AnalyticsPage() {
//   const [timeRange, setTimeRange] = useState("30d");
//   const [selectedMetric, setSelectedMetric] = useState("all");

//   // Mock data - replace with real data from your backend
//   const overallStats = {
//     totalAnalyses: 245,
//     bugsFound: 1847,
//     avgQualityScore: 78,
//     criticalIssues: 23,
//     improvement: 12.5,
//   };

//   const weeklyTrend = [
//     { week: "Week 1", bugs: 245, reviews: 180, quality: 72 },
//     { week: "Week 2", bugs: 298, reviews: 210, quality: 75 },
//     { week: "Week 3", bugs: 267, reviews: 195, quality: 76 },
//     { week: "Week 4", bugs: 312, reviews: 225, quality: 78 },
//   ];

//   const bugsByType = [
//     { type: "Security", count: 487, percentage: 26, color: "bg-red-500" },
//     { type: "Performance", count: 412, percentage: 22, color: "bg-orange-500" },
//     { type: "Logic", count: 556, percentage: 30, color: "bg-yellow-500" },
//     { type: "Syntax", count: 392, percentage: 22, color: "bg-blue-500" },
//   ];

//   const severityBreakdown = [
//     { severity: "Critical", count: 23, color: "text-red-400 bg-red-500/20" },
//     { severity: "High", count: 156, color: "text-orange-400 bg-orange-500/20" },
//     {
//       severity: "Medium",
//       count: 498,
//       color: "text-yellow-400 bg-yellow-500/20",
//     },
//     { severity: "Low", count: 1170, color: "text-blue-400 bg-blue-500/20" },
//   ];

//   const languageStats = [
//     { language: "JavaScript", analyses: 89, bugs: 687, quality: 76 },
//     { language: "Python", analyses: 67, bugs: 523, quality: 81 },
//     { language: "TypeScript", analyses: 54, bugs: 398, quality: 79 },
//     { language: "Java", analyses: 35, bugs: 239, quality: 74 },
//   ];

//   const maxTrendValue = Math.max(
//     ...weeklyTrend.map((w) => Math.max(w.bugs, w.reviews)),
//   );

//   const handleExport = () => {
//     const exportData = {
//       overallStats,
//       weeklyTrend,
//       bugsByType,
//       severityBreakdown,
//       languageStats,
//       exportedAt: new Date().toISOString(),
//     };
//     const blob = new Blob([JSON.stringify(exportData, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `analytics-${Date.now()}.json`;
//     a.click();
//   };

//   const handleBackToDashboard = () => {
//     if (typeof window !== "undefined") {
//       window.location.assign("/dashboard");
//     }
//   };

//   return (
//     <div className="min-h-screen p-6">
//       {/* bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 */}
//       <div className="max-w-7xl mx-auto">
//         {/* Back Button */}
//         <div className="mb-6">
//           <button
//             onClick={handleBackToDashboard}
//             className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span>Back to Dashboard</span>
//           </button>
//         </div>

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
//                   <BarChart3 className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold text-white">Analytics</h1>
//                   <p className="text-gray-400">
//                     Comprehensive insights and performance metrics
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <select
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="7d" className="bg-slate-900">
//                   Last 7 days
//                 </option>
//                 <option value="30d" className="bg-slate-900">
//                   Last 30 days
//                 </option>
//                 <option value="90d" className="bg-slate-900">
//                   Last 90 days
//                 </option>
//                 <option value="1y" className="bg-slate-900">
//                   Last year
//                 </option>
//               </select>
//               <button
//                 onClick={handleExport}
//                 className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center gap-2"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>
//               <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
//                 <RefreshCw className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* Overview Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 bg-blue-500/20 rounded-lg">
//                   <Activity className="w-5 h-5 text-blue-400" />
//                 </div>
//                 <div className="flex items-center gap-1 text-green-400 text-sm">
//                   <TrendingUp className="w-4 h-4" />
//                   <span>+{overallStats.improvement}%</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-white mb-1">
//                 {overallStats.totalAnalyses}
//               </div>
//               <div className="text-gray-400 text-sm">Total Analyses</div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 bg-red-500/20 rounded-lg">
//                   <Bug className="w-5 h-5 text-red-400" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-white mb-1">
//                 {overallStats.bugsFound}
//               </div>
//               <div className="text-gray-400 text-sm">Bugs Found</div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 bg-purple-500/20 rounded-lg">
//                   <TrendingUp className="w-5 h-5 text-purple-400" />
//                 </div>
//                 <div className="flex items-center gap-1 text-green-400 text-sm">
//                   <TrendingUp className="w-4 h-4" />
//                   <span>+5%</span>
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-white mb-1">
//                 {overallStats.avgQualityScore}%
//               </div>
//               <div className="text-gray-400 text-sm">Avg Quality</div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 bg-orange-500/20 rounded-lg">
//                   <AlertTriangle className="w-5 h-5 text-orange-400" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-white mb-1">
//                 {overallStats.criticalIssues}
//               </div>
//               <div className="text-gray-400 text-sm">Critical Issues</div>
//             </div>

//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 bg-green-500/20 rounded-lg">
//                   <CheckCircle className="w-5 h-5 text-green-400" />
//                 </div>
//               </div>
//               <div className="text-2xl font-bold text-white mb-1">89%</div>
//               <div className="text-gray-400 text-sm">Fixed Rate</div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Charts */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Weekly Trend */}
//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 Trend Analysis
//               </h2>
//               <div className="flex items-end justify-between gap-4 h-64">
//                 {weeklyTrend.map((data, index) => (
//                   <div
//                     key={index}
//                     className="flex-1 flex flex-col items-center gap-2"
//                   >
//                     <div className="text-xs text-gray-400 mb-1">
//                       {data.quality}%
//                     </div>
//                     <div className="w-full flex flex-col items-center gap-1 h-48">
//                       <div
//                         className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all hover:opacity-80"
//                         style={{
//                           height: `${(data.bugs / maxTrendValue) * 100}%`,
//                         }}
//                       ></div>
//                       <div className="text-xs text-red-400">{data.bugs}</div>
//                     </div>
//                     <span className="text-xs text-gray-400 font-medium">
//                       {data.week}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex items-center justify-center gap-6 mt-4 text-sm">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-500 rounded"></div>
//                   <span className="text-gray-400">Bugs Found</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                   <span className="text-gray-400">Quality Score</span>
//                 </div>
//               </div>
//             </div>

//             {/* Language Statistics */}
//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <FileCode className="w-5 h-5" />
//                 Language Statistics
//               </h2>
//               <div className="space-y-4">
//                 {languageStats.map((lang, index) => (
//                   <div key={index} className="p-4 bg-white/5 rounded-lg">
//                     <div className="flex items-center justify-between mb-3">
//                       <span className="text-white font-semibold">
//                         {lang.language}
//                       </span>
//                       <span className="text-sm text-gray-400">
//                         {lang.analyses} analyses
//                       </span>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4 mb-3">
//                       <div>
//                         <div className="text-xs text-gray-400 mb-1">
//                           Bugs Found
//                         </div>
//                         <div className="text-lg font-bold text-red-400">
//                           {lang.bugs}
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-400 mb-1">
//                           Avg Quality
//                         </div>
//                         <div className="text-lg font-bold text-green-400">
//                           {lang.quality}%
//                         </div>
//                       </div>
//                     </div>
//                     <div className="w-full bg-slate-900/50 rounded-full h-2">
//                       <div
//                         className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
//                         style={{ width: `${lang.quality}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Breakdowns */}
//           <div className="space-y-6">
//             {/* Bug Types */}
//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <PieChart className="w-5 h-5" />
//                 Bugs by Type
//               </h2>
//               <div className="space-y-4">
//                 {bugsByType.map((bug, index) => (
//                   <div key={index}>
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className={`w-3 h-3 ${bug.color} rounded-full`}
//                         ></div>
//                         <span className="text-white text-sm font-medium">
//                           {bug.type}
//                         </span>
//                       </div>
//                       <span className="text-gray-400 text-sm">{bug.count}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="flex-1 bg-slate-900/50 rounded-full h-2">
//                         <div
//                           className={`${bug.color} h-2 rounded-full transition-all`}
//                           style={{ width: `${bug.percentage}%` }}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-gray-400 w-10 text-right">
//                         {bug.percentage}%
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Severity Breakdown */}
//             <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <Shield className="w-5 h-5" />
//                 By Severity
//               </h2>
//               <div className="space-y-3">
//                 {severityBreakdown.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 ${item.color} rounded-lg flex items-center justify-between`}
//                   >
//                     <span className="font-semibold">{item.severity}</span>
//                     <span className="text-2xl font-bold">{item.count}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Performance Insights */}
//             <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
//               <h2 className="text-xl font-bold text-white mb-4">🎯 Insights</h2>
//               <div className="space-y-3 text-sm text-gray-300">
//                 <p>✓ Quality improved by 12.5% this month</p>
//                 <p>✓ Security issues down by 18%</p>
//                 <p>✓ Average fix time: 2.3 hours</p>
//                 <p>✓ Most active: Tuesday afternoons</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Bug,
  FileCode,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  Menu,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data - replace with real data from your backend
  const overallStats = {
    totalAnalyses: 245,
    bugsFound: 1847,
    avgQualityScore: 78,
    criticalIssues: 23,
    improvement: 12.5,
    fixedRate: 89,
  };

  const weeklyTrend = [
    { week: "W1", weekFull: "Week 1", bugs: 245, reviews: 180, quality: 72 },
    { week: "W2", weekFull: "Week 2", bugs: 298, reviews: 210, quality: 75 },
    { week: "W3", weekFull: "Week 3", bugs: 267, reviews: 195, quality: 76 },
    { week: "W4", weekFull: "Week 4", bugs: 312, reviews: 225, quality: 78 },
  ];

  const bugsByType = [
    {
      type: "Security",
      count: 487,
      percentage: 26,
      color: "bg-red-500",
      textColor: "text-red-400",
    },
    {
      type: "Performance",
      count: 412,
      percentage: 22,
      color: "bg-orange-500",
      textColor: "text-orange-400",
    },
    {
      type: "Logic",
      count: 556,
      percentage: 30,
      color: "bg-yellow-500",
      textColor: "text-yellow-400",
    },
    {
      type: "Syntax",
      count: 392,
      percentage: 22,
      color: "bg-blue-500",
      textColor: "text-blue-400",
    },
  ];

  const severityBreakdown = [
    {
      severity: "Critical",
      count: 23,
      color: "text-red-400 bg-red-500/20",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      severity: "High",
      count: 156,
      color: "text-orange-400 bg-orange-500/20",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      severity: "Medium",
      count: 498,
      color: "text-yellow-400 bg-yellow-500/20",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      severity: "Low",
      count: 1170,
      color: "text-blue-400 bg-blue-500/20",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  const languageStats = [
    {
      language: "JavaScript",
      analyses: 89,
      bugs: 687,
      quality: 76,
      icon: "📜",
    },
    { language: "Python", analyses: 67, bugs: 523, quality: 81, icon: "🐍" },
    {
      language: "TypeScript",
      analyses: 54,
      bugs: 398,
      quality: 79,
      icon: "📘",
    },
    { language: "Java", analyses: 35, bugs: 239, quality: 74, icon: "☕" },
  ];

  const maxTrendValue = Math.max(
    ...weeklyTrend.map((w) => Math.max(w.bugs, w.reviews)),
  );

  const handleExport = () => {
    const exportData = {
      overallStats,
      weeklyTrend,
      bugsByType,
      severityBreakdown,
      languageStats,
      exportedAt: new Date().toISOString(),
      timeRange,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dev-ai-analytics-${timeRange}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleBackToDashboard = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/dashboard");
    }
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
    handleRefresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Analytics
                  </h1>
                  <p className="text-sm sm:text-base text-gray-400 hidden sm:block">
                    Comprehensive insights and performance metrics
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <select
                value={timeRange}
                onChange={handleTimeRangeChange}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d" className="bg-slate-900">
                  Last 7 days
                </option>
                <option value="30d" className="bg-slate-900">
                  Last 30 days
                </option>
                <option value="90d" className="bg-slate-900">
                  Last 90 days
                </option>
                <option value="1y" className="bg-slate-900">
                  Last year
                </option>
              </select>
              <button
                onClick={handleExport}
                className="px-3 sm:px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>+{overallStats.improvement}%</span>
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {overallStats.totalAnalyses}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Total Analyses
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-red-500/20 rounded-lg">
                  <Bug className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {overallStats.bugsFound}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Bugs Found</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>+5%</span>
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {overallStats.avgQualityScore}%
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Avg Quality
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {overallStats.criticalIssues}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Critical Issues
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 hover:scale-105 transition-transform col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {overallStats.fixedRate}%
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Fixed Rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Weekly Trend */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Trend Analysis
              </h2>
              <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                <div className="min-w-[400px] flex items-end justify-between gap-2 sm:gap-4 h-48 sm:h-64">
                  {weeklyTrend.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="text-xs text-gray-400 mb-1">
                        {data.quality}%
                      </div>
                      <div className="w-full flex flex-col items-center gap-1 h-36 sm:h-48">
                        <div
                          className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all hover:opacity-80 cursor-pointer"
                          style={{
                            height: `${(data.bugs / maxTrendValue) * 100}%`,
                          }}
                          title={`${data.weekFull}: ${data.bugs} bugs`}
                        ></div>
                        <div className="text-xs text-red-400 font-semibold">
                          {data.bugs}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                        {data.weekFull}
                      </span>
                      <span className="text-xs text-gray-400 font-medium sm:hidden">
                        {data.week}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">Bugs Found</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
                  <span className="text-gray-400">Quality Score</span>
                </div>
              </div>
            </div>

            {/* Language Statistics */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileCode className="w-4 h-4 sm:w-5 sm:h-5" />
                Language Statistics
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {languageStats.map((lang, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl">{lang.icon}</span>
                        <span className="text-white font-semibold text-sm sm:text-base">
                          {lang.language}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-400">
                        {lang.analyses} analyses
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Bugs Found
                        </div>
                        <div className="text-base sm:text-lg font-bold text-red-400">
                          {lang.bugs}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">
                          Avg Quality
                        </div>
                        <div className="text-base sm:text-lg font-bold text-green-400">
                          {lang.quality}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-900/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${lang.quality}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Breakdowns */}
          <div className="space-y-4 sm:space-y-6">
            {/* Bug Types */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PieChart className="w-4 h-4 sm:w-5 sm:h-5" />
                Bugs by Type
              </h2>
              <div className="space-y-4">
                {bugsByType.map((bug, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 sm:w-3 sm:h-3 ${bug.color} rounded-full`}
                        ></div>
                        <span
                          className={`${bug.textColor} text-sm sm:text-base font-medium`}
                        >
                          {bug.type}
                        </span>
                      </div>
                      <span className="text-gray-400 text-sm sm:text-base font-semibold">
                        {bug.count}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-900/50 rounded-full h-2">
                        <div
                          className={`${bug.color} h-2 rounded-full transition-all duration-500 group-hover:opacity-80`}
                          style={{ width: `${bug.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400 w-10 text-right">
                        {bug.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Severity Breakdown */}
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                By Severity
              </h2>
              <div className="space-y-3">
                {severityBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 ${item.color} rounded-lg flex items-center justify-between hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="font-semibold text-sm sm:text-base">
                        {item.severity}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-bold">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-purple-500/30 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                🎯 Insights
              </h2>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                <p className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>Quality improved by 12.5% this month</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>Security issues down by 18%</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>Average fix time: 2.3 hours</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-green-400 flex-shrink-0">✓</span>
                  <span>Most active: Tuesday afternoons</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}



