import React, { ReactNode } from "react";
import { Switch } from "./Switch";

export interface SwitchWrapperProps {
  checked: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  action?: string;
  actionDescription?: string;
  className?: string;
  icon?: ReactNode;
}

export const SwitchWrapper: React.FC<SwitchWrapperProps> = ({
  checked,
  setChecked,
  action,
  actionDescription,
  className,
  icon,
}) => {
  const handleCheck = () => {
    if (setChecked) {
      setChecked(!checked);
    }
  };

  return (
    <div
      className={`flex items-center justify-between border p-2 w-full rounded-sm border-primary-800 cursor-pointer transition-opacity duration-300 ${
        checked ? "" : "opacity-75"
      } ${className && className}`}
      onClick={handleCheck}
    >
      <div className="flex flex-col">
        <strong className="text-primary-900">{action}</strong>

        <small className="text-primary-800">{actionDescription}</small>
      </div>

      <Switch checked={checked} setChecked={setChecked} icon={icon} />
    </div>
  );
};
