import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import { Inter } from "@next/font/google";
import Footer from "../components/navigation/Footer";
import { PartnerNavigation } from "../components/navigation/Navigation";
import { AppInfo, selectApp } from "../redux/slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getPartnerInfo } from "../requests/partnerRequests";
import Notification from "../components/notification/Notification";

interface PartnerPageModuleProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  keywords?: string;
}

export const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--inter-font",
});

const PartnerPageModule: NextPage<PartnerPageModuleProps> = ({
  title,
  description = "Visas izklaides - teātri, koncerti, izstādes vienā aplikācijā",
  children,
  className = "",
  keywords = "pasākumi, pasākumi rīgā, notikumi",
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
      router.push("/auth/login");
      return;
    }

    getPartnerInfo({ dispatch, router });
  }, []);

  return (
    <main className={`page ${className} ${inter.variable}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
      </Head>

      <Notification />

      {appInfo.info ? (
        <>
          <PartnerNavigation />

          <div className="w-full flex flex-col items-center justify-start max-w-[1200px] px-2 min-h-screen">
            {children}
          </div>

          <Footer />
        </>
      ) : null}
    </main>
  );
};

export default PartnerPageModule;
