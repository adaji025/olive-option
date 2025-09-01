"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  return (
    <div className="space-y-4 text-white">
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

      <Button
        type="submit"
        className="mt-5 h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        Request password
      </Button>

      <Link
        href="/sign-in"
        className="flex items-center justify-center gap-3 mt-4"
      >
        <ArrowLeft />
        Back to login
      </Link>
    </div>
  );
};

export default ResetPassword;
