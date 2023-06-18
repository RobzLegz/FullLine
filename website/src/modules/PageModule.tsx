import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { Inter } from "@next/font/google";
import { HomeNavigation } from "../components/navigation/Navigation";
import Footer from "../components/navigation/Footer";
import Notification from "../components/notification/Notification";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
import { getPartnerInfo } from "../requests/partnerRequests";
import { NextFontWithVariable } from "@next/font/dist/types";

interface PageModuleProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  navBg?: string;
  customNav?: React.ReactNode;
  noMaxWidth?: boolean;
  customFont?: NextFontWithVariable;
}

export const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--inter-font",
});

const PageModule: NextPage<PageModuleProps> = ({
  title,
  description = "Visas izklaides - teātri, koncerti, izstādes vienā aplikācijā",
  children,
  className = "",
  ogImage = "/spotloc-logo-square.png",
  ogImageAlt = "Spotloc events app logo",
  keywords = "pasākums, koncerts, pasākumi Latvijā, izklaides",
  noMaxWidth = false,
  navBg,
  customNav,
  customFont,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const appInfo: AppInfo = useSelector(selectApp);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current || appInfo.info) {
      return;
    }

    fetchedRef.current = true;

    const prevLogin = localStorage.getItem("prevLogin");
    if (!prevLogin) {
      return;
    }

    getPartnerInfo({ dispatch, router });
  }, []);

  return (
    <main className={`page ${inter.variable} ${customFont ? customFont.variable : ""}`}>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@spotlocapp" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta property="og:type" content="website" />
        <meta property="twitter:site" content="@spotlocapp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="og:image" content={ogImage} />
        <meta property="og:site_name" content="Spotloc"></meta>
        <meta name="twitter:domain" content="spotloc.lv"></meta>
        <meta property="og:image:alt" content={ogImageAlt}></meta>
        <meta property="twitter:image:alt" content={ogImageAlt}></meta>
      </Head>

      {customNav ? customNav : <HomeNavigation bg={navBg} />}

      <Notification />

      <div
        className={`w-full flex flex-col items-center justify-start min-h-screen ${
          !noMaxWidth ? "px-2" : ""
        } ${className}`}
      >
        <div
          className={`flex flex-col items-center justify-start ${
            !noMaxWidth ? "max-w-[1200px]" : ""
          }`}
        >
          {children}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PageModule;
