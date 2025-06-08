"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  User,
  LogOut,
  Settings,
  Key,
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  Activity,
  Globe,
  Smartphone,
  Sun,
  Moon,
  Wifi,
  Server,
  Zap,
  Clock,
  Bell,
  MapPin,
  Calendar,
  TrendingUp,
  Database,
  Cpu,
  HardDrive,
  Network,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
} from "lucide-react";

export default function EnhancedSecurityDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState({ username: "Loading..." });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStats, setSystemStats] = useState({
    cpu: 23,
    memory: 67,
    storage: 45,
    network: 89,
  });
  const [securityAlerts, setSecurityAlerts] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Color schemes for light and dark modes
  const colorScheme = {
    light: {
      primary: "#6366f1", // Indigo
      secondary: "#ec4899", // Pink
      accent: "#10b981", // Emerald
      warning: "#f59e0b", // Amber
      background:
        "linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf2f8 100%)",
      cardBg: "rgba(255, 255, 255, 0.7)",
      textPrimary: "#1f2937",
      textSecondary: "#6b7280",
    },
    dark: {
      primary: "#8b5cf6", // Purple
      secondary: "#f472b6", // Pink
      accent: "#34d399", // Emerald
      warning: "#fbbf24", // Amber
      background:
        "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      cardBg: "rgba(255, 255, 255, 0.05)",
      textPrimary: "#f9fafb",
      textSecondary: "#9ca3af",
    },
  };

  const colors = isDarkMode ? colorScheme.dark : colorScheme.light;

  // Fetch username from localhost on component mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Try to get username from localhost API
        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser({ username: userData.username || userData.name || "User" });
        } else {
          // Fallback to localStorage "users" key
          const storedUsers =
            typeof window !== "undefined" && window.localStorage
              ? localStorage.getItem("users")
              : null;

          if (storedUsers) {
            const usersArray = JSON.parse(storedUsers);
            const storedUsername = usersArray[0]?.username || "Alexander";
            setUser({ username: storedUsername });
          } else {
            setUser({ username: "Alexander" });
          }
        }
      } catch (error) {
        console.log("Could not fetch username from localhost, using fallback");

        // Fallback to localStorage "users" key
        const storedUsers =
          typeof window !== "undefined" && window.localStorage
            ? localStorage.getItem("users")
            : null;

        if (storedUsers) {
          const usersArray = JSON.parse(storedUsers);
          const storedUsername = usersArray[0]?.username || "Alexander";
          setUser({ username: storedUsername });
        } else {
          setUser({ username: "Alexander" });
        }
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate system stats updates
    const statsTimer = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 50,
        storage: Math.floor(Math.random() * 20) + 40,
        network: Math.floor(Math.random() * 20) + 80,
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(statsTimer);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const SecurityCard = ({ title, status, icon: Icon, color, description }) => (
    <div
      className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: `${color}30`,
        boxShadow: `0 4px 20px ${color}20`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${color}20`,
            color,
          }}
        >
          {status}
        </div>
      </div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: colors.textPrimary }}
      >
        {title}
      </h3>
      <p className="text-sm" style={{ color: colors.textSecondary }}>
        {description}
      </p>
    </div>
  );

  const StatCard = ({ label, value, unit, icon: Icon, trend }) => (
    <div
      className="p-4 rounded-xl border backdrop-blur-sm"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: `${colors.primary}30`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className="h-5 w-5" style={{ color: colors.primary }} />
        {trend && (
          <TrendingUp className="h-4 w-4" style={{ color: colors.accent }} />
        )}
      </div>
      <div className="space-y-1">
        <div
          className="text-2xl font-bold"
          style={{ color: colors.textPrimary }}
        >
          {value}
          <span
            className="text-sm font-normal"
            style={{ color: colors.textSecondary }}
          >
            {unit}
          </span>
        </div>
        <div className="text-xs" style={{ color: colors.textSecondary }}>
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen transition-all duration-500"
      style={{
        background: colors.background,
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        ></div>
      </div>

      {/* Fixed Navigation - Removes white gap */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: `${colors.primary}30`,
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="relative p-3 rounded-xl"
                style={{ backgroundColor: colors.primary }}
              >
                <Shield className="h-6 w-6 text-white" />
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: colors.accent }}
                ></div>
              </div>
              <div>
                <span
                  className="text-xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  CyberGuard Pro
                </span>
                <div
                  className="text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  Enterprise Security Suite
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" style={{ color: colors.primary }} />
                ) : (
                  <Moon className="h-5 w-5" style={{ color: colors.primary }} />
                )}
              </button>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${colors.accent}20`,
                  color: colors.accent,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: colors.accent }}
                ></div>
                <span className="text-xs font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Header - Fixed padding to account for fixed nav */}
      <header
        className="border-b backdrop-blur-xl pt-20"
        style={{
          backgroundColor: colors.cardBg,
          borderColor: `${colors.primary}20`,
        }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="p-4 rounded-2xl"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <User className="h-8 w-8" style={{ color: colors.primary }} />
              </div>
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Welcome back, {user.username}
                </h1>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {currentTime.toLocaleDateString()} •{" "}
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary,
                }}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span className="text-sm font-medium">Refresh</span>
              </button>
              <div className="relative">
                <Bell
                  className="h-6 w-6"
                  style={{ color: colors.textSecondary }}
                />
                {securityAlerts > 0 && (
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: colors.warning }}
                  >
                    {securityAlerts}
                  </div>
                )}
              </div>
              <Link href="/" passHref legacyBehavior>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: `${colors.secondary}20`,
                    color: colors.secondary,
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* System Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="CPU Usage"
              value={systemStats.cpu}
              unit="%"
              icon={Cpu}
              trend={true}
            />
            <StatCard
              label="Memory"
              value={systemStats.memory}
              unit="%"
              icon={HardDrive}
            />
            <StatCard
              label="Storage"
              value={systemStats.storage}
              unit="%"
              icon={Database}
            />
            <StatCard
              label="Network"
              value={systemStats.network}
              unit="%"
              icon={Network}
              trend={true}
            />
          </div>

          {/* Security Status Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityCard
              title="Firewall Protection"
              status="ACTIVE"
              icon={Shield}
              color={colors.accent}
              description="Real-time threat detection and blocking enabled"
            />
            <SecurityCard
              title="Encryption Status"
              status="AES-256"
              icon={Lock}
              color={colors.primary}
              description="All data encrypted with military-grade security"
            />
            <SecurityCard
              title="VPN Connection"
              status="SECURED"
              icon={Globe}
              color={colors.secondary}
              description="Anonymous browsing with global server network"
            />
            <SecurityCard
              title="Malware Scanner"
              status="CLEAN"
              icon={Eye}
              color={colors.accent}
              description="Last scan completed 2 minutes ago"
            />
            <SecurityCard
              title="Two-Factor Auth"
              status="ENABLED"
              icon={Key}
              color={colors.primary}
              description="Additional security layer activated"
            />
            <SecurityCard
              title="Device Security"
              status="TRUSTED"
              icon={Smartphone}
              color={colors.secondary}
              description="This device is registered and verified"
            />
          </div>

          {/* Charts and Analytics */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Security Events Chart */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: `${colors.primary}30`,
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3
                    className="h-6 w-6"
                    style={{ color: colors.primary }}
                  />
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: colors.textPrimary }}
                  >
                    Security Events
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Filter
                      className="h-4 w-4"
                      style={{ color: colors.primary }}
                    />
                  </button>
                  <button
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <Download
                      className="h-4 w-4"
                      style={{ color: colors.primary }}
                    />
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { type: "Blocked Attacks", count: 247, color: colors.accent },
                  {
                    type: "Quarantined Files",
                    count: 12,
                    color: colors.warning,
                  },
                  { type: "Login Attempts", count: 89, color: colors.primary },
                  {
                    type: "Data Transfers",
                    count: 156,
                    color: colors.secondary,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span
                        className="text-sm"
                        style={{ color: colors.textPrimary }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-24 rounded-full overflow-hidden"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            backgroundColor: item.color,
                            width: `${(item.count / 300) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: `${colors.secondary}30`,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity
                  className="h-6 w-6"
                  style={{ color: colors.secondary }}
                />
                <h2
                  className="text-xl font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  {
                    action: "Security scan completed",
                    time: "2 minutes ago",
                    status: "success",
                    icon: CheckCircle,
                  },
                  {
                    action: "Firewall rule updated",
                    time: "15 minutes ago",
                    status: "info",
                    icon: Shield,
                  },
                  {
                    action: "Suspicious login blocked",
                    time: "1 hour ago",
                    status: "warning",
                    icon: AlertTriangle,
                  },
                  {
                    action: "Backup completed",
                    time: "2 hours ago",
                    status: "success",
                    icon: Database,
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ backgroundColor: `${colors.primary}10` }}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor:
                          activity.status === "success"
                            ? `${colors.accent}20`
                            : activity.status === "warning"
                            ? `${colors.warning}20`
                            : `${colors.primary}20`,
                      }}
                    >
                      <activity.icon
                        className="h-4 w-4"
                        style={{
                          color:
                            activity.status === "success"
                              ? colors.accent
                              : activity.status === "warning"
                              ? colors.warning
                              : colors.primary,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-sm font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        {activity.action}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: colors.textSecondary }}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="p-6 rounded-2xl border backdrop-blur-sm"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: `${colors.accent}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6" style={{ color: colors.accent }} />
              <h2
                className="text-xl font-semibold"
                style={{ color: colors.textPrimary }}
              >
                Quick Actions
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { label: "Run Scan", icon: Eye, color: colors.primary },
                {
                  label: "Update Rules",
                  icon: Settings,
                  color: colors.secondary,
                },
                { label: "Backup Data", icon: Database, color: colors.accent },
                { label: "Check Logs", icon: Activity, color: colors.warning },
                { label: "VPN Settings", icon: Globe, color: colors.primary },
                { label: "Add Device", icon: Plus, color: colors.secondary },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: `${action.color}20`,
                    border: `1px solid ${action.color}30`,
                  }}
                >
                  <action.icon
                    className="h-6 w-6"
                    style={{ color: action.color }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: colors.textPrimary }}
                  >
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: colors.primary,
          boxShadow: `0 8px 32px ${colors.primary}40`,
        }}
      >
        <Plus className="h-6 w-6 text-white" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
