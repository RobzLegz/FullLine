import React from "react";

const TrailerContainer = () => {
  return (
    <section className="w-full px-2 flex flex-col items-center justify-center mb-6 md:mb-20">
      <iframe
        width="100%"
        className="h-[200px] sm:h-[350px] md:h-[500px]"
        src="https://www.youtube.com/embed/zqTsatAVr54"
        title="Spotloc trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default TrailerContainer;
