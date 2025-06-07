// Clean Modern Login Page - Fixed Design with Exact Color Pattern
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

      // Check if email verification is required
      if (!user.emailVerified) {
        setShowEmailVerification(true);
        setIsLoading(false);
        toast.warning("Email verification required", {
          description: "Please verify your email to complete login.",
        });
        return;
      }

      // Redirect to dashboard
      router.push("/dashboard?username=" + encodeURIComponent(username));

      // Successfully authenticated
      toast.success("Login successful", {
        description: `Welcome back!`,
      });

      // If password is expired, show warning
      if (user.passwordExpired) {
        toast.warning("Password expired", {
          description: "Your password has expired. Please change it.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
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

    // Get user email from localStorage
    let userEmail = "";
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.username === username);

      if (!user) {
        setError("User not found. Please check your username.");
        return;
      }

      // Check if email exists in user object, or use username if it's an email
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

        // Show success message and hide email verification prompt
        setShowEmailVerification(false);
      } else {
        setError(data.error || "Failed to send verification email");
        toast.error("Failed to send email", {
          description: data.error || "Please try again later.",
        });
      }
    } catch (error) {
      console.error("Email sending error:", error);
      setError("An error occurred while sending the email");
      toast.error("Email sending failed", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-[#0e0e2c] flex items-center justify-center p-4">
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
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Section - Information */}
        <div className="flex flex-col justify-center space-y-8 lg:pr-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#20c997] rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Secure Access
            </h1>
            <p className="text-xl text-[#a0aec0] mb-8 leading-relaxed">
              Sign in to your account and enjoy enterprise-grade security with a
              seamless user experience.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[#20c997]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    End-to-End Encryption
                  </h3>
                  <p className="text-[#a0aec0] text-sm">
                    Your data is protected at every step
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#20c997]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Lightning Fast</h3>
                  <p className="text-[#a0aec0] text-sm">
                    Optimized for speed and performance
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#20c997]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Trusted Platform</h3>
                  <p className="text-[#a0aec0] text-sm">
                    Industry-leading security standards
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex flex-col justify-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-[#a0aec0]">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Verification */}
              {showEmailVerification && (
                <div className="bg-[#f06595]/10 border border-[#f06595]/20 rounded-xl p-4 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-[#f06595] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[#f06595] font-semibold text-sm mb-1">
                        Email Verification Required
                      </h4>
                      <p className="text-[#a0aec0] text-sm">
                        Please verify your email address before continuing.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSendVerification}
                    disabled={isSendingEmail}
                    className="w-full bg-[#f06595] hover:bg-[#f06595]/90 disabled:bg-[#a0aec0]/20 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isSendingEmail ? (
                      <>
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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

              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#a0aec0]" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#20c997] focus:border-[#20c997] transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-white text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#a0aec0]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-[#a0aec0] focus:outline-none focus:ring-2 focus:ring-[#20c997] focus:border-[#20c997] transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#a0aec0] hover:text-[#20c997] transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#20c997] hover:bg-[#20c997]/90 disabled:bg-[#a0aec0]/20 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#20c997]/50 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Loging In...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-[#a0aec0] text-sm mb-3">
                  Don't have an account?
                </p>
                <Link href="/register" passHref legacyBehavior>
                  <a className="inline-block bg-transparent border-2 border-[#20c997] text-[#20c997] hover:bg-[#20c997] hover:text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#20c997]/50">
                    Create Account
                  </a>
                </Link>
              </div>
            </form>
          </div>

          {/* Security Footer */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center space-x-2 text-[#a0aec0] text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <Shield className="w-4 h-4 text-[#20c997]" />
              <span>Protected by enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
