import React from "react";
import Loader from "./Loader";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  icon,
  className = "",
  children,
  ...props
}) => {
  if (icon) {
    return (
      <button
        className={`p-1 flex items-center justify-center bg-accent text-white ${className}`}
        {...props}
      >
        {loading ? <Loader /> : icon}
      </button>
    );
  }

  return (
    <button
      className={`px-4 py-2 flex items-center justify-center bg-accent text-white ${className}`}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
