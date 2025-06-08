"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle,
  Users,
  Globe,
  Award,
  Zap,
  Database,
  Server,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden">
      <div className="relative z-20">
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm border border-[#e2e8f0] rounded-2xl px-8 py-4 shadow-sm hover:shadow-md hover:border-[#20c997]/50 transition-all duration-300">
          <div className="flex items-center justify-between min-w-[300px]">
            <div className="flex items-center gap-3 group">
              <div className="relative p-2 bg-[#20c997] rounded-xl group-hover:bg-[#f06595] transition-colors duration-300">
                <Shield className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-xl font-bold text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                SecureAuth
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#f06595] group-hover:text-[#20c997] transition-colors duration-300">
              <div className="w-2 h-2 bg-[#f06595] rounded-full animate-pulse group-hover:bg-[#20c997]"></div>
              <span>Live</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Simplified Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#20c997]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f06595]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-50 border-b border-[#e2e8f0] bg-white">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 group">
              <div className="relative group-hover:rotate-12 transition-transform duration-300">
                <div className="relative p-3 bg-[#20c997] rounded-2xl group-hover:bg-[#f06595] transition-colors duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                  SecureAuth
                </h1>
                <span className="text-xs text-[#20c997] font-semibold tracking-wider uppercase group-hover:text-[#f06595] transition-colors duration-300">
                  Enterprise Security Platform
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-[#64748b] hover:text-[#1e293b] transition-colors font-medium hover:scale-105">
                Support
              </button>
              <div className="w-px h-6 bg-[#e2e8f0]"></div>
              <Link href="/login" passHref legacyBehavior>
                <button className="group relative px-8 py-3 bg-[#20c997] hover:bg-[#20c997]/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-[#20c997]/30 hover:scale-[1.02]">
                  <span className="relative z-10">Login</span>
                  <div className="absolute inset-0 bg-[#20c997] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-[#20c997]/10 border border-[#20c997]/30 rounded-full mb-8 hover:bg-[#20c997]/20 hover:scale-105 transition-all duration-300 group">
                <Award className="h-4 w-4 text-[#20c997] mr-2 group-hover:rotate-12 transition-transform" />
                <span className="text-sm font-medium text-[#20c997] group-hover:text-[#1e293b] transition-colors">
                  Trusted by Fortune 500 Companies
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                <span className="text-[#20c997] hover:text-[#1e293b] transition-colors duration-300 inline-block">
                  Enterprise
                </span>
                <br />
                <span className="text-[#1e293b] hover:text-[#20c997] transition-colors duration-300 inline-block">
                  Authentication
                </span>
              </h1>

              <p className="text-xl text-[#64748b] leading-relaxed max-w-2xl mx-auto mb-12 hover:text-[#1e293b] transition-colors duration-300">
                Join the most secure authentication platform trusted by industry
                leaders. Experience military-grade security with seamless user
                experience.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center group">
                  <div className="text-3xl font-bold text-[#20c997] mb-1 group-hover:text-[#1e293b] transition-colors duration-300">
                    99.99%
                  </div>
                  <div className="text-sm text-[#64748b] font-medium group-hover:text-[#20c997] transition-colors duration-300">
                    Uptime SLA
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-[#f06595] mb-1 group-hover:text-[#1e293b] transition-colors duration-300">
                    2M+
                  </div>
                  <div className="text-sm text-[#64748b] font-medium group-hover:text-[#f06595] transition-colors duration-300">
                    Active Users
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl font-bold text-[#20c997] mb-1 group-hover:text-[#1e293b] transition-colors duration-300">
                    150+
                  </div>
                  <div className="text-sm text-[#64748b] font-medium group-hover:text-[#20c997] transition-colors duration-300">
                    Countries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Registration Form - Left Side */}
              <div className="lg:col-span-2">
                <div className="sticky top-8">
                  <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 shadow-md hover:shadow-lg hover:border-[#20c997]/50 transition-all duration-300">
                    <div className="text-center mb-8">
                      <div className="inline-flex p-4 bg-[#20c997]/10 border border-[#20c997]/30 rounded-2xl mb-6 group hover:scale-110 transition-transform duration-300">
                        <Users className="h-8 w-8 text-[#20c997] group-hover:rotate-12 transition-transform" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#1e293b] mb-2 group-hover:text-[#20c997] transition-colors duration-300">
                        Create Your Account
                      </h2>
                      <p className="text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        Join thousands of security professionals
                      </p>
                    </div>

                    <RegisterForm />

                    <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
                      <p className="text-center text-sm text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        By creating an account, you agree to our{" "}
                        <a
                          href="#"
                          className="text-[#20c997] hover:text-[#f06595] transition-colors duration-300"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-[#20c997] hover:text-[#f06595] transition-colors duration-300"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid - Right Side */}
              <div className="lg:col-span-3 space-y-8">
                {/* Security Features */}
                <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-8 group">
                    <div className="p-3 bg-[#20c997] rounded-2xl mr-4 group-hover:bg-[#f06595] group-hover:rotate-12 transition-all duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                        Enterprise Security
                      </h3>
                      <p className="text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        Military-grade protection for your business
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group p-6 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#20c997]/50 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-[#20c997]/20 rounded-lg mr-3 group-hover:bg-[#20c997] transition-colors duration-300">
                          <Lock className="h-5 w-5 text-[#20c997] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                          AES-256 Encryption
                        </h4>
                      </div>
                      <p className="text-sm text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        Bank-level encryption protects all your sensitive data
                        and communications.
                      </p>
                    </div>

                    <div className="group p-6 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#f06595]/50 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-[#f06595]/20 rounded-lg mr-3 group-hover:bg-[#f06595] transition-colors duration-300">
                          <Eye className="h-5 w-5 text-[#f06595] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#1e293b] group-hover:text-[#f06595] transition-colors duration-300">
                          Real-time Monitoring
                        </h4>
                      </div>
                      <p className="text-sm text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        AI-powered threat detection monitors your account 24/7
                        for suspicious activity.
                      </p>
                    </div>

                    <div className="group p-6 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#20c997]/50 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-[#20c997]/20 rounded-lg mr-3 group-hover:bg-[#20c997] transition-colors duration-300">
                          <Zap className="h-5 w-5 text-[#20c997] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                          Zero-Trust Model
                        </h4>
                      </div>
                      <p className="text-sm text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        Every request is verified and authenticated for maximum
                        security assurance.
                      </p>
                    </div>

                    <div className="group p-6 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#f06595]/50 transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-[#f06595]/20 rounded-lg mr-3 group-hover:bg-[#f06595] transition-colors duration-300">
                          <Database className="h-5 w-5 text-[#f06595] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#1e293b] group-hover:text-[#f06595] transition-colors duration-300">
                          Data Sovereignty
                        </h4>
                      </div>
                      <p className="text-sm text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                        Your data stays within your jurisdiction with our global
                        infrastructure.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Infrastructure & Compliance */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:border-[#f06595]/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-6 group">
                      <div className="p-3 bg-[#f06595] rounded-2xl mr-4 group-hover:bg-[#20c997] group-hover:rotate-12 transition-all duration-300">
                        <Server className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1e293b] group-hover:text-[#f06595] transition-colors duration-300">
                          Global Infrastructure
                        </h3>
                        <p className="text-[#64748b] text-sm group-hover:text-[#1e293b] transition-colors duration-300">
                          Worldwide coverage
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center group">
                        <span className="text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                          Data Centers
                        </span>
                        <span className="text-[#1e293b] font-semibold group-hover:text-[#f06595] transition-colors duration-300">
                          50+
                        </span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                          Response Time
                        </span>
                        <span className="text-[#20c997] font-semibold group-hover:text-[#1e293b] transition-colors duration-300">
                          &lt;50ms
                        </span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-[#64748b] group-hover:text-[#1e293b] transition-colors duration-300">
                          Availability
                        </span>
                        <span className="text-[#20c997] font-semibold group-hover:text-[#1e293b] transition-colors duration-300">
                          99.99%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:border-[#20c997]/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-6 group">
                      <div className="p-3 bg-[#20c997] rounded-2xl mr-4 group-hover:bg-[#f06595] group-hover:rotate-12 transition-all duration-300">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1e293b] group-hover:text-[#20c997] transition-colors duration-300">
                          Compliance Standards
                        </h3>
                        <p className="text-[#64748b] text-sm group-hover:text-[#1e293b] transition-colors duration-300">
                          Industry certifications
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="px-3 py-2 bg-[#20c997]/10 border border-[#20c997]/30 rounded-lg text-center group hover:bg-[#20c997] hover:scale-105 transition-all duration-300">
                        <span className="text-[#20c997] font-semibold text-sm group-hover:text-white transition-colors duration-300">
                          SOC 2
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-[#f06595]/10 border border-[#f06595]/30 rounded-lg text-center group hover:bg-[#f06595] hover:scale-105 transition-all duration-300">
                        <span className="text-[#f06595] font-semibold text-sm group-hover:text-white transition-colors duration-300">
                          ISO 27001
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-[#20c997]/10 border border-[#20c997]/30 rounded-lg text-center group hover:bg-[#20c997] hover:scale-105 transition-all duration-300">
                        <span className="text-[#20c997] font-semibold text-sm group-hover:text-white transition-colors duration-300">
                          GDPR
                        </span>
                      </div>
                      <div className="px-3 py-2 bg-[#f06595]/10 border border-[#f06595]/30 rounded-lg text-center group hover:bg-[#f06595] hover:scale-105 transition-all duration-300">
                        <span className="text-[#f06595] font-semibold text-sm group-hover:text-white transition-colors duration-300">
                          HIPAA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Standards Section */}
        <section className="py-20 border-t border-[#e2e8f0] bg-[#f0fdfa]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16 group">
              <h2 className="text-4xl font-bold text-[#1e293b] mb-4">
                <span className="group-hover:text-[#20c997] transition-colors duration-300">
                  Security
                </span>{" "}
                <span className="text-[#20c997] group-hover:text-[#1e293b] transition-colors duration-300">
                  Standards
                </span>
              </h2>
              <p className="text-xl text-[#64748b] max-w-2xl mx-auto group-hover:text-[#1e293b] transition-colors duration-300">
                Built with enterprise-grade security from the ground up
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:border-[#20c997]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-[#20c997]/10 border border-[#20c997]/30 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300">
                    <Lock className="h-8 w-8 text-[#20c997] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-4 group-hover:text-[#20c997] transition-colors duration-300">
                    Password Security
                  </h3>
                  <p className="text-[#64748b] mb-6 leading-relaxed group-hover:text-[#1e293b] transition-colors duration-300">
                    Advanced password policies with multi-factor authentication
                    and biometric verification options.
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-[#20c997]/10 border border-[#20c997]/30 rounded-full group-hover:bg-[#20c997] group-hover:border-[#20c997] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 text-[#20c997] mr-2 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[#20c997] font-medium text-sm group-hover:text-white transition-colors duration-300">
                      Enterprise Grade
                    </span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:border-[#f06595]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-[#f06595]/10 border border-[#f06595]/30 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300">
                    <Shield className="h-8 w-8 text-[#f06595] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-4 group-hover:text-[#f06595] transition-colors duration-300">
                    Bot Protection
                  </h3>
                  <p className="text-[#64748b] mb-6 leading-relaxed group-hover:text-[#1e293b] transition-colors duration-300">
                    AI-powered CAPTCHA and behavioral analysis prevent automated
                    attacks and ensure human verification.
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-[#f06595]/10 border border-[#f06595]/30 rounded-full group-hover:bg-[#f06595] group-hover:border-[#f06595] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 text-[#f06595] mr-2 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[#f06595] font-medium text-sm group-hover:text-white transition-colors duration-300">
                      AI-Powered
                    </span>
                  </div>
                </div>
              </div>

              <div className="group bg-white border border-[#e2e8f0] rounded-3xl p-8 hover:border-[#20c997]/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-[#20c997]/10 border border-[#20c997]/30 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300">
                    <Eye className="h-8 w-8 text-[#20c997] group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-4 group-hover:text-[#20c997] transition-colors duration-300">
                    Privacy Protection
                  </h3>
                  <p className="text-[#64748b] mb-6 leading-relaxed group-hover:text-[#1e293b] transition-colors duration-300">
                    End-to-end encryption and zero-knowledge architecture ensure
                    your data remains completely private.
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-[#20c997]/10 border border-[#20c997]/30 rounded-full group-hover:bg-[#20c997] group-hover:border-[#20c997] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 text-[#20c997] mr-2 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[#20c997] font-medium text-sm group-hover:text-white transition-colors duration-300">
                      Zero-Knowledge
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-12 border-t border-[#e2e8f0]">
              <div className="flex justify-center items-center space-x-12">
                <div className="flex items-center space-x-3 px-6 py-3 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#20c997]/50 hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-[#20c997] rounded-xl flex items-center justify-center group-hover:bg-[#f06595] transition-colors duration-300">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[#1e293b] font-semibold group-hover:text-[#20c997] transition-colors duration-300">
                      SOC 2 Type II
                    </div>
                    <div className="text-[#64748b] text-sm group-hover:text-[#1e293b] transition-colors duration-300">
                      Certified
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 px-6 py-3 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#f06595]/50 hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-[#f06595] rounded-xl flex items-center justify-center group-hover:bg-[#20c997] transition-colors duration-300">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[#1e293b] font-semibold group-hover:text-[#f06595] transition-colors duration-300">
                      ISO 27001
                    </div>
                    <div className="text-[#64748b] text-sm group-hover:text-[#1e293b] transition-colors duration-300">
                      Compliant
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 px-6 py-3 bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#20c997]/50 hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-[#20c997] rounded-xl flex items-center justify-center group-hover:bg-[#f06595] transition-colors duration-300">
                    <Globe className="h-5 w-5 text-white group-hover:rotate-12 transition-transform" />
                  </div>
                  <div>
                    <div className="text-[#1e293b] font-semibold group-hover:text-[#20c997] transition-colors duration-300">
                      GDPR Ready
                    </div>
                    <div className="text-[#64748b] text-sm group-hover:text-[#1e293b] transition-colors duration-300">
                      Privacy First
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
