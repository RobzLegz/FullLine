import React from "react";
import PageModule from "../PageModule";
import AuthForm from "../../components/auth/AuthForm";

const LoginPage = () => {
  return (
    <PageModule
      title="Ienāc savā Spotloc partnera profilā"
      description="Pievienojies Spotloc un sasniedz plašāku mērķauditoriju savam pasākumam"
    >
      <AuthForm />
    </PageModule>
  );
};

export default LoginPage;
