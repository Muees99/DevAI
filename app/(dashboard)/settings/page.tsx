"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  Key,
  Palette,
  Code,
  Globe,
  Mail,
  Save,
  Check,
  X,
  Eye,
  EyeOff,
  Upload,
  Trash2,
  Download,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile Settings
  const [profile, setProfile] = useState({
    fullName: "Muees A.",
    email: "muees@devai.com",
    username: "mueesai",
    bio: "Full-stack developer passionate about clean code",
    company: "Dev AI Inc.",
    location: "San Francisco, CA",
    website: "https://muees99.dev",
  });

  // Password Settings
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bugAlerts: true,
    codeReviews: true,
    weeklyReport: false,
    securityAlerts: true,
    productUpdates: false,
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: "dark",
    language: "en",
    fontSize: "medium",
    codeTheme: "monokai",
  });

  // API Settings
  // const [apiSettings, setApiSettings] = useState({
  //  api:"",
  //   webhookUrl: "",
  //   rateLimit: "100",
  // });

  // API Settings
const [apiSettings, setApiSettings] = useState({
  apiKey: 'da_live_xxxxxxxxxxxxxxxxxxxx',  // ← 
  webhookUrl: 'https://api.example.com/webhook',
  rateLimit: '100'
});

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "api", name: "API & Integrations", icon: Code },
  ];

  const handleSave = () => {
    // Save logic here
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleBackToDashboard = () => {
    if (typeof window !== "undefined") {
      window.location.assign("/dashboard");
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications({
      ...notifications,
      [field]: !notifications[field as keyof typeof notifications],
    });
  };

  const handleAppearanceChange = (field: string, value: string) => {
    setAppearance({ ...appearance, [field]: value });
  };

  const handleApiChange = (field: string, value: string) => {
    setApiSettings({ ...apiSettings, [field]: value });
  };

  const generateApiKey = () => {
    const prefix = "devai_"; // safe custom prefix 
    const randomPart = crypto.randomUUID().replace(/-/g, "").slice(0, 24);

    const newKey = prefix + randomPart;

    setApiSettings({ ...apiSettings, apiKey: newKey });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiSettings.apiKey);
    alert("API key copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Success Notification */}
        {showSaveNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in">
            <Check className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

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
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Settings
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">
                        {tab.name}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      Profile Information
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Update your personal information and profile details
                    </p>
                  </div>

                  {/* Profile Picture */}
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                      {profile.fullName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        Profile Picture
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-lg transition-colors flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          Upload
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg transition-colors flex items-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) =>
                          handleProfileChange("fullName", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          handleProfileChange("username", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        handleProfileChange("bio", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) =>
                          handleProfileChange("company", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) =>
                          handleProfileChange("location", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) =>
                        handleProfileChange("website", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      Security Settings
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Manage your password and security preferences
                    </p>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h3 className="text-green-400 font-semibold mb-1">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-300 mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showOldPassword ? "text" : "password"}
                            value={passwords.oldPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "oldPassword",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter current password"
                          />
                          <button
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                          >
                            {showOldPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwords.newPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "newPassword",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter new password"
                          />
                          <button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwords.confirmPassword}
                          onChange={(e) =>
                            handlePasswordChange(
                              "confirmPassword",
                              e.target.value,
                            )
                          }
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <h3 className="text-red-400 font-semibold mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      Permanently delete your account and all data
                    </p>
                    <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Choose what notifications you want to receive
                    </p>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-purple-400" />
                          <div>
                            <h3 className="text-white font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {key === "emailNotifications" &&
                                "Receive email notifications for important updates"}
                              {key === "bugAlerts" &&
                                "Get notified when critical bugs are detected"}
                              {key === "codeReviews" &&
                                "Notifications for completed code reviews"}
                              {key === "weeklyReport" &&
                                "Weekly summary of your code analysis"}
                              {key === "securityAlerts" &&
                                "Critical security vulnerability alerts"}
                              {key === "productUpdates" &&
                                "News about new features and updates"}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle(key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? "bg-purple-500" : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      Appearance Settings
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Customize how Dev AI looks for you
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["dark", "light", "auto"].map((theme) => (
                        <button
                          key={theme}
                          onClick={() => handleAppearanceChange("theme", theme)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            appearance.theme === theme
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {theme === "dark" && (
                              <Moon className="w-6 h-6 text-white" />
                            )}
                            {theme === "light" && (
                              <Sun className="w-6 h-6 text-white" />
                            )}
                            {theme === "auto" && (
                              <Monitor className="w-6 h-6 text-white" />
                            )}
                            <span className="text-white text-sm font-medium capitalize">
                              {theme}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Language
                    </label>
                    <select
                      value={appearance.language}
                      onChange={(e) =>
                        handleAppearanceChange("language", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="en" className="bg-slate-900">
                        English
                      </option>
                      <option value="es" className="bg-slate-900">
                        Español
                      </option>
                      <option value="fr" className="bg-slate-900">
                        Français
                      </option>
                      <option value="de" className="bg-slate-900">
                        Deutsch
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Font Size
                    </label>
                    <select
                      value={appearance.fontSize}
                      onChange={(e) =>
                        handleAppearanceChange("fontSize", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="small" className="bg-slate-900">
                        Small
                      </option>
                      <option value="medium" className="bg-slate-900">
                        Medium
                      </option>
                      <option value="large" className="bg-slate-900">
                        Large
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Code Editor Theme
                    </label>
                    <select
                      value={appearance.codeTheme}
                      onChange={(e) =>
                        handleAppearanceChange("codeTheme", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="monokai" className="bg-slate-900">
                        Monokai
                      </option>
                      <option value="dracula" className="bg-slate-900">
                        Dracula
                      </option>
                      <option value="github" className="bg-slate-900">
                        GitHub
                      </option>
                      <option value="solarized" className="bg-slate-900">
                        Solarized
                      </option>
                    </select>
                  </div>
                </div>
              )}

              {/* API Tab */}
              {activeTab === "api" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                      API & Integrations
                    </h2>
                    <p className="text-sm text-gray-400 mb-6">
                      Manage your API keys and webhook integrations
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      API Key
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={apiSettings.apiKey}
                        readOnly
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm"
                      />
                      <button
                        onClick={copyApiKey}
                        className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Copy
                      </button>
                      <button
                        onClick={generateApiKey}
                        className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      >
                        Regenerate
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Keep your API key secure. Don&apos;t share it publicly.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={apiSettings.webhookUrl}
                      onChange={(e) =>
                        handleApiChange("webhookUrl", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://your-domain.com/webhook"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Rate Limit (requests/hour)
                    </label>
                    <input
                      type="number"
                      value={apiSettings.rateLimit}
                      onChange={(e) =>
                        handleApiChange("rateLimit", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      API Documentation
                    </h3>
                    <p className="text-sm text-gray-300 mb-3">
                      Learn how to integrate Dev AI with your applications
                    </p>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                      View Documentation
                    </button>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all font-medium flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
