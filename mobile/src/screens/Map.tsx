import React from "react";
import EventModal from "../components/map/EventModal";
import MapComponent from "../components/map/MapComponent";
import ScreenModule from "../modules/ScreenModule";
import MapOptions from "../components/map/MapOptions";
import SearchPullupModal from "../components/search/SearchModal";

const Map = () => {
  return (
    <ScreenModule>
      <MapComponent />

      <EventModal />

      <MapOptions />

      <SearchPullupModal />
    </ScreenModule>
  );
};

export default Map;
