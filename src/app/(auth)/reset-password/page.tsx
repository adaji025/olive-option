import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import ResetPassword from "@/components/_core/auth/reset-password";
import React from "react";

const Page = () => {
  return (
    <AuthWrapper title="SET NEW PASSWORD">
      <ResetPassword />
    </AuthWrapper>
  );
};

export default Page;
