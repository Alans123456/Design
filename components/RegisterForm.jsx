'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Shield, RotateCcw, Check, X } from 'lucide-react';

// Enhanced Multi-Stage CAPTCHA Component
function CreativeCaptcha({ onVerify }) {
  const [showChallenge, setShowChallenge] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [challengeSequence, setChallengeSequence] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [stageResults, setStageResults] = useState([]);
  const [userRotation, setUserRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);

  const addChallenges = [
    {
      type: "word",
      image: "/wordCaptcha.png",
      answer: "5K3tC4OA",
      question: "Enter the text shown in the image:"
    },
    {
      type: "image",
      image: "/DirectedHand.jpg",
      rotation: 90,
      question: "Rotate the image on the right to match the one on the left:"
    }
  ];

  const existingChallenges = [
    {
      type: 'pattern',
      question: 'Complete the sequence: 🌟 🌙 🌟 🌙 ?',
      answer: '🌟',
      options: ['🌟', '🌙', '☀️', '⭐']
    },
    {
      type: 'logic',
      question: 'Which one doesn\'t belong: 🐕 🐱 🐭 🚗',
      answer: '🚗',
      options: ['🐕', '🐱', '🐭', '🚗']
    },
    {
      type: 'math_visual',
      question: 'How many circles? ⭕ ⭕ ⭕ 🔴 ⭕',
      answer: '4',
      options: ['3', '4', '5', '2']
    },
    {
      type: 'color',
      question: 'Which color matches fire? 🔥',
      answer: 'red',
      options: ['red', 'blue', 'green', 'purple']
    },
    {
      type: 'direction',
      question: 'If ⬆️ means UP, what does ⬇️ mean?',
      answer: 'down',
      options: ['down', 'left', 'right', 'up']
    },
    {
      type: 'counting',
      question: 'Count the hearts: ❤️ 💙 ❤️ ❤️ 💚 ❤️',
      answer: '4',
      options: ['3', '4', '5', '6']
    }
  ];

  const startVerification = () => {
    setShowChallenge(true);
    generateChallengeSequence();
    setCurrentStage(0);
    setStageResults([]);
    setIsVerified(false);
  };

  const generateChallengeSequence = () => {
    // Create sequence: 2 from addChallenges + 1 random from existing
    const sequence = [...addChallenges];
    const randomExisting = existingChallenges[Math.floor(Math.random() * existingChallenges.length)];
    sequence.push(randomExisting);
    
    setChallengeSequence(sequence);
    
    // Initialize rotation for image challenge
    if (sequence[1]?.type === 'image') {
      setTargetRotation(sequence[1].rotation);
      setUserRotation(0);
    }
  };

  const getCurrentChallenge = () => {
    return challengeSequence[currentStage];
  };

  const handleTextAnswer = (answer) => {
    const currentChallenge = getCurrentChallenge();
    setUserAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer.toLowerCase() === currentChallenge.answer.toLowerCase();
    
    if (isCorrect) {
      handleStageComplete(true);
    } else {
      handleStageComplete(false);
    }
  };

  const handleOptionSelect = (answer) => {
    const currentChallenge = getCurrentChallenge();
    setUserAnswer(answer);
    setShowFeedback(true);
    
    const isCorrect = answer === currentChallenge.answer;
    
    if (isCorrect) {
      handleStageComplete(true);
    } else {
      handleStageComplete(false);
    }
  };

  const handleRotationSubmit = () => {
    setShowFeedback(true);
    const tolerance = 15; // degrees
    const isCorrect = Math.abs(userRotation - targetRotation) <= tolerance;
    
    if (isCorrect) {
      handleStageComplete(true);
    } else {
      handleStageComplete(false);
    }
  };

  const handleStageComplete = (success) => {
    const newResults = [...stageResults];
    newResults[currentStage] = success;
    setStageResults(newResults);

    setTimeout(() => {
      if (success) {
        if (currentStage < challengeSequence.length - 1) {
          // Move to next stage
          setCurrentStage(currentStage + 1);
          setUserAnswer('');
          setShowFeedback(false);
          setAttempts(0);
          if (challengeSequence[currentStage + 1]?.type === 'image') {
            setUserRotation(0);
          }
        } else {
          // All stages complete
          setIsVerified(true);
          onVerify(true);
        }
      } else {
        setAttempts(attempts + 1);
        if (attempts >= 2) {
          resetToStage(currentStage);
        } else {
          setShowFeedback(false);
          setUserAnswer('');
          if (getCurrentChallenge()?.type === 'image') {
            setUserRotation(0);
          }
        }
      }
    }, 1500);
  };

  const resetToStage = (stage) => {
    setCurrentStage(stage);
    setAttempts(0);
    setShowFeedback(false);
    setUserAnswer('');
    if (challengeSequence[stage]?.type === 'image') {
      setUserRotation(0);
    }
  };

  const resetChallenge = () => {
    generateChallengeSequence();
    setCurrentStage(0);
    setAttempts(0);
    setIsVerified(false);
    setShowChallenge(true);
    setStageResults([]);
    setUserAnswer('');
    setUserRotation(0);
    onVerify(false);
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">
          Step {currentStage + 1} of {challengeSequence.length}
        </span>
        <span className="text-xs text-gray-500">
          {Math.round(((currentStage) / challengeSequence.length) * 100)}% Complete
        </span>
      </div>
      <div className="flex space-x-1">
        {challengeSequence.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < currentStage
                ? stageResults[index]
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : index === currentStage
                ? 'bg-blue-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Word CAPTCHA component
  const WordChallenge = ({ challenge }) => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
          <img
            src={challenge.image}
            alt="CAPTCHA"
            className="mx-auto h-16 w-auto"
          />
          <p className="text-xs text-gray-500 mt-2">Enter the text shown above</p>
        </div>
      </div>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-black text-gray-600 text-center font-mono tracking-wider ${
          showFeedback
            ? userAnswer.toLowerCase() === challenge.answer.toLowerCase()
              ? 'border-green-500 bg-green-50'
              : 'border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-blue-500'
        }`}
        placeholder="Type the text here..."
        disabled={showFeedback}
        autoComplete="off"
      />
      {!showFeedback && (
        <button
          onClick={() => handleTextAnswer(userAnswer)}
          disabled={!userAnswer.trim()}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify Text
        </button>
      )}
    </div>
  );

  // Image Rotation Challenge component
  const ImageChallenge = ({ challenge }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Target image */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Target</p>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <img
              src={challenge.image}
              alt="Target"
              className="mx-auto h-20 w-auto transform transition-transform"
              style={{ transform: `rotate(${targetRotation}deg)` }}
          />
        </div>
        </div>
        
        {/* User controllable image */}
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Match This</p>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <img
              src={challenge.image}
              alt="Target"
              className="mx-auto h-20 w-auto transform transition-transform"
              style={{ transform: `rotate(${userRotation}deg)` }}
            />
        </div>
        </div>

      </div>
      
      {/* Rotation controls */}
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-sm text-gray-600">Rotation: {userRotation}°</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUserRotation((prev) => (prev - 15) % 360)}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-sm"
            disabled={showFeedback}
          >
            ↺ -15°
          </button>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={userRotation}
            onChange={(e) => setUserRotation(parseInt(e.target.value))}
            className="flex-1"
            disabled={showFeedback}
          />
          <button
            onClick={() => setUserRotation((prev) => (prev + 15) % 360)}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded text-sm"
            disabled={showFeedback}
          >
            ↻ +15°
          </button>
        </div>
        {!showFeedback && (
          <button
            onClick={handleRotationSubmit}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Rotation
          </button>
        )}
      </div>
    </div>
  );

  // Multiple choice challenge component
  const MultipleChoiceChallenge = ({ challenge }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {challenge.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleOptionSelect(option)}
            disabled={showFeedback}
            className={`p-3 text-center text-black rounded-md border transition-all ${
              showFeedback && userAnswer === option
                ? userAnswer === challenge.answer
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-red-100 border-red-300 text-red-800'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            <span className="text-lg">{option}</span>
            {showFeedback && userAnswer === option && (
              <div className="mt-1">
                {userAnswer === challenge.answer ? (
                  <Check className="h-4 w-4 mx-auto text-green-600" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-600" />
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  if (!showChallenge) {
    return (
      <div className="space-y-3 text-white">
        <label className="block text-sm font-medium">Human Verification</label>
        <div className="p-4 bg- border border-border rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm text-gray-100 mb-2">
              Complete 3 security challenges to verify you're human
            </p>
            <p className="text-xs text-gray-100 mb-4">
              Text recognition • Image rotation • Logic puzzle
            </p>
            <button
              type="button"
              onClick={startVerification}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Start Verification
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (challengeSequence.length === 0) return null;

  const currentChallenge = getCurrentChallenge();

  return (
    <div className="space-y-3 text-white">
      <label className="block text-sm font-medium">Human Verification</label>
      <div className="p-4  border border-border rounded-lg">
        {isVerified ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-green-600 font-medium">Verification Complete!</p>
            <p className="text-xs text-gray-200 mt-1">All security challenges passed</p>
            <button
              type="button"
              onClick={resetChallenge}
              className="text-xs text-muted-foreground text-gray-200 hover:text-foreground mt-2"
            >
              Try new challenges
            </button>
          </div>
        ) : (
          <>
            <ProgressIndicator />
            
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">{currentChallenge.question}</h3>
              
              {currentChallenge.type === 'word' && (
                <WordChallenge challenge={currentChallenge} />
              )}
              
              {currentChallenge.type === 'image' && (
                <ImageChallenge challenge={currentChallenge} />
              )}
              
              {currentChallenge.options && (
                <MultipleChoiceChallenge challenge={currentChallenge} />
              )}
            </div>

            {showFeedback && (
              <div className={`text-center py-2 px-3 rounded-md text-sm ${
                (currentChallenge.type === 'word' && userAnswer.toLowerCase() === currentChallenge.answer.toLowerCase()) ||
                (currentChallenge.type === 'image' && Math.abs(userRotation - targetRotation) <= 15) ||
                (currentChallenge.options && userAnswer === currentChallenge.answer)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {(currentChallenge.type === 'word' && userAnswer.toLowerCase() === currentChallenge.answer.toLowerCase()) ||
                 (currentChallenge.type === 'image' && Math.abs(userRotation - targetRotation) <= 15) ||
                 (currentChallenge.options && userAnswer === currentChallenge.answer)
                  ? currentStage === challengeSequence.length - 1
                    ? 'Excellent! Verification complete.'
                    : 'Correct! Moving to next challenge...'
                  : 'Incorrect. Please try again.'}
              </div>
            )}
            
            {attempts > 0 && !showFeedback && (
              <p className="text-xs text-amber-600 mt-2 text-center">
                {attempts === 1 ? 'Try again!' : 'One more try, then challenge resets'}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={resetChallenge}
                className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset All
              </button>
              {currentStage > 0 && (
                <button
                  type="button"
                  onClick={() => resetToStage(currentStage)}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Retry This Challenge
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Password Strength Meter Component
function PasswordStrengthMeter({ strength, feedback }) {
  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-amber-500';
    if (strength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength <= 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  const passwordStrength = strength || 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center text-white justify-between">
        <span className="text-xs text-gray-300 ">Password Strength</span>
        <span className={`text-xs font-medium ${
          passwordStrength <= 1
            ? 'text-red-500'
            : passwordStrength === 2
            ? 'text-amber-500'
            : passwordStrength === 3
            ? 'text-blue-500'
            : 'text-green-500'
        }`}>{getStrengthText()}</span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full ${
              level <= strength ? getStrengthColor() : 'bg-muted'
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

// Mock password analysis function
const analyzePassword = (password) => {
  const feedback = [];
  let score = 0;

  if (password.length >= 8) score++;
  else feedback.push('Use at least 8 characters');

  if (/[A-Z]/.test(password)) score++;
  else feedback.push('Add uppercase letters');

  if (/[a-z]/.test(password)) score++;
  else feedback.push('Add lowercase letters');

  if (/\d/.test(password)) score++;
  else feedback.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score++;
  else feedback.push('Add special characters');

  return { score: Math.min(score, 4), feedback };
};

// Mock storage functions
const checkUserExists = (username) => {
  // Mock implementation - in real app, this would check against a database
  const existingUsers = ['admin', 'user', 'test'];
  return existingUsers.includes(username.toLowerCase());
};

const saveUser = async (username, password, email ) => {
  // Simple encryption using window.crypto.subtle (AES-GCM)
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode("simple-static-key-1234"), // In production, use a secure key!
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("user-salt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(password)
  );
  // Store as base64 for simplicity
  const encryptedPassword = btoa(
    String.fromCharCode(...new Uint8Array(encrypted))
  );
  const ivBase64 = btoa(String.fromCharCode(...iv));
  const userData = {
     email,
    username,
    password: encryptedPassword,
    iv: ivBase64
  };
  // Save to localStorage
  let users = [];
  try {
    users = JSON.parse(localStorage.getItem("users") || "[]");
  } catch {}
  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
};

// Mock toast function with visual feedback
const toast = {
  success: (title, options) => {
    console.log('✅', title, options?.description);
    // Create a temporary toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg';
    toastEl.innerHTML = `
      <div class="font-medium">${title}</div>
      ${options?.description ? `<div class="text-sm">${options.description}</div>` : ''}
    `;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 4000);
  },
  error: (title, options) => {
    console.log('❌', title, options?.description);
    // Create a temporary toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg';
    toastEl.innerHTML = `
      <div class="font-medium">${title}</div>
      ${options?.description ? `<div class="text-sm">${options.description}</div>` : ''}
    `;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.remove();
    }, 4000);
  }
};

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  useEffect(() => {
    if (password) {
      const analysis = analyzePassword(password);
      setPasswordStrength(analysis.score);
      setPasswordFeedback(analysis.feedback);
    } else {
      setPasswordStrength(0);
      setPasswordFeedback([]);
    }
  }, [password]);

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (username.length < 4) {
      errors.username = 'Username must be at least 4 characters';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (passwordStrength < 2) {
      errors.password = 'Please choose a stronger password';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!captchaVerified) {
      errors.captcha = 'Please complete the human verification';
      toast.error("Verification Required", {
        description: "Please complete the human verification puzzle before submitting.",
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userExists = checkUserExists(username);
      if (userExists) {
        setFormErrors((prev) => ({
          ...prev,
          username: 'Username already taken',
        }));
        toast.error('Registration failed', {
          description: 'This username is already taken. Please choose another.',
        });
        setIsSubmitting(false);
        return;
      }

      await saveUser(username, password, email);

      toast.success('Account created successfully', {
        description: 'You can now log in with your credentials.',
      });

      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setCaptchaVerified(false);
      setFormKey(Date.now());
    } catch (error) {
      toast.error('Registration failed', {
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaVerified = (success) => {
    setCaptchaVerified(success);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-slate-900/95 backdrop-blur-sm border border-slate-600/30 rounded-xl shadow-2xl">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-3">
          <Shield className="h-10 w-10 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Create Secure Account</h1>
        <p className="text-sm text-slate-400 mt-1">
          Complete the secure registration process below
        </p>
      </div>

      <div key={formKey} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Email</label>
          <div className="relative">
            <User className="absolute inset-y-0 left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 w-full h-10 bg-slate-800/60 border ${
                formErrors.username ? 'border-rose-400' : 'border-slate-600'
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-100 placeholder-slate-400`}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <label className="block text-sm font-medium mb-1 mt-3 text-slate-300">Username</label>
          <div className="relative">
            <User className="absolute inset-y-0 left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`pl-10 w-full h-10 bg-slate-800/60 border ${
                formErrors.username ? 'border-rose-400' : 'border-slate-600'
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-100 placeholder-slate-400`}
              placeholder="Choose a username"
              autoComplete="username"
            />
          </div>
          {formErrors.username && (
            <p className="text-sm text-rose-400 mt-1">{formErrors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Password</label>
          <div className="relative">
            <Lock className="absolute inset-y-0 left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`pl-10 pr-10 w-full h-10 bg-slate-800/60 border ${
                formErrors.password ? 'border-rose-400' : 'border-slate-600'
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-100 placeholder-slate-400`}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-2.5 hover:text-slate-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-slate-400" />
              ) : (
                <Eye className="h-4 w-4 text-slate-400" />
              )}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-sm text-rose-400 mt-1">{formErrors.password}</p>
          )}
        </div>

        {password && (
         
          <PasswordStrengthMeter
            strength={passwordStrength}
            feedback={passwordFeedback}
          />


        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute inset-y-0 left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pl-10 w-full h-10 bg-slate-800/60 border ${
                formErrors.confirmPassword ? 'border-rose-400' : 'border-slate-600'
              } rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-colors text-slate-100 placeholder-slate-400`}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>
          {formErrors.confirmPassword && (
            <p className="text-sm text-rose-400 mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>
        
        <div>
          <CreativeCaptcha onVerify={handleCaptchaVerified} />
          {formErrors.captcha && (
            <p className="text-sm text-rose-400 mt-1">{formErrors.captcha}</p>
          )}
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !captchaVerified}
          className={`w-full h-10 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-md hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 ${
            isSubmitting || !captchaVerified ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
      
      <div className="mt-4 text-xs text-slate-400 text-center">
        By creating an account, you agree to our{' '}
        <a href="#" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
          Privacy Policy
        </a>.
      </div>
    </div>
  );
}