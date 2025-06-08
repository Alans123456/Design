"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

export default function Captcha({ onVerify }) {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setQuestion(`What is ${a} + ${b}?`);
    setCorrectAnswer(a + b);
    setUserAnswer("");
    setError("");
    onVerify(false); // reset verified state on refresh
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);
    const input = parseInt(value, 10);
    if (input === correctAnswer) {
      setError("");
      onVerify(true);
    } else {
      setError("Incorrect answer");
      onVerify(false);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <label className="block text-sm font-medium mb-1">
        CAPTCHA{" "}
        <span className="text-muted-foreground">(to verify you're human)</span>
      </label>
      <div className="flex items-center gap-2">
        <span className="text-sm bg-muted px-3 py-2 rounded-md font-mono">
          {question}
        </span>
        <button
          type="button"
          onClick={generateCaptcha}
          title="Reload CAPTCHA"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCcw className="h-4 w-4" />
        </button>
      </div>
      <input
        type="text"
        value={userAnswer}
        onChange={handleChange}
        placeholder="Your answer"
        className="w-full h-10 px-3 border border-input rounded-md bg-background/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
