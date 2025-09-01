import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IProps {
  onEmailSent: () => void
}

const ForgotPassword = ({onEmailSent}: IProps) => {
  return (
    <div className="space-y-6">
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
        <div className="text-white mt-3">
          Please enter your email associated with your account. you will receive
          a further instruction in creating a new password.
        </div>
      </div>
      <Button
      onClick={onEmailSent}
        type="submit"
        className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        Request new password
      </Button>
    </div>
  );
};

export default ForgotPassword;
