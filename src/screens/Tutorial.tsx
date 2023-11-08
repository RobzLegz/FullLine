import React from "react";
import TutorialContainer from "../components/tutorial/TutorialContainer";
import ScreenModule from "../modules/ScreenModule";

const TutorialScreen = () => {
  return (
    <ScreenModule statusBgColor="#ffffff" barStyle="dark">
      <TutorialContainer />
    </ScreenModule>
  );
};

export default TutorialScreen;
