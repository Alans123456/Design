"use client";
import React from "react";
import Link from "next/link";
import {
  Shield,
  Lock,
  UserPlus,
  LineChart,
  EyeOff,
  KeyRound,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Lock,
      title: "AI-Powered Password Analysis",
      description:
        "Real-time strength evaluation with machine learning recommendations and breach detection.",
      color: "bg-[#20c997]",
    },
    {
      icon: UserPlus,
      title: "Advanced CAPTCHA Shield",
      description:
        "Multi-layer bot protection with behavioral analysis and challenge-response verification.",
      color: "bg-[#f06595]",
    },
    {
      icon: LineChart,
      title: "Intelligent Threat Monitoring",
      description:
        "24/7 anomaly detection with predictive analytics and automated response protocols.",
      color: "bg-[#20c997]",
    },
    {
      icon: EyeOff,
      title: "Zero-Knowledge Architecture",
      description:
        "End-to-end encryption with salt-based hashing and cryptographic key management.",
      color: "bg-[#f06595]",
    },
    {
      icon: KeyRound,
      title: "Adaptive Account Protection",
      description:
        "Dynamic lockout policies with geolocation analysis and device fingerprinting.",
      color: "bg-[#20c997]",
    },
    {
      icon: Shield,
      title: "Policy Enforcement Engine",
      description:
        "Configurable security policies with compliance tracking and audit logging.",
      color: "bg-[#f06595]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] overflow-hidden">
      {/* Subtle background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#20c997]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#f06595]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm border border-[#e2e8f0] rounded-2xl px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between min-w-[300px]">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-[#20c997] rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#1e293b]">
                SecureAuth
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#f06595]">
              <div className="w-2 h-2 bg-[#f06595] rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center bg-[#20c997]/10 border border-[#20c997]/20 rounded-full px-4 py-2 text-sm text-[#20c997]">
                    <Zap className="h-4 w-4 mr-2" />
                    Next-Generation Security Platform
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                    <span className="text-[#1e293b]">Secure</span>
                    <br />
                    <span className="text-[#20c997]">Authentication</span>
                    <br />
                    <span className="text-[#64748b]">Redefined</span>
                  </h1>
                  <p className="text-xl text-[#64748b] leading-relaxed max-w-xl">
                    Experience military-grade security with zero compromise on
                    user experience. Advanced AI protection that adapts to
                    modern threats.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link href="/register" passHref legacyBehavior>
                    <button className="group relative overflow-hidden bg-[#20c997] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#1da07d] hover:shadow-md">
                      <div className="relative flex items-center">
                        <UserPlus className="h-5 w-5 mr-3" />
                        Start Free Trial
                      </div>
                    </button>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <button className="group bg-white border border-[#e2e8f0] text-[#1e293b] font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:bg-[#f8fafc] hover:shadow-md">
                      <Lock className="inline h-5 w-5 mr-3" />
                      Enterprise Login
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#20c997]">
                      99.9%
                    </div>
                    <div className="text-sm text-[#64748b]">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#f06595]">
                      256-bit
                    </div>
                    <div className="text-sm text-[#64748b]">Encryption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#20c997]">
                      24/7
                    </div>
                    <div className="text-sm text-[#64748b]">Monitoring</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full h-96 lg:h-[500px]">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="relative">
                      <div className="w-32 h-32 bg-[#20c997] rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
                        <Shield className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-[#20c997] rounded-3xl blur-xl opacity-30 animate-ping"></div>
                    </div>
                  </div>

                  {[
                    Lock,
                    KeyRound,
                    EyeOff,
                    LineChart,
                    CheckCircle,
                    UserPlus,
                  ].map((Icon, index) => {
                    const angle = index * 60 * (Math.PI / 180);
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    const iconColor = index % 2 === 0 ? "#20c997" : "#f06595";
                    return (
                      <div
                        key={index}
                        className="absolute w-16 h-16 bg-white border border-[#e2e8f0] rounded-2xl flex items-center justify-center shadow-md animate-bounce"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)",
                          animationDelay: `${index * 0.2}s`,
                          animationDuration: "3s",
                        }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: iconColor }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-[#f0fdfa]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-[#1e293b]">Security</span>{" "}
                <span className="text-[#20c997]">Arsenal</span>
              </h2>
              <p className="text-xl text-[#64748b] max-w-3xl mx-auto">
                Comprehensive protection suite engineered for the modern digital
                landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:shadow-lg transition-all duration-500 hover:border-[#20c997]/30"
                >
                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-4 rounded-2xl shadow-sm mb-6 ${feature.color}`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e293b] mb-4 group-hover:text-[#20c997] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[#64748b] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e2e8f0] py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="relative p-3 bg-[#20c997] rounded-2xl">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e293b]">
                    SecureAuth
                  </div>
                  <div className="text-sm text-[#64748b]">
                    Digital Security Redefined
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm text-[#64748b]">
                <span className="hover:text-[#20c997] cursor-pointer transition-colors">
                  Privacy
                </span>
                <span className="hover:text-[#20c997] cursor-pointer transition-colors">
                  Terms
                </span>
                <span className="hover:text-[#20c997] cursor-pointer transition-colors">
                  Security
                </span>
                <span className="hover:text-[#20c997] cursor-pointer transition-colors">
                  Support
                </span>
              </div>
            </div>

            <div className="border-t border-[#e2e8f0] mt-12 pt-8 text-center">
              <p className="text-[#64748b]">
                © 2025 SecureAuth. Pioneering the future of digital security.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
