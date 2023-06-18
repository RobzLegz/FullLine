import React from "react";
import LandingContainer from "../../components/home/LandingContainer";
import PageModule from "../PageModule";
import FeatureList from "../../components/home/FeatureList";
import TrailerContainer from "../../components/home/TrailerContainer";
import FeatureDescription from "../../components/home/FeatureDescription";

const HomePage = () => {
  return (
    <PageModule
      title="Visi pasākumi vienuviet - Spotloc"
      description="Vairāk nekā 7000 izklaides visās Latvijas pilsētās, visām gaumēm un interesēm"
    >
      <LandingContainer />

      <FeatureList />

      <FeatureDescription />

      <TrailerContainer />
    </PageModule>
  );
};

export default HomePage;
