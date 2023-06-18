import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
}

const NotificationContainer: React.FC<Props> = ({
  children,
  className = "",
}) => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center z-40 bg-transparent-400 px-2">
      <div
        className={`max-w-[600px] w-full overflow-x-hidden flex flex-col items-center justify-start py-6 bg-primary-100 rounded-lg px-2 border ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default NotificationContainer;
