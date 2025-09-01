import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import VerifyOtp from "@/components/_core/auth/verify-otp";
import React from "react";

const Page = () => {
  return (
    <AuthWrapper title="EMAIL SENT">
      <VerifyOtp />
    </AuthWrapper>
  );
};

export default Page;
