"use client";
import { GoogleIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-3">
      {/* Email field */}
      <div>
        <label
          htmlFor="email"
          className="block text-white text-sm font-medium mb-2"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          className="h-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Password field */}
      <div>
        <label
          htmlFor="password"
          className="block text-white text-sm font-medium mb-2"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className="h-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
            placeholder="••••••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <Link href="/forgot-password">
          <div className="text-white font-semibold mt-3">Forgot Password</div>
        </Link>
      </div>
      {/* Sign up button */}
      <Link href="/dashboard">
        <Button
          type="submit"
          className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
        >
          Log In
        </Button>
      </Link>

      {/* Divider */}
      <div className="text-center mt-3 text-gray-400 text-sm">Continue with</div>

      {/* Google sign up button */}
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full bg-transparent border-gray-600 text-white hover:bg-gray-800 hover:border-gray-500"
      >
        <GoogleIcon />
        Google
      </Button>

      {/* Sign in link */}
      <div className="text-center text-gray-400 text-sm">
        Don’t have an account? <br />
        <Link href="/sign-up" className="text-blue-400 hover:text-blue-300">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
