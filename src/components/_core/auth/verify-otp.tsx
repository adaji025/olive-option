import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const VerifyOtp = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-white">
      <h2 className="text-xl font-medium">Enter Code</h2>
      <InputOTP maxLength={6}>
        <InputOTPGroup className="gap-4 justify-center font-black text-xl">
          <InputOTPSlot index={0} className="!rounded-none" />
          <InputOTPSlot index={1} className="!rounded-none border" />
          <InputOTPSlot index={2} className="!rounded-none border" />
          <InputOTPSlot index={4} className="!rounded-none border" />
        </InputOTPGroup>
      </InputOTP>
      <Link href="/reset-password" className="w-full">
        <Button
          type="submit"
          className="mt-4 h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
        >
          Verify
        </Button>
      </Link>
      <div className="text-center text-gray-400 text-sm mt-3">
        Didn’t receive code?{" "}
        <span className="cursor-pointer text-blue-500">Click to resend</span>{" "}
        <br />
        <Link
          href="/sign-in"
          className="flex items-center justify-center gap-3 mt-4"
        >
          <ArrowLeft />
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default VerifyOtp;
