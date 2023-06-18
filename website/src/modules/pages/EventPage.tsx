import React from "react";
import PageModule from "../PageModule";
import { EVENT_TITLE_ROUTE } from "../../requests/routes";
import { PageComponent } from "../../types/pageComponent";
import { ExEvent } from "../../interfaces/backendTypes";
import EventPageContainer from "../../components/event/EventPageContainer";

interface EventPageProps {
  event?: ExEvent;
}

const EventPage: PageComponent<EventPageProps> = ({ event }) => {
  return (
    <PageModule
      title={
        event && event.title
          ? `${event.title} - Spotloc`
          : "Visi pasākumi vienuviet - Spotloc"
      }
      description={
        event && event.info && event.info.length > 0
          ? `${
              event.info[0].length > 100
                ? event.info[0].substring(0, 100)
                : event.info[0]
            }... Ienāc, lai lasītu vairāk!`
          : "Vairāk nekā 7000 izklaides visās Latvijas pilsētās, visām gaumēm un interesēm"
      }
      ogImage={event?.cover?.src}
      ogImageAlt={event?.cover?.alt ? event?.cover?.alt : event?.title}
      navBg="#fff"
    >
      {event && <EventPageContainer {...event} />}
    </PageModule>
  );
};

EventPage.getInitialProps = async ({ req }) => {
  try {
    if (!req || !req.url) {
      return {
        event: undefined,
      };
    }

    const titleLink = req.url.split("/").pop();

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const route = `${EVENT_TITLE_ROUTE}/${titleLink}`;

    const res = await fetch(route, requestOptions);
    const resJseon = await res.json();

    const { event }: { event: ExEvent } = resJseon;

    return {
      event: event,
    };
  } catch (err) {
    return {
      event: undefined,
    };
  }
};

export default EventPage;
