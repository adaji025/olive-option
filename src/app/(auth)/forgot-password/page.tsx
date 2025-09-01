"use client";
import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import EmailSent from "@/components/_core/auth/email-sent";
import ForgotPassword from "@/components/_core/auth/forgot-password";
import React, { useState } from "react";

const Page = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  return (
    <AuthWrapper title={isEmailSent ? "Email sent" : "Forgot password"}>
      {isEmailSent ? (
        <EmailSent />
      ) : (
        <ForgotPassword onEmailSent={() => setIsEmailSent(true)} />
      )}
    </AuthWrapper>
  );
};

export default Page;
