import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../../redux/slices/appSlice";
import { logout } from "../../requests/partnerRequests";
import { useRouter } from "next/router";

interface NavigationProps {
  className?: string;
  bg?: string;
  children?: React.ReactNode;
  logoSrc?: string;
  between?: boolean;
  burgerClassName?: string;
}

export const HomeNavigation: React.FC<NavigationProps> = ({ ...props }) => {
  const appInfo: AppInfo = useSelector(selectApp);

  return (
    <Navigation {...props}>
      <li className="text-base">
        <Link href="/">Sākums</Link>
      </li>
      <li className="text-base">
        <Link href="/organizatoriem">Organizatoriem</Link>
      </li>
      {/* <li className="text-base">
        <Link href="/partneriem">Partneriem</Link>
      </li> */}
      {appInfo.info ? (
        <li className="text-base">
          <Link href="/profils">Profils</Link>
        </li>
      ) : (
        <li className="text-base">
          <Link
            href="/auth/login"
            className="form_button bg-accent w-auto h-auto py-0.5 px-2 rounded-md m-0"
          >
            Ienākt
          </Link>
        </li>
      )}
    </Navigation>
  );
};

export const PartnerNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Navigation className="mb-4" bg="#F1F1F1" between>
      <li>
        <Link href="/">Sākums</Link>
      </li>
      <li>
        <Link href="/profils">Profils</Link>
      </li>
      <button
        className="form_button bg-accent w-auto h-auto py-0.5 px-4 rounded-md m-0"
        onClick={() => logout({ dispatch, router })}
      >
        Iziet
      </button>
    </Navigation>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  className,
  children,
  bg,
  between = false,
  logoSrc = "/logo.svg",
  burgerClassName = "bg-primary-800",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`flex justify-center items-center w-full z-30 text-primary-100 sm:text-primary-800 ${
        className ? className : ""
      }`}
      style={{ backgroundColor: bg ? bg : "transparent" }}
    >
      <div className="w-full max-w-[1200px] flex items-center justify-between p-2 relative">
        <Link href="/" title="Sākums">
          <Image
            src={logoSrc}
            alt="Spotloc logo"
            width={120}
            height={50}
            className="object-cover w-28"
            draggable={false}
          />
        </Link>

        <ul className="hidden sm:flex items-center justify-center gap-4 text-lg">
          {children}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="w-6 h-8 block sm:hidden"
        >
          <div className="flex sm:hidden flex-col w-6 gap-[2px] relative z-30">
            <div
              className={`w-full h-[2px] transition-all duration-200 transform absolute ${
                open ? "rotate-45 bg-primary-100" : burgerClassName
              } ${burgerClassName}`}
            />
            <div
              className={`w-full h-[2px] transition-all duration-200 transform absolute  ${
                open
                  ? "-rotate-45 top-0 bg-primary-100"
                  : `${burgerClassName} top-2`
              }`}
            />
          </div>
        </button>

        {!between && <div className="hidden sm:block w-28" />}

        <div
          className={`absolute top-0 left-0 w-full flex sm:hidden backdrop-blur-lg bg-transparent-200 z-20 transition-transform duration-300 ${
            open ? "" : "-translate-y-full"
          }`}
        >
          <ul className="flex flex-col items-start justify-start gap-2 p-4 pb-8 pt-14 text-2xl font-bold">
            {children}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
