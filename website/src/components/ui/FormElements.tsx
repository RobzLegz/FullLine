import React from "react";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { useSelector } from "react-redux";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectCity: React.FC<SelectProps & { countryId: string }> = ({
  countryId,
  ...props
}) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <select {...props}>
      <option value=""></option>
      {appInfo.cities
        ?.filter((city) => city.countryId === countryId)
        .map((city, i) => (
          <option value={city.id} key={i}>
            {city.name}
          </option>
        ))}
    </select>
  );
};

export const SelectCountry: React.FC<SelectProps> = ({ ...props }) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <select {...props}>
      {appInfo.countries?.map((country, i) => (
        <option value={country.id} key={i}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export const SelectSpot: React.FC<SelectProps & { cityId: string }> = ({
  cityId,
  ...props
}) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <select {...props}>
      <option value=""></option>
      {appInfo.spots
        ?.filter((spot) => !cityId || spot.cityId === cityId)
        .map((spot, i) => (
          <option value={spot.id} key={i}>
            {spot.name}
          </option>
        ))}
    </select>
  );
};
