import React from "react";
import PageModule from "../PageModule";
import LandingContainer from "../../components/organizer/LandingContainer";
import Goal from "../../components/organizer/Goal";
import HowWeDoIt from "../../components/organizer/HowWeDoIt";
import HowItGo from "../../components/organizer/HowItGo";
import ContactForm from "../../components/organizer/ContactForm";

const OrganizerPage = () => {
  return (
    <PageModule
      title="Organizatoriem"
      description="Sasniedz plašāku mērķauditoriju savam pasākumam. Kļūsti par Spotloc organizatoru bez maksas!"
    >
      <LandingContainer />

      <Goal />

      <HowWeDoIt />

      <HowItGo />

      <ContactForm />
    </PageModule>
  );
};

export default OrganizerPage;
