// app/api/send-verification/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Create transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use service instead of host for Gmail
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // your email (e.g., himalthapa346@gmail.com)
    pass: process.env.EMAIL_PASS, // your app password
  },
});

export async function POST(request) {
  try {
    const { email, username } = await request.json();

    if (!email || !username) {
      return NextResponse.json(
        { error: "Email and username are required" },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const verificationLink = `http://localhost:3000/verifyUser?token=${token}`;

    // Email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Account",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #1a1a1a; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  <!-- Header -->
  <div style="background: #20c997; padding: 32px 24px; text-align: center;">
    <div style="background: rgba(255,255,255,0.3); width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
      <svg style="width: 36px; height: 36px; color: #ffffff;" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.11 7 14 7.89 14 9C14 10.11 13.11 11 12 11C10.89 11 10 10.11 10 9C10 7.89 10.89 7 12 7M18 9C18 12.53 15.36 16.24 12 17.65C8.64 16.24 6 12.53 6 9V6.3L12 3.19L18 6.3V9Z"/>
      </svg>
    </div>
    <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: white;">Verify Your Account</h1>
    <p style="margin: 8px 0 0; opacity: 0.9; font-size: 15px; color: rgba(255,255,255,0.95);">Complete your registration to secure your account</p>
  </div>

  <!-- Body -->
  <div style="padding: 32px 24px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h2 style="color: #20c997; margin: 0 0 12px; font-size: 20px; font-weight: 600;">Hello ${username}!</h2>
      <p style="color: #4a5568; line-height: 1.5; margin: 0; font-size: 15px;">
        Welcome to our platform. Please verify your email address by clicking the button below.
      </p>
    </div>

    <!-- Verify Button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="${verificationLink}" style="display: inline-block; background: #20c997; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: background 0.2s ease;">
        Verify My Account
      </a>
    </div>

    <!-- Security Notice -->
    <div style="background: rgba(32, 201, 151, 0.08); border: 1px solid rgba(32, 201, 151, 0.2); border-radius: 8px; padding: 16px; margin: 24px 0;">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <div style="color: #20c997; margin-right: 8px; font-size: 18px;">🔒</div>
        <strong style="color: #20c997; font-size: 15px;">Security Notice</strong>
      </div>
      <p style="color: #4a5568; margin: 0; font-size: 14px; line-height: 1.5;">
        This verification link expires in 24 hours. If you didn't create this account, please ignore this email.
      </p>
    </div>

    <!-- Manual Link -->
    <div style="text-align: center; padding-top: 16px; border-top: 1px solid #e2e8f0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 8px;">
        Can't click the button? Copy this link:
      </p>
      <code style="display: inline-block; color: #20c997; font-size: 12px; word-break: break-all; background: rgba(32, 201, 151, 0.08); padding: 8px 12px; border-radius: 4px; max-width: 100%; overflow: hidden;">
        ${verificationLink}
      </code>
    </div>
  </div>

  <!-- Footer -->
  <div style="background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="color: #a0aec0; font-size: 12px; margin: 0;">
      This email was sent from a secure, encrypted connection
    </p>
  </div>
</div>

  `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Create response with token in cookie
    const response = NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 }
    );

    // Set secure cookie with token
    response.cookies.set("verification_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
