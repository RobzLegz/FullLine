import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { EventDate, EventImage } from "@prisma/client";
import { isSameDay } from "../../../src/utils/compareDate";
import stringSimilarity from "string-similarity";

export const eventCtrl = {
  delete: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;

      await prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      res.json({
        msg: "Event deleated",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;

      const event = await prisma.event.findFirst({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          cover: true,
          title: true,
          start_date: true,
          start_time: true,
          end_date: true,
          end_time: true,
          info: true,
          website_urls: true,
          ticket_url: true,
          images: true,
          location: true,
          category_ids: true,
        },
      });

      res.json({
        msg: "Event found",
        event,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  merge: async (req: Request, res: Response) => {
    try {
      const { ids }: { ids: string[] } = req.body;

      const events = await prisma.event.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        include: {
          categories: {
            select: {
              id: true,
              event_ids: true,
            },
          },
        },
      });

      if (events.length < 2) {
        return res.status(400).json({
          msg: "Less than 2 events found",
        });
      }

      const title = events.sort((a, b) => a.title.length - b.title.length)[0]
        .title;
      const info = events.sort((a, b) => b.info.length - a.info.length)[0].info;

      let price: number | null = null;
      let startTime: string | null = null;
      let endTime: string | null = null;
      let ticketUrl: string | null = null;
      let websiteUrls: string[] = [];
      let categoryIds: string[] = [];
      let savedUserIds: string[] = [];
      let partnerId: string | null = null;
      let spotId: string | null = null;
      let event_url: string | null = null;

      let cityId: string | null = null;
      let countryId: string | null = null;
      let city: string | null = null;
      let country: string | null = null;
      let venue: string | null = null;
      let address: string | null = null;
      let lat: number | null = null;
      let lng: number | null = null;

      let view_count: number = 0;
      let priority: number = 0;
      let images: EventImage[] = [];
      let cover: EventImage | null = null;
      let verified: boolean = false;

      let allDates: EventDate[] = [];

      for (const event of events) {
        view_count += event.view_count;

        if (event.event_url && !event_url) {
          event_url = event.event_url;
        }

        if (event.cover && !cover) {
          cover = event.cover;
        }

        if (event.spotId && !spotId) {
          spotId = event.spotId;
        }

        if (event.cityId && !cityId) {
          cityId = event.cityId;
        }

        if (event.countryId && !countryId) {
          countryId = event.countryId;
        }

        if (event.verified && !verified) {
          verified = event.verified;
        }

        if (event.partnerId && !partnerId) {
          partnerId = event.partnerId;
        }

        categoryIds = Array.from(
          new Set([...event.category_ids, ...categoryIds])
        );

        savedUserIds = Array.from(
          new Set([...event.saved_users_ids, ...savedUserIds])
        );

        if (event.start_date) {
          allDates = [
            ...allDates,
            { date: event.start_date, time: event.start_time },
          ];
        }

        if (event.end_date) {
          allDates = [
            ...allDates,
            { date: event.end_date, time: event.end_time },
          ];
        }

        if (event.all_dates) {
          for (const d of event.all_dates) {
            if (
              !allDates.some((ad) => new Date(ad.date) === new Date(d.date))
            ) {
              allDates = [...allDates, d];
            }
          }
        }

        if (event.price && !price) {
          price = event.price;
        }

        if (event.start_time && !startTime) {
          startTime = event.start_time;
        }

        if (event.end_time && !endTime) {
          endTime = event.end_time;
        }

        if (event.ticket_url && !ticketUrl) {
          ticketUrl = event.ticket_url;
        }

        websiteUrls = Array.from(
          new Set([...websiteUrls, ...event.website_urls])
        );

        priority = Math.max(event.priority, priority);

        const loc = event.location;

        const {
          city: c,
          country: co,
          location: l,
          address: a,
          lat: la,
          lng: lo,
        } = loc;

        if (!city && c) {
          city = c;
        }

        if (!country && co) {
          country = co;
        }

        if (!venue && l) {
          venue = l;
        }

        if (!address && a) {
          address = a;
        }

        if (!lat && la) {
          lat = la;
        }

        if (!lng && lo) {
          lng = lo;
        }

        event.images.forEach((image) => {
          if (!images.some((im) => im.src === image.src)) {
            images = [...images, image];
          }
        });
      }

      let location: any = {
        city,
        country,
        location: venue,
        address,
        lat,
        lng,
      };

      let geo: any = null;

      if (lat && lng) {
        geo = {
          type: "Point",
          coordinates: [lng, lat],
        };
      }

      if (geo) {
        location["geo"] = geo;
      }

      let uniqueDates: EventDate[] = [];

      for (const date of allDates) {
        if (uniqueDates.some((d) => d.date.getDay() === date.date.getDay())) {
          continue;
        }
        uniqueDates = [...uniqueDates, date];
      }

      allDates = uniqueDates.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? -1 : 1
      );

      const startDate = allDates[0].date;
      let endDate = allDates[0].date;

      if (allDates.length > 0) {
        endDate = new Date(allDates[allDates.length - 1].date);
      }

      const newEvent = await prisma.event.create({
        data: {
          title,
          verified,
          info,
          start_date: startDate,
          end_date: endDate,
          price,
          spotId,
          partnerId,
          priority,
          start_time: startTime,
          end_time: endTime,
          ticket_url: ticketUrl,
          website_urls: websiteUrls,
          location,
          countryId,
          event_url,
          view_count,
          images,
          cover,
          category_ids: categoryIds,
          saved_users_ids: savedUserIds,
          cityId: cityId,
          all_dates: allDates,
        },
        include: {
          categories: true,
        },
      });

      res.json({
        msg: "Events merged",
        event: newEvent,
        deleted: ids,
      });

      await prisma.websiteVisit.updateMany({
        where: {
          eventId: {
            in: ids,
          },
        },
        data: {
          eventId: newEvent.id,
        },
      });

      await prisma.view.updateMany({
        where: {
          eventId: {
            in: ids,
          },
        },
        data: {
          eventId: newEvent.id,
        },
      });

      for (const cat of newEvent.categories) {
        const newEventIds = cat.event_ids.filter(
          (eId) => !ids.some((id) => id === eId)
        );

        await prisma.category.update({
          where: {
            id: cat.id,
          },
          data: {
            event_ids: newEventIds,
          },
        });
      }

      await prisma.event.deleteMany({
        where: { id: { in: ids } },
      });

      const users = await prisma.user.findMany({
        where: { id: { in: savedUserIds } },
      });

      for (const user of users) {
        let newSavedEventIds = user.saved_event_ids.filter(
          (id) => !ids.some((dId) => dId === id)
        );

        newSavedEventIds = [...newSavedEventIds, newEvent.id];

        await prisma.user.update({
          where: { id: user.id },
          data: { saved_event_ids: newSavedEventIds },
        });
      }
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  get: async (req: Request, res: Response) => {
    const { city = "none", received = "", no_cats = "" } = req.query;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setUTCHours(24, 59, 59, 99);

    const receivedIds =
      String(received).length >= 12 ? String(received).split(";") : [];

    if (city === "none") {
      const events = await prisma.event.findMany({
        where: {
          id: {
            notIn: receivedIds,
          },
          OR: [
            {
              start_date: {
                gte: yesterday,
              },
            },
            {
              end_date: {
                gte: yesterday,
              },
            },
          ],
          categories:
            no_cats === "true"
              ? {
                  none: {},
                }
              : undefined,
        },
        take: 50,
        orderBy: {
          start_date: "asc",
        },
        select: {
          id: true,
          title: true,
          info: true,
          cover: true,
          start_date: true,
          end_date: true,
          spot: true,
          spotId: true,
          location: true,
          cityId: true,
          categories: true,
          category_ids: true,
        },
      });

      return res.json({ events });
    }

    const events = await prisma.event.findMany({
      where: {
        id: {
          notIn: receivedIds,
        },
        cityId: city ? String(city) : "63f0dd5f10aa3c717cb9a21b",
        OR: [
          {
            start_date: {
              gte: yesterday,
            },
          },
          {
            end_date: {
              gte: yesterday,
            },
          },
        ],
        categories:
          no_cats === "true"
            ? {
                none: {},
              }
            : undefined,
      },
      take: 50,
      orderBy: {
        start_date: "asc",
      },
      select: {
        id: true,
        title: true,
        info: true,
        cover: true,
        start_date: true,
        end_date: true,
        spot: true,
        spotId: true,
        location: true,
        cityId: true,
        categories: true,
        category_ids: true,
      },
    });

    res.json({ events });
  },
  getSimilar: async (req: Request, res: Response) => {
    const { similarity: sim = "0.8" } = req.query;

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setUTCHours(24, 59, 59, 99);

    const events = await prisma.event.findMany({
      where: {
        OR: [
          {
            start_date: {
              gte: yesterday,
            },
          },
          {
            end_date: {
              gte: yesterday,
            },
          },
        ],
      },
      orderBy: {
        start_date: "asc",
      },
      select: {
        id: true,
        title: true,
        cover: {
          select: {
            src: true,
          },
        },
        start_date: true,
        end_date: true,
        location: {
          select: {
            city: true,
            address: true,
            location: true,
          },
        },
        cityId: true,
      },
    });

    let similarEvents: any[] = [];

    for (const event of events) {
      for (const comp of events) {
        if (event.id === comp.id) {
          continue;
        }

        if (event.cityId !== comp.cityId) {
          continue;
        }

        if (!isSameDay(event.start_date, comp.start_date)) {
          continue;
        }

        if (similarEvents.some((e) => e.id === comp.id)) {
          continue;
        }

        const similarity = stringSimilarity.compareTwoStrings(
          event.title,
          comp.title
        );

        if (similarity >= Number(sim)) {
          similarEvents.push(comp);

          if (!similarEvents.some((e) => e.id === event.id)) {
            similarEvents.push(event);
          }
        }
      }
    }

    res.json({ events: similarEvents });
  },
  updateMany: async (req: Request, res: Response) => {
    try {
      const { updatedEvents }: { updatedEvents: any[] } = req.body;

      for (const event of updatedEvents) {
        await prisma.event.update({
          where: { id: event.id },
          data: {
            category_ids: event.category_ids,
            cityId: event.cityId,
            spotId: event.spotId,
          },
        });
      }

      res.json({ msg: "updated" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getEventsByCity: async (req: Request, res: Response) => {
    try {
      const { city_id } = req.params;

      const events = await prisma.event.findMany({
        where: {
          cityId: city_id,
        },
        orderBy: {
          start_date: "asc",
        },
      });

      return res.json({ events });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getEventsByOrganizer: async (req: Request, res: Response) => {
    try {
      const { organizer_id } = req.params;

      const events = await prisma.event.findMany({
        where: {
          partnerId: organizer_id,
        },
        orderBy: {
          start_date: "asc",
        },
      });

      return res.json({ events });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
