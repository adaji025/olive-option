import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import ForgotPassword from "@/components/_core/auth/forgot-password";
import React from "react";

const Page = () => {
  return (
    <AuthWrapper title="Forgot passwor">
      <ForgotPassword />
    </AuthWrapper>
  );
};

export default Page;
