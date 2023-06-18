import React from "react";
import PageModule from "../PageModule";
import AuthForm from "../../components/auth/AuthForm";

const RegisterPage = () => {
  return (
    <PageModule
      title="Kļūsti par Spotloc partneri"
      description="Sasniedz plašāku mērķauditoriju savam pasākumam. Pievienojies Spotloc partneriem."
    >
      <AuthForm register />
    </PageModule>
  );
};

export default RegisterPage;
