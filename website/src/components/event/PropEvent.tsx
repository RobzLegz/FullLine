import { ArrowLeftIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Head from "next/head";
import { Inter } from "@next/font/google";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useKeyPress } from "../../hooks/useKeyPress";
import axios from "axios";

interface Props {
  title: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  info: string[];
  location: string;
  light?: boolean;
}

interface WebcamProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const WebcamComponent: React.FC<WebcamProps> = ({ setImages, images }) => {
  const webcamRef = useRef<Webcam | null>(null);

  const enterPressed = useKeyPress("Enter");

  useEffect(() => {
    if (enterPressed && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        const imageArr: string[] = [imageSrc, ...images];

        const res = axios.post(
          "http://localhost:5000/pacans",
          { image: imageSrc },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setImages(imageArr);
      }
    }
  }, [enterPressed]);

  return (
    <div className="w-full relative">
      <Webcam
        className="w-full rounded-2xl"
        mirrored
        screenshotFormat="image/png"
        ref={webcamRef}
      />

      {/* <Image
      src="https://cdn.discordapp.com/attachments/896447163784118342/1111980459518345266/shy_guy_falls.jfif"
      alt="Test"
      width={1000}
      height={1000}
      className="w-full rounded-2xl"
    /> */}

      <Image
        src="/icons/spotloc-white.svg"
        // src="/icons/spotloc-logo-theme.svg"
        alt="Spotloc logo"
        width={100}
        height={50}
        className="absolute bottom-2 left-2 z-10"
      />
    </div>
  );
};

const PropEvent: React.FC<Props> = ({
  title,
  start_date,
  start_time,
  end_date,
  end_time,
  info,
  light,
  location,
}) => {
  const [images, setImages] = useState<string[]>(
    [].map((item) => `/jud/${item}.png`)
  );

  // const [images, setImages] = useState<string[]>([]);

  return (
    <div className="flex flex-col h-full items-center justify-start relative hidden_bar">
      <WebcamComponent setImages={setImages} images={images} />

      <strong className="text-xl mt-3 w-full">{title}</strong>

      <div className="flex w-full justify-between">
        <div className="w-full flex items-start justify-between mt-2 flex-1">
          <div className="flex flex-col">
            {start_date && end_date && end_date !== start_date ? (
              <strong className="text-accent text-xl">
                {start_date} - {end_date}
              </strong>
            ) : start_date ? (
              <strong className="text-accent text-xl">{start_date}</strong>
            ) : null}

            {end_time ? (
              <p className="text-lg">
                {start_time} - {end_time}
              </p>
            ) : start_time ? (
              <p className="text-lg">{start_time}</p>
            ) : null}

            {location ? (
              <p
                className={`mt-1 text-base ${
                  light ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {location}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end items-center">
            <BookmarkIcon className="text-accent h-8" />

            <ArrowUpOnSquareIcon className="text-accent h-10" />
          </div>
        </div>
      </div>

      <div className="w-full mt-4 flex flex-col gap-2">
        {info.map((item, i) => (
          <p className="text-gray-400" key={i}>
            {item}
          </p>
        ))}
      </div>

      {images.length > 0 && (
        <div className="flex flex-col w-full mt-4">
          <strong>Bildes</strong>

          <div className="flex hidden_bar overflow-x-auto w-full whitespace-nowrap mt-2 gap-2">
            {images.map((img, i) => (
              <Image
                src={img}
                key={i}
                alt="JUD"
                width={300}
                height={400}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const inter = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--inter-font",
});

export const PropEventPage: React.FC<Props> = ({ ...props }) => {
  const router = useRouter();

  const { light } = router.query;

  return (
    <main
      className={`w-full min-h-screen flex items-start justify-center p-2 hidden_bar ${
        light ? "text-primary-900" : "text-white"
      } ${light ? "bg-white" : "bg-primary-900"} ${inter.variable}`}
    >
      <Head>
        <title>{props.title}</title>
        <meta name="og:title" content={props.title} />
        <meta name="twitter:title" content={props.title} />
        <meta name="description" content={props.info[0]} />
        <meta name="og:description" content={props.info[0]} />
        <meta name="twitter:description" content={props.info[0]} />
        <meta name="twitter:creator" content="@spotlocapp" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Spotloc, event" />
        <meta property="og:type" content="website" />
        <meta property="twitter:site" content="@spotlocapp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/spotloc-logo-square.png" />
        <meta name="og:image" content="/spotloc-logo-square.png" />
        <meta property="og:site_name" content="Spotloc" />
        <meta name="twitter:domain" content="spotloc.lv" />
        <meta property="og:image:alt" content="Spotloc events app logo" />
        <meta property="twitter:image:alt" content="Spotloc events app logo" />
      </Head>

      <PropEvent {...props} light={light ? true : false} />
    </main>
  );
};

export const JUDPropEvent = () => (
  <PropEventPage
    title="Jauno Uzņēmēju Dienas 2023"
    start_date="30.05"
    end_date="31.05"
    start_time="08:00"
    end_time=""
    info={[
      "Jauno uzņēmēju dienas ir gada nozīmīgākais pasākums skolēnu mācību uzņēmumiem (SMU), kurā piedalās Latvijas labākie jaunie uzņēmēji ar saviem skolēnu mācību uzņēmumiem, sacenšoties par Latvijas labākā SMU titulu un tiesībām pārstāvēt Latviju Eiropas finālā. ",
      "SMU finālā piedalās 10 pamatskolu un 20 vidusskolu SMU. Kopējais dalībnieku skaits - 170. 2023. gadā fināls notiks Turcijā.",
      "Pasākums tiek organizēts sadarbībā ar Junior Achievement Latvia",
    ]}
    location="Jūrmalas kultūras centrs"
  />
);

export default PropEvent;
