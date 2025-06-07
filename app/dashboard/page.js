"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
} from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginTime, setLoginTime] = useState("");
  const [accountCreatedTime, setAccountCreatedTime] = useState("");
  const router = useRouter();

  const username = useSearchParams().get("username");

  useEffect(() => {
    const now = new Date().toLocaleString();
    setLoginTime(now);
    setAccountCreatedTime(now);
    const currentUser = getCurrentUserFromLocalStorage();
    setUser(currentUser);
  }, []);

  const getCurrentUserFromLocalStorage = () => {
    try {
      const users = localStorage.getItem("users");
      if (users) {
        const usersArray = JSON.parse(users);
        return usersArray.length > 0 ? usersArray[usersArray.length - 1] : null;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user from localStorage:", error);
      return null;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0e0e2c" }}
      >
        <div
          className="animate-spin h-8 w-8 border-4 border-white/20 rounded-full"
          style={{ borderTopColor: "#20c997" }}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0e0e2c" }}>
      {/* Header */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between min-w-[300px]">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-[#20c997] rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SecureAuth</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#f06595]">
            <div className="w-2 h-2 bg-[#f06595] rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </nav>
      <header
        className="border-b bg-white/5 backdrop-blur-xl"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "#20c997" }}
            >
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">SecureAuth</span>
              <div className="text-xs" style={{ color: "#a0aec0" }}>
                Enterprise Security
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{
                backgroundColor: "rgba(32, 201, 151, 0.1)",
                borderColor: "rgba(32, 201, 151, 0.3)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "#20c997" }}
              ></div>
              <span
                className="text-xs font-medium"
                style={{ color: "#20c997" }}
              >
                Secure Session
              </span>
            </div>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-200 border hover:border-red-400/50"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
                color: "#a0aec0",
              }}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderColor: "rgba(255,255,255,0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">
                Security Dashboard
              </h1>
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: "rgba(32, 201, 151, 0.1)",
                  borderColor: "rgba(32, 201, 151, 0.3)",
                }}
              >
                <Lock className="h-4 w-4" style={{ color: "#20c997" }} />
                <span
                  className="text-sm font-medium"
                  style={{ color: "#20c997" }}
                >
                  Encrypted
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="flex items-center gap-4 p-6 rounded-xl border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "#20c997" }}
                >
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Welcome, {username || "User"}
                  </h2>
                  <p className="text-sm mb-2" style={{ color: "#a0aec0" }}>
                    Authenticated & Verified
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      className="h-4 w-4"
                      style={{ color: "#20c997" }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#20c997" }}
                    >
                      Identity Confirmed
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5" style={{ color: "#20c997" }} />
                    <span className="text-sm text-white">Location</span>
                  </div>
                  <span className="text-sm" style={{ color: "#a0aec0" }}>
                    Secured
                  </span>
                </div>
                <div
                  className="flex items-center justify-between p-4 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone
                      className="h-5 w-5"
                      style={{ color: "#20c997" }}
                    />
                    <span className="text-sm text-white">Device</span>
                  </div>
                  <span className="text-sm" style={{ color: "#a0aec0" }}>
                    Trusted
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Security Recommendations */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#f06595" }}
                >
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Security Center
                </h2>
              </div>

              <div className="space-y-4">
                <div
                  className="p-4 border rounded-xl"
                  style={{
                    borderColor: "rgba(240, 101, 149, 0.3)",
                    backgroundColor: "rgba(240, 101, 149, 0.1)",
                  }}
                >
                  <div className="flex gap-3">
                    <AlertTriangle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      style={{ color: "#f06595" }}
                    />
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#f06595" }}
                      >
                        Enable Two-Factor Authentication
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "#a0aec0" }}>
                        Strengthen your account with an additional security
                        layer
                      </p>
                      <button
                        className="px-3 py-1.5 rounded-lg text-xs transition-colors border"
                        style={{
                          backgroundColor: "rgba(240, 101, 149, 0.2)",
                          borderColor: "rgba(240, 101, 149, 0.5)",
                          color: "#f06595",
                        }}
                      >
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 border rounded-xl"
                  style={{
                    borderColor: "rgba(32, 201, 151, 0.3)",
                    backgroundColor: "rgba(32, 201, 151, 0.1)",
                  }}
                >
                  <div className="flex gap-3">
                    <Key
                      className="h-5 w-5 shrink-0 mt-0.5"
                      style={{ color: "#20c997" }}
                    />
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#20c997" }}
                      >
                        Password Security
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "#a0aec0" }}>
                        Regular updates keep your account secure
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex-1 h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        >
                          <div
                            className="h-full w-3/4 rounded-full"
                            style={{ backgroundColor: "#20c997" }}
                          ></div>
                        </div>
                        <span className="text-xs" style={{ color: "#a0aec0" }}>
                          Strong
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="p-4 border rounded-xl"
                  style={{
                    borderColor: "rgba(32, 201, 151, 0.3)",
                    backgroundColor: "rgba(32, 201, 151, 0.1)",
                  }}
                >
                  <div className="flex gap-3">
                    <CheckCircle
                      className="h-5 w-5 shrink-0 mt-0.5"
                      style={{ color: "#20c997" }}
                    />
                    <div>
                      <h3
                        className="font-semibold mb-1"
                        style={{ color: "#20c997" }}
                      >
                        Account Verified
                      </h3>
                      <p className="text-sm" style={{ color: "#a0aec0" }}>
                        Your identity has been successfully verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Activity */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#20c997" }}
                >
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-4">
                <div
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "rgba(32, 201, 151, 0.2)" }}
                      >
                        <LogOut
                          className="h-4 w-4"
                          style={{ color: "#20c997" }}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          Account Login
                        </h3>
                        <p className="text-xs" style={{ color: "#a0aec0" }}>
                          {loginTime}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-2 py-1 text-xs rounded-full border font-medium"
                      style={{
                        backgroundColor: "rgba(32, 201, 151, 0.2)",
                        borderColor: "rgba(32, 201, 151, 0.5)",
                        color: "#20c997",
                      }}
                    >
                      Success
                    </span>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "rgba(240, 101, 149, 0.2)" }}
                      >
                        <User
                          className="h-4 w-4"
                          style={{ color: "#f06595" }}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          Account Created
                        </h3>
                        <p className="text-xs" style={{ color: "#a0aec0" }}>
                          {accountCreatedTime}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-2 py-1 text-xs rounded-full border font-medium"
                      style={{
                        backgroundColor: "rgba(240, 101, 149, 0.2)",
                        borderColor: "rgba(240, 101, 149, 0.5)",
                        color: "#f06595",
                      }}
                    >
                      Success
                    </span>
                  </div>
                </div>

                <div
                  className="p-4 rounded-xl border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: "rgba(32, 201, 151, 0.2)" }}
                      >
                        <Eye className="h-4 w-4" style={{ color: "#20c997" }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          Security Scan
                        </h3>
                        <p className="text-xs" style={{ color: "#a0aec0" }}>
                          Automated check completed
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-2 py-1 text-xs rounded-full border font-medium"
                      style={{
                        backgroundColor: "rgba(32, 201, 151, 0.2)",
                        borderColor: "rgba(32, 201, 151, 0.5)",
                        color: "#20c997",
                      }}
                    >
                      Clean
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <div
              className="p-4 rounded-xl text-center border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: "#20c997" }}
              >
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">
                Encryption
              </h3>
              <p className="text-xs" style={{ color: "#20c997" }}>
                AES-256 Active
              </p>
            </div>

            <div
              className="p-4 rounded-xl text-center border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: "#f06595" }}
              >
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">
                Protection
              </h3>
              <p className="text-xs" style={{ color: "#f06595" }}>
                Real-time
              </p>
            </div>

            <div
              className="p-4 rounded-xl text-center border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: "#20c997" }}
              >
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">
                Monitoring
              </h3>
              <p className="text-xs" style={{ color: "#20c997" }}>
                24/7 Active
              </p>
            </div>

            <div
              className="p-4 rounded-xl text-center border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: "#f06595" }}
              >
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">Status</h3>
              <p className="text-xs" style={{ color: "#f06595" }}>
                All Systems OK
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
