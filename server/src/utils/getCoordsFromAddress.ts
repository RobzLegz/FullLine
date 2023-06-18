import axios from "axios";

const GEOCODING_API_KEY = process.env.GEOLOCATION_API_KEY;

export const getCoordsFromAddress = async (address: string) => {
  let coords: {
    lat: null | number;
    lng: null | number;
  } | null = {
    lat: null,
    lng: null,
  };

  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${GEOCODING_API_KEY}`
    )
    .then((res) => {
      const { results } = res.data;

      if (results && results.length > 0) {
        const {
          geometry: {
            location: { lat, lng },
          },
        } = results[0];

        if (lat && lng) {
          coords = {
            lat,
            lng,
          };
        }
      }
    })
    .catch((err) => {
      console.log(err);
      coords = null;
    });

  return coords;
};
