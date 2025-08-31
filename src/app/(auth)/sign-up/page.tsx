import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import SignUp from "@/components/_core/auth/sign-up";
import React from "react";

const Page = () => {
  return (
    <AuthWrapper title="SIGN UP">
      <SignUp />
    </AuthWrapper>
  );
};

export default Page;
