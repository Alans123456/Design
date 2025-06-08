// app/verifyUser/page.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyUserPage() {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }
    verifyToken();
  }, [token]);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === "success" && countdown === 0) {
      handleRedirect();
    }
  }, [status, countdown]);

  const verifyToken = async () => {
    try {
      const response = await fetch("/api/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("success");
        setMessage("Email verified successfully! Welcome to your account.");
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred during verification. Please try again.");
    }
  };

  const handleRedirect = () => {
    setIsRedirecting(true);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div
          className={`rounded-xl overflow-hidden border ${
            status === "success"
              ? "border-[#20c997]/30"
              : status === "error"
              ? "border-[#f06595]/30"
              : "border-gray-200"
          } shadow-lg`}
        >
          <div
            className={`p-6 ${
              status === "success"
                ? "bg-[#20c997]/10"
                : status === "error"
                ? "bg-[#f06595]/10"
                : "bg-white"
            }`}
          >
            <div className="flex justify-center mb-4">
              <div
                className={`p-4 rounded-full ${
                  status === "success"
                    ? "bg-[#20c997]/20 text-[#20c997]"
                    : status === "error"
                    ? "bg-[#f06595]/20 text-[#f06595]"
                    : "bg-white text-[#20c997] border border-gray-200"
                }`}
              >
                {status === "verifying" ? (
                  <Loader2 className="h-10 w-10 animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle className="h-10 w-10" />
                ) : (
                  <XCircle className="h-10 w-10" />
                )}
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-center text-gray-900">
              {status === "verifying" && "Account Verification"}
              {status === "success" && "Verification Complete!"}
              {status === "error" && "Verification Failed"}
            </h1>
          </div>

          <div className="bg-white p-6">
            <p
              className={`text-center mb-6 ${
                status === "success"
                  ? "text-[#20c997]"
                  : status === "error"
                  ? "text-[#f06595]"
                  : "text-gray-600"
              }`}
            >
              {message}
            </p>

            {status === "verifying" && (
              <div className="space-y-4">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#20c997] rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-xs text-center text-gray-500">
                  Securely validating your credentials...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-2 bg-[#20c997]/10 rounded-lg py-3">
                  <Clock className="h-5 w-5 text-[#20c997]" />
                  <span className="text-[#20c997] font-medium">
                    Redirecting in {countdown}s
                  </span>
                </div>
                <button
                  onClick={handleRedirect}
                  disabled={isRedirecting}
                  className="w-full flex items-center justify-center py-3 px-4 bg-[#20c997] hover:bg-[#20c997]/90 disabled:bg-[#20c997]/70 text-white font-medium rounded-lg transition-colors"
                >
                  {isRedirecting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-6">
                <div className="text-sm text-gray-700 space-y-2">
                  <p className="font-medium text-[#f06595]">Possible issues:</p>
                  <ul className="space-y-1 pl-4">
                    <li className="list-disc">Expired verification link</li>
                    <li className="list-disc">Invalid or used token</li>
                    <li className="list-disc">Network issue</li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => router.push("/login")}
                    className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                  >
                    Back to Login
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="py-2 px-4 bg-[#20c997] hover:bg-[#20c997]/90 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <Shield className="h-3 w-3 text-[#20c997]" />
              <span>Secure verification process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
