"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

// Password Strength Meter Component
function PasswordStrengthMeter({ strength, feedback }) {
  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-amber-500";
    if (strength === 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-300">Password Strength</span>
        <span
          className={`text-xs font-medium ${
            strength <= 1
              ? "text-red-500"
              : strength === 2
              ? "text-amber-500"
              : strength === 3
              ? "text-blue-500"
              : "text-green-500"
          }`}
        >
          {getStrengthText()}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full ${
              level <= strength ? getStrengthColor() : "bg-muted"
            }`}
          />
        ))}
      </div>
      {feedback.length > 0 && (
        <ul className="text-xs text-green-400 space-y-1">
          {feedback.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Analyze password strength
const analyzePassword = (password) => {
  const feedback = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push("Use at least 8 characters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("Add uppercase letters");

  if (/[a-z]/.test(password)) score++;
  else feedback.push("Add lowercase letters");

  if (/\d/.test(password)) score++;
  else feedback.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push("Add special characters");

  return { score: Math.min(score, 4), feedback };
};

// Dummy check for existing users
const checkUserExists = (username) => {
  const existingUsers = ["admin", "user", "test"];
  return existingUsers.includes(username.toLowerCase());
};

// Dummy save user function
const saveUser = async (username, password, email) => {
  console.log("User saved:", { username, email });
};

// Simple toast functions (DOM based)
const toast = {
  success: (title, options) => {
    const div = document.createElement("div");
    div.className =
      "fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow z-50";
    div.innerHTML = `<strong>${title}</strong><div class="text-sm">${
      options?.description || ""
    }</div>`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  },
  error: (title, options) => {
    const div = document.createElement("div");
    div.className =
      "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow z-50";
    div.innerHTML = `<strong>${title}</strong><div class="text-sm">${
      options?.description || ""
    }</div>`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
  },
};

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    if (password) {
      const result = analyzePassword(password);
      setPasswordStrength(result.score);
      setPasswordFeedback(result.feedback);
    } else {
      setPasswordStrength(0);
      setPasswordFeedback([]);
    }
  }, [password]);

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!username.trim()) {
      errors.username = "Username is required";
    } else if (username.length < 4) {
      errors.username = "Must be at least 4 characters";
    } else if (checkUserExists(username)) {
      errors.username = "Username already exists";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (passwordStrength < 2) {
      errors.password = "Password is too weak";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!captchaVerified) {
      errors.captcha = "Please verify CAPTCHA";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please correct the highlighted fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await saveUser(username, password, email);
      toast.success("Success", {
        description: "Your account has been created!",
      });

      // Reset form
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setCaptchaVerified(false);
      recaptchaRef.current?.reset();
    } catch (err) {
      toast.error("Something went wrong", {
        description: err.message || "Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#f8fafc] rounded-xl shadow-2xl border border-slate-200">
      <div className="text-center mb-6">
        <Shield className="w-10 h-10 mx-auto text-cyan-600" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Create Secure Account
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Please fill in all required fields
        </p>
      </div>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 w-full h-10 bg-white border ${
                formErrors.email ? "border-rose-400" : "border-slate-300"
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-800 placeholder-slate-400`}
              placeholder="you@example.com"
            />
          </div>
          {formErrors.email && (
            <p className="text-sm text-rose-500 mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`pl-10 w-full h-10 bg-white border ${
                formErrors.username ? "border-rose-400" : "border-slate-300"
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-800 placeholder-slate-400`}
              placeholder="Choose a username"
            />
          </div>
          {formErrors.username && (
            <p className="text-sm text-rose-500 mt-1">{formErrors.username}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 w-full h-10 bg-white border ${
                formErrors.password ? "border-rose-400" : "border-slate-300"
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-800 placeholder-slate-400`}
              placeholder="••••••••"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-sm text-rose-500 mt-1">{formErrors.password}</p>
          )}
        </div>

        {password && (
          <PasswordStrengthMeter
            strength={passwordStrength}
            feedback={passwordFeedback}
          />
        )}

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-10 w-full h-10 bg-white border ${
                formErrors.confirmPassword
                  ? "border-rose-400"
                  : "border-slate-300"
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-800 placeholder-slate-400`}
              placeholder="Repeat password"
            />
          </div>
          {formErrors.confirmPassword && (
            <p className="text-sm text-rose-500 mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* reCAPTCHA */}
        <div className="my-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LdgfVkrAAAAAAna8O1SFhYz6L_n-yTwNr4Pt3t8" // test sitekey
            onChange={(token) => setCaptchaVerified(!!token)}
          />
          {formErrors.captcha && (
            <p className="text-sm text-rose-500 mt-1">{formErrors.captcha}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !captchaVerified}
          className={`w-full h-10 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 ${
            isSubmitting || !captchaVerified
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

        <div className="mt-4 text-xs text-black text-center">
          By creating an account, you agree to our{" "}
          <a
            href="#"
            className="text-cyan-600 hover:text-cyan-500 hover:underline transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-cyan-600 hover:text-cyan-500 hover:underline transition-colors"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
