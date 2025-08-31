import AuthWrapper from "@/components/_core/auth/auth-wrapper";
import SignIn from "@/components/_core/auth/sign-in";
import React from "react";

const Page = () => {
  return (
    <AuthWrapper title="Login">
      <SignIn />
    </AuthWrapper>
  );
};

export default Page;
