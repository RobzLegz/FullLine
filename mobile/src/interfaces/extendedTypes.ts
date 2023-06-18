import { ExEvent, ExSpot } from "./backendTypes";

export interface NearbySpot extends ExSpot {
  distance?: number;
}

export interface NearbyEvent extends ExEvent {
  distance?: number;
}
