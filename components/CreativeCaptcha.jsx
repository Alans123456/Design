// Example inside your page or component
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function CreativeCaptcha() {
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    // Submit form along with captchaToken
    const res = await fetch("/api/verify-captcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: captchaToken }),
    });

    const data = await res.json();
    if (data.success) {
      alert("CAPTCHA passed and form submitted!");
    } else {
      alert("CAPTCHA failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Your form inputs here */}
      <ReCAPTCHA
        sitekey="YOUR_SITE_KEY"
        onChange={(token) => setCaptchaToken(token)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#20c997] text-white rounded-lg"
      >
        Submit
      </button>
    </form>
  );
}
