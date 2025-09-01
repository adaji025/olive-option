import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const EmailSent = () => {
  return (
    <div className="min-h-[200px] text-white flex flex-col gap-3 items-center justify-center text-center">
      <div className="text-xl font-medium">Email Sent</div>
      <div className="mt-1">
        We have sent a code to your email lexiegarouf@gmail.com. If this email
        is connected to your account, you’ll be able to reset your password.{" "}
      </div>
      <Link href="/verify-otp" className="w-full">
        <Button
          type="submit"
          className="h-12 mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
        >
          Enter Code
        </Button>
      </Link>
      <Link href="/sign-in" className="flex items-center gap-3 mt-4">
        <ArrowLeft />
        Back to login
      </Link>
    </div>
  );
};

export default EmailSent;
