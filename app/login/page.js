"use client";
import React, { useState } from "react";
import {
  Shield,
  User,
  Lock,
  AlertTriangle,
  Eye,
  EyeOff,
  CheckCircle,
  Zap,
  Mail,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authenticateUser } from "@/lib/storage";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      const user = await authenticateUser(username, password);

      if (!user.emailVerified) {
        setShowEmailVerification(true);
        setIsLoading(false);
        toast.warning("Email verification required", {
          description: "Please verify your email to complete login.",
        });
        return;
      }

      router.push("/dashboard?username=" + encodeURIComponent(username));
      toast.success("Login successful", {
        description: `Welcome back!`,
      });

      if (user.passwordExpired) {
        toast.warning("Password expired", {
          description: "Your password has expired. Please change it.",
        });
      }
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
      toast.error("Login failed", {
        description: error.message || "Invalid username or password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerification = async () => {
    if (!username) {
      setError("Please enter your username first");
      return;
    }

    let userEmail = "";
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.username === username);

      if (!user) {
        setError("User not found. Please check your username.");
        return;
      }

      userEmail = user.email || (username.includes("@") ? username : "");

      if (!userEmail) {
        setError("No email found for this user");
        return;
      }
    } catch (error) {
      setError("Error retrieving user information");
      return;
    }

    setIsSendingEmail(true);
    setError("");

    try {
      const response = await fetch("/api/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          username: username,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Verification email sent!", {
          description: `Check ${userEmail} for the verification link.`,
          duration: 8000,
        });
        setShowEmailVerification(false);
      } else {
        setError(data.error || "Failed to send verification email");
        toast.error("Failed to send email", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      setError("An error occurred while sending the email");
      toast.error("Email sending failed", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-4">
      {/* Nav */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white border border-gray-200 rounded-2xl px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between min-w-[300px]">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-[#20c997] rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SecureAuth</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#f06595]">
            <div className="w-2 h-2 bg-[#f06595] rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Info Section */}
        <div className="flex flex-col justify-center space-y-8 lg:pr-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#20c997] rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Secure Access
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sign in to your account and enjoy enterprise-grade security with a
              seamless user experience.
            </p>
            {[
              [
                "End-to-End Encryption",
                "Your data is protected at every step",
                <CheckCircle />,
              ],
              [
                "Lightning Fast",
                "Optimized for speed and performance",
                <Zap />,
              ],
              [
                "Trusted Platform",
                "Industry-leading security standards",
                <Shield />,
              ],
            ].map(([title, desc, Icon], i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {React.cloneElement(Icon, {
                    className: "w-5 h-5 text-[#20c997]",
                  })}
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center">
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-300 rounded-xl p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {showEmailVerification && (
                <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#f06595] mt-0.5" />
                    <div>
                      <h4 className="text-[#f06595] font-semibold text-sm mb-1">
                        Email Verification Required
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Please verify your email address before continuing.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={isSendingEmail}
                    className="w-full bg-[#f06595] hover:bg-[#f06595]/90 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2"
                  >
                    {isSendingEmail ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="opacity-25"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5 0 0 5 0 12h4z"
                            className="opacity-75"
                          />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Verification Email</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-12 pr-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#20c997] outline-none"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-12 pr-12 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#20c997] outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#20c997]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#20c997] hover:bg-[#20c997]/90 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl shadow-md focus:ring-2 focus:ring-[#20c997]/50"
              >
                {isLoading ? "Loging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/register" className="text-[#f06595] hover:underline">
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
