import React, { ReactNode } from "react";

export interface SwitchProps {
  checked: boolean;
  icon?: ReactNode;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  setChecked,
  icon,
}) => {
  const handleCheck = () => {
    if (setChecked) {
      setChecked(!checked);
    }
  };

  return (
    <div
      className={`w-10 h-5 relative rounded-full border px-1 transition duration-500 ease-in-out-hard border-primary-800 ${
        checked ? "bg-accent" : "bg-white"
      }`}
      onClick={handleCheck}
    >
      <div
        className={`flex items-center justify-center w-5 h-5 rounded-full transition duration-500 ease-in-out-hard absolute top-2/4 left-0 transform -translate-y-1/2 ${
          checked ? "translate-x-5 bg-white border" : "translate-x-0 bg-accent"
        }`}
      >
        {icon && icon}
      </div>
    </div>
  );
};
