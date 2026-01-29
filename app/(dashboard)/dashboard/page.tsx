// "use client";
// import React, { useState } from "react";
// import {
//   Bug,
//   FileCode,
//   BarChart3,
//   TrendingUp,
//   Clock,
//   CheckCircle,
//   AlertTriangle,
//   Zap,
//   Code,
//   ArrowRight,
//   Activity,
//   Calendar,
//   Shield,
//   Target,
//   Home,
//   Settings,
//   User,
//   LogOut,
//   Menu,
//   X,
//   ChevronDown,
// } from "lucide-react";

// export default function Dashboard() {
//   const [timeRange, setTimeRange] = useState("7d");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [currentPage, setCurrentPage] = useState("dashboard");

//   const stats = {
//     bugsAnalyzed: 156,
//     codeReviewed: 89,
//     issuesFixed: 134,
//     avgQualityScore: 78,
//   };

//   const recentActivity = [
//     {
//       id: 1,
//       type: "bug",
//       title: "Fixed array index bug in UserManager",
//       time: "2 hours ago",
//       severity: "critical",
//     },
//     {
//       id: 2,
//       type: "review",
//       title: "Code review completed for auth module",
//       time: "5 hours ago",
//       score: 85,
//     },
//     {
//       id: 3,
//       type: "bug",
//       title: "Memory leak detected in data processing",
//       time: "1 day ago",
//       severity: "major",
//     },
//     {
//       id: 4,
//       type: "review",
//       title: "API endpoints reviewed",
//       time: "1 day ago",
//       score: 92,
//     },
//     {
//       id: 5,
//       type: "bug",
//       title: "SQL injection vulnerability found",
//       time: "2 days ago",
//       severity: "critical",
//     },
//   ];

// //   const weeklyData = [
// //     { day: "Mon", bugs: 12, reviews: 8 },
// //     { day: "Tue", bugs: 19, reviews: 12 },
// //     { day: "Wed", bugs: 15, reviews: 10 },
// //     { day: "Thu", bugs: 22, reviews: 15 },
// //     { day: "Fri", bugs: 18, reviews: 11 },
// //     { day: "Sat", bugs: 8, reviews: 5 },
// //     { day: "Sun", bugs: 10, reviews: 6 },
// //   ];

// //   const maxValue = Math.max(
// //     ...weeklyData.map((d) => Math.max(d.bugs, d.reviews))
// //   );

//  const weeklyData = [
//    { day: "Mon", bugs: 12, reviews: 8 },
//    { day: "Tue", bugs: 19, reviews: 12 },
//    { day: "Wed", bugs: 15, reviews: 10 },
//    { day: "Thu", bugs: 22, reviews: 15 },
//    { day: "Fri", bugs: 18, reviews: 11 },
//    { day: "Sat", bugs: 8, reviews: 5 },
//    { day: "Sun", bugs: 10, reviews: 6 },
//  ];
// const maxValue = Math.max(
//   ...weeklyData.map((d) => Math.max(d.bugs, d.reviews))
// );

// //   const navItems = [
// //     { name: "Dashboard", icon: Home, path: "dashboard" },
// //     { name: "Bug Analyzer", icon: Bug, path: "bug-analyser" },
// //     { name: "Code Review", icon: FileCode, path: "code-review" },
// //     { name: "Analytics", icon: BarChart3, path: "analytics" },
// //     { name: "Settings", icon: Settings, path: "settings" },
// //   ];
// const navItems = [
//   { name: "Dashboard", icon: Home, path: "dashboard" },
//   { name: "Bug Analyzer", icon: Bug, path: "bug-analyser" },
//   { name: "Code Review", icon: FileCode, path: "code-review" },
//   { name: "Analytics", icon: BarChart3, path: "analytics" },
//   { name: "Settings", icon: Settings, path: "settings" },
// ];

// //   const handleNavClick = (path) => {
// //     setCurrentPage(path);
// //     // In a real app, this would navigate to the route
// //     window.location.href = `/${path}`;
// //   };

//  const handleNavClick = (path: string): void => {
//    setCurrentPage(path);
//    // Navigate to the route
//    const newLocation = `/${path}`;
//    if (typeof window !== "undefined") {
//      window.location.assign(newLocation);
//    }
//  };

// //   const handleQuickAction = (path) => {
// //     window.location.href = `/${path}`;
// //   };
// const handleQuickAction = (path: string): void => {
//   const newLocation = `/${path}`;
//   if (typeof window !== "undefined") {
//     window.location.assign(newLocation);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           sidebarOpen ? "w-64" : "w-20"
//         } bg-black/40 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col`}
//       >
//         {/* Logo & Toggle */}
//         <div className="p-6 border-b border-white/10 flex items-center justify-between">
//           {sidebarOpen ? (
//             <>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
//                   <Code className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-white font-bold text-lg">Dev AI</h1>
//                   <p className="text-gray-400 text-xs">v1.0.0</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="p-2 hover:bg-white/10 rounded-lg transition-colors"
//               >
//                 <X className="w-5 h-5 text-gray-400" />
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
//             >
//               <Menu className="w-5 h-5 text-gray-400" />
//             </button>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4">
//           <div className="space-y-2">
//             {navItems.map((item) => {
//               const isActive = currentPage === item.path;
//               return (
//                 <button
//                   key={item.name}
//                   onClick={() => handleNavClick(item.path)}
//                   className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50"
//                       : "text-gray-400 hover:bg-white/10 hover:text-white"
//                   }`}
//                 >
//                   <item.icon className="w-5 h-5 flex-shrink-0" />
//                   {sidebarOpen && (
//                     <span className="font-medium">{item.name}</span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </nav>

//         {/* User Profile */}
//         <div className="p-4 border-t border-white/10">
//           <div
//             className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 ${
//               sidebarOpen ? "" : "justify-center"
//             }`}
//           >
//             <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//               <User className="w-5 h-5 text-white" />
//             </div>
//             {sidebarOpen && (
//               <div className="flex-1 min-w-0">
//                 <p className="text-white font-medium text-sm truncate">
//                   John Doe
//                 </p>
//                 <p className="text-gray-400 text-xs truncate">john@devai.com</p>
//               </div>
//             )}
//           </div>
//           {sidebarOpen && (
//             <button className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
//               <LogOut className="w-4 h-4" />
//               <span className="text-sm font-medium">Logout</span>
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <div className="p-6">
//           {/* Header */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h1 className="text-4xl font-bold text-white mb-2">
//                   Welcome back! 👋
//                 </h1>
//                 <p className="text-gray-400">
//                   Here&apos;s what&apos;s happening with your code today
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <select
//                   value={timeRange}
//                   onChange={(e) => setTimeRange(e.target.value)}
//                   className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="24h" className="bg-slate-900">
//                     Last 24 hours
//                   </option>
//                   <option value="7d" className="bg-slate-900">
//                     Last 7 days
//                   </option>
//                   <option value="30d" className="bg-slate-900">
//                     Last 30 days
//                   </option>
//                   <option value="90d" className="bg-slate-900">
//                     Last 90 days
//                   </option>
//                 </select>
//               </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-red-500/20 rounded-xl">
//                     <Bug className="w-6 h-6 text-red-400" />
//                   </div>
//                   <span className="text-green-400 text-sm font-semibold">
//                     +12%
//                   </span>
//                 </div>
//                 <div className="text-3xl font-bold text-white mb-1">
//                   {stats.bugsAnalyzed}
//                 </div>
//                 <div className="text-gray-400 text-sm">Bugs Analyzed</div>
//               </div>

//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-blue-500/20 rounded-xl">
//                     <FileCode className="w-6 h-6 text-blue-400" />
//                   </div>
//                   <span className="text-green-400 text-sm font-semibold">
//                     +8%
//                   </span>
//                 </div>
//                 <div className="text-3xl font-bold text-white mb-1">
//                   {stats.codeReviewed}
//                 </div>
//                 <div className="text-gray-400 text-sm">Code Reviewed</div>
//               </div>

//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-green-500/20 rounded-xl">
//                     <CheckCircle className="w-6 h-6 text-green-400" />
//                   </div>
//                   <span className="text-green-400 text-sm font-semibold">
//                     +15%
//                   </span>
//                 </div>
//                 <div className="text-3xl font-bold text-white mb-1">
//                   {stats.issuesFixed}
//                 </div>
//                 <div className="text-gray-400 text-sm">Issues Fixed</div>
//               </div>

//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="p-3 bg-purple-500/20 rounded-xl">
//                     <TrendingUp className="w-6 h-6 text-purple-400" />
//                   </div>
//                   <span className="text-green-400 text-sm font-semibold">
//                     +5%
//                   </span>
//                 </div>
//                 <div className="text-3xl font-bold text-white mb-1">
//                   {stats.avgQualityScore}%
//                 </div>
//                 <div className="text-gray-400 text-sm">Avg Quality Score</div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Weekly Activity Chart */}
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                     <BarChart3 className="w-5 h-5" />
//                     Weekly Activity
//                   </h2>
//                   <div className="flex gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 bg-red-500 rounded"></div>
//                       <span className="text-gray-400">Bugs</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 bg-blue-500 rounded"></div>
//                       <span className="text-gray-400">Reviews</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-end justify-between gap-4 h-48">
//                   {weeklyData.map((data, index) => (
//                     <div
//                       key={index}
//                       className="flex-1 flex flex-col items-center gap-2"
//                     >
//                       <div className="w-full flex gap-1 items-end justify-center h-40">
//                         <div
//                           className="w-1/2 bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all hover:opacity-80"
//                           style={{ height: `${(data.bugs / maxValue) * 100}%` }}
//                         ></div>
//                         <div
//                           className="w-1/2 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:opacity-80"
//                           style={{
//                             height: `${(data.reviews / maxValue) * 100}%`,
//                           }}
//                         ></div>
//                       </div>
//                       <span className="text-xs text-gray-400">{data.day}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                   <Zap className="w-5 h-5" />
//                   Quick Actions
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => handleQuickAction("bug-analyser")}
//                     className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="p-2 bg-red-500/20 rounded-lg">
//                         <Bug className="w-6 h-6 text-red-400" />
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Analyze Bugs
//                     </h3>
//                     <p className="text-gray-400 text-sm">
//                       Find and fix code issues instantly
//                     </p>
//                   </button>

//                   <button
//                     onClick={() => handleQuickAction("code-review")}
//                     className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="p-2 bg-blue-500/20 rounded-lg">
//                         <FileCode className="w-6 h-6 text-blue-400" />
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Review Code
//                     </h3>
//                     <p className="text-gray-400 text-sm">
//                       Get quality insights and tips
//                     </p>
//                   </button>

//                   <button
//                     onClick={() => handleQuickAction("analytics")}
//                     className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="p-2 bg-green-500/20 rounded-lg">
//                         <Shield className="w-6 h-6 text-green-400" />
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Security Scan
//                     </h3>
//                     <p className="text-gray-400 text-sm">
//                       Check for vulnerabilities
//                     </p>
//                   </button>

//                   <button
//                     onClick={() => handleQuickAction("analytics")}
//                     className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <div className="p-2 bg-purple-500/20 rounded-lg">
//                         <Target className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                     <h3 className="text-white font-semibold mb-1">
//                       Performance
//                     </h3>
//                     <p className="text-gray-400 text-sm">
//                       Optimize code execution
//                     </p>
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Recent Activity */}
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                   <Activity className="w-5 h-5" />
//                   Recent Activity
//                 </h2>
//                 <div className="space-y-3">
//                   {recentActivity.map((activity) => (
//                     <div
//                       key={activity.id}
//                       className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
//                     >
//                       <div className="flex items-start gap-3">
//                         <div
//                           className={`p-2 rounded-lg ${
//                             activity.type === "bug"
//                               ? "bg-red-500/20"
//                               : "bg-blue-500/20"
//                           }`}
//                         >
//                           {activity.type === "bug" ? (
//                             <Bug className="w-4 h-4 text-red-400" />
//                           ) : (
//                             <FileCode className="w-4 h-4 text-blue-400" />
//                           )}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-white text-sm font-medium mb-1 truncate">
//                             {activity.title}
//                           </p>
//                           <div className="flex items-center gap-2">
//                             <span className="text-xs text-gray-400">
//                               {activity.time}
//                             </span>
//                             {activity.severity && (
//                               <span
//                                 className={`text-xs px-2 py-0.5 rounded-full ${
//                                   activity.severity === "critical"
//                                     ? "bg-red-500/20 text-red-400"
//                                     : "bg-orange-500/20 text-orange-400"
//                                 }`}
//                               >
//                                 {activity.severity}
//                               </span>
//                             )}
//                             {activity.score && (
//                               <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
//                                 {activity.score}%
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Tips & Insights */}
//               <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   💡 Today&apos;s Tip
//                 </h2>
//                 <p className="text-gray-300 text-sm mb-4">
//                   Did you know? Adding proper error handling can reduce
//                   production bugs by up to 40%. Use try-catch blocks and
//                   validate user inputs!
//                 </p>
//                 <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
//                   Learn More
//                 </button>
//               </div>

//               {/* System Status */}
//               <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//                 <h2 className="text-xl font-bold text-white mb-4">
//                   System Status
//                 </h2>
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-400 text-sm">API Status</span>
//                     <span className="flex items-center gap-2 text-green-400 text-sm">
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                       Operational
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-400 text-sm">
//                       Analysis Engine
//                     </span>
//                     <span className="flex items-center gap-2 text-green-400 text-sm">
//                       <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                       Online
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-400 text-sm">Last Updated</span>
//                     <span className="text-gray-400 text-sm">Just now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  Bug,
  FileCode,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Code,
  ArrowRight,
  Activity,
  Calendar,
  Shield,
  Target,
  Home,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const stats = {
    bugsAnalyzed: 156,
    codeReviewed: 89,
    issuesFixed: 134,
    avgQualityScore: 78,
  };

  const recentActivity = [
    {
      id: 1,
      type: "bug",
      title: "Fixed array index bug in UserManager",
      time: "2 hours ago",
      severity: "critical",
    },
    {
      id: 2,
      type: "review",
      title: "Code review completed for auth module",
      time: "5 hours ago",
      score: 85,
    },
    {
      id: 3,
      type: "bug",
      title: "Memory leak detected in data processing",
      time: "1 day ago",
      severity: "major",
    },
    {
      id: 4,
      type: "review",
      title: "API endpoints reviewed",
      time: "1 day ago",
      score: 92,
    },
    {
      id: 5,
      type: "bug",
      title: "SQL injection vulnerability found",
      time: "2 days ago",
      severity: "critical",
    },
  ];

  const weeklyData = [
    { day: "Mon", bugs: 12, reviews: 8 },
    { day: "Tue", bugs: 19, reviews: 12 },
    { day: "Wed", bugs: 15, reviews: 10 },
    { day: "Thu", bugs: 22, reviews: 15 },
    { day: "Fri", bugs: 18, reviews: 11 },
    { day: "Sat", bugs: 8, reviews: 5 },
    { day: "Sun", bugs: 10, reviews: 6 },
  ];

  const maxValue = Math.max(
    ...weeklyData.map((d) => Math.max(d.bugs, d.reviews))
  );

  const navItems = [
    { name: "Dashboard", icon: Home, path: "dashboard" },
    { name: "Bug Analyzer", icon: Bug, path: "bug-analyzer" },
    { name: "Code Review", icon: FileCode, path: "code-review" },
    { name: "Analytics", icon: BarChart3, path: "analytics" },
    { name: "Settings", icon: Settings, path: "settings" },
  ];

  const handleNavClick = (path: string): void => {
    setCurrentPage(path);
    // Navigate to the route
    const newLocation = `/${path}`;
    if (typeof window !== "undefined") {
      window.location.assign(newLocation);
    }
  };

  const handleQuickAction = (path: string): void => {
    const newLocation = `/${path}`;
    if (typeof window !== "undefined") {
      window.location.assign(newLocation);
    }
  };
const handleLogout = (): void => {
  // Perform logout logic here (e.g., clear auth tokens, redirect to login page)
  setShowLogoutModal(false);
  if (typeof window !== "undefined") {
    window.location.assign("/login");
  };
};
  return (
    <div className="min-h-screen  flex">
      {/* bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 */}
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl border border-white/20 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Confirm Logout</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to logout? You&apos;ll need to sign in again
              to access your dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-black/40 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col`}
      >
        {/* Logo & Toggle */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-linear-to-br from-purple-500 to-blue-500 rounded-xl">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-lg">Dev AI</h1>
                  <p className="text-gray-400 text-xs">v1.0.0</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors mx-auto"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-linear-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div
            className={`flex items-center gap-3 p-3 rounded-xl bg-white/5 ${
              sidebarOpen ? "" : "justify-center"
            }`}
          >
            <div className="w-10 h-10  from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  Muees A.
                </p>
                <p className="text-gray-400 text-xs truncate">
                  muees@devai.com
                </p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-gray-400">
                  Here&apos;s what&apos;s happening with your code today
                </p>
              </div>
              <div className="flex gap-3">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="24h" className="bg-slate-900">
                    Last 24 hours
                  </option>
                  <option value="7d" className="bg-slate-900">
                    Last 7 days
                  </option>
                  <option value="30d" className="bg-slate-900">
                    Last 30 days
                  </option>
                  <option value="90d" className="bg-slate-900">
                    Last 90 days
                  </option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-500/20 rounded-xl">
                    <Bug className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.bugsAnalyzed}
                </div>
                <div className="text-gray-400 text-sm">Bugs Analyzed</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FileCode className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">
                    +8%
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.codeReviewed}
                </div>
                <div className="text-gray-400 text-sm">Code Reviewed</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">
                    +15%
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.issuesFixed}
                </div>
                <div className="text-gray-400 text-sm">Issues Fixed</div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-green-400 text-sm font-semibold">
                    +5%
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {stats.avgQualityScore}%
                </div>
                <div className="text-gray-400 text-sm">Avg Quality Score</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Weekly Activity Chart */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Weekly Activity
                  </h2>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-gray-400">Bugs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-gray-400">Reviews</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-4 h-48">
                  {weeklyData.map((data, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center gap-2"
                    >
                      <div className="w-full flex gap-1 items-end justify-center h-40">
                        <div
                          className="w-1/2 bg-linear-to-t from-red-500 to-red-400 rounded-t transition-all hover:opacity-80"
                          style={{ height: `${(data.bugs / maxValue) * 100}%` }}
                        ></div>
                        <div
                          className="w-1/2 bg-linear-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:opacity-80"
                          style={{
                            height: `${(data.reviews / maxValue) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleQuickAction("bug-analyser")}
                    className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Bug className="w-6 h-6 text-red-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      Analyze Bugs
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Find and fix code issues instantly
                    </p>
                  </button>

                  <button
                    onClick={() => handleQuickAction("code-review")}
                    className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <FileCode className="w-6 h-6 text-blue-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      Review Code
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get quality insights and tips
                    </p>
                  </button>

                  <button
                    onClick={() => handleQuickAction("analytics")}
                    className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Shield className="w-6 h-6 text-green-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      Security Scan
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Check for vulnerabilities
                    </p>
                  </button>

                  <button
                    onClick={() => handleQuickAction("analytics")}
                    className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl text-left hover:scale-105 transition-transform group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Target className="w-6 h-6 text-purple-400" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">
                      Performance
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Optimize code execution
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            activity.type === "bug"
                              ? "bg-red-500/20"
                              : "bg-blue-500/20"
                          }`}
                        >
                          {activity.type === "bug" ? (
                            <Bug className="w-4 h-4 text-red-400" />
                          ) : (
                            <FileCode className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium mb-1 truncate">
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {activity.time}
                            </span>
                            {activity.severity && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  activity.severity === "critical"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-orange-500/20 text-orange-400"
                                }`}
                              >
                                {activity.severity}
                              </span>
                            )}
                            {activity.score && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                {activity.score}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips & Insights */}
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  💡 Today&apos;s Tip
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  Did you know? Adding proper error handling can reduce
                  production bugs by up to 40%. Use try-catch blocks and
                  validate user inputs!
                </p>
                <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                  Learn More
                </button>
              </div>

              {/* System Status */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  System Status
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">API Status</span>
                    <span className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">
                      Analysis Engine
                    </span>
                    <span className="flex items-center gap-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Last Updated</span>
                    <span className="text-gray-400 text-sm">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
