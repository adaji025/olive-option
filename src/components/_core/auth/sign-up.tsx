"use client";
import { GoogleIcon } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-6">
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
      </div>

      {/* Confirm password field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-white text-sm font-medium mb-2"
        >
          Confirm password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="h-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-10"
            placeholder="••••••••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Terms checkbox */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          className="mt-1 border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-300 leading-relaxed"
        >
          I confirm that I am over 18 years of age and that I accept the{" "}
          <Link
            href="/terms"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Terms of service
          </Link>
        </label>
      </div>

      {/* Sign up button */}
      <Button
        type="submit"
        className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        Sign Up
      </Button>

      {/* Divider */}
      <div className="text-center text-gray-400 text-sm">Sign up with</div>

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
        Already have an account? <br />
        <Link href="/sign-in" className="text-blue-400 hover:text-blue-300">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
