import React from "react";
import styles from "./IPhoneFrame.module.css";

interface Props {
  children?: React.ReactNode;
}

const IPhoneFrame: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.iphoneX}>
      <span></span>

      <div className="w-full h-full rounded-[15px] bg-primary-900 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default IPhoneFrame;
