import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { City } from "@prisma/client";

export interface MapEvent {
  id: string;
  location: {
    lat: number | null;
    lng: number | null;
    city: string | null;
  };
  cover: {
    src: string;
  } | null;
  categories: {
    color: string;
  }[];
}

export const eventCtrl = {
  get: async (req: Request, res: Response) => {
    try {
      const { city = "Rīga" } = req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const sevenDay = new Date(yesterday);
      sevenDay.setDate(yesterday.getDate() + 7);
      sevenDay.setUTCHours(23, 59, 59, 99);

      let returnCity: City | null = {
        id: "63f0dd5f10aa3c717cb9a21b",
        name: "Rīga",
        lat: 56.9663848,
        lng: 24.1334868,
        verified: true,
        countryId: null,
        priority: 1,
      };

      if (city !== "Rīga" && typeof city === "string") {
        returnCity = await prisma.city.findFirst({ where: { id: city } });
      }

      let events: any[] = [];

      if (city === "Rīga") {
        events = await prisma.event.findMany({
          where: {
            OR: [
              { cityId: "63f0dd5f10aa3c717cb9a21b" },
              {
                location: {
                  is: {
                    city: city,
                  },
                },
              },
            ],
            start_date: {
              gte: yesterday,
              lte: sevenDay,
            },
          },
          select: {
            id: true,
            title: true,
            start_date: true,
            category_ids: true,
            end_date: true,
            end_time: true,
            location: {
              select: {
                location: true,
                city: true,
                country: true,
                address: true,
              },
            },
            cityId: true,
            cover: true,
            categories: {
              select: {
                name: true,
              },
              take: 2,
            },
          },
          orderBy: {
            start_date: "asc",
          },
          take: 20,
        });
      } else if (returnCity) {
        events = await prisma.event.findMany({
          where: {
            OR: [
              { cityId: returnCity.id },
              {
                location: {
                  is: {
                    city: returnCity.name,
                  },
                },
              },
            ],
            start_date: {
              gte: today,
              lte: sevenDay,
            },
          },
          select: {
            id: true,
            title: true,
            start_date: true,
            category_ids: true,
            end_date: true,
            end_time: true,
            location: {
              select: {
                location: true,
                city: true,
                country: true,
                address: true,
              },
            },
            cityId: true,
            cover: true,
            categories: {
              select: {
                name: true,
              },
              take: 2,
            },
          },
          orderBy: {
            start_date: "asc",
          },
          take: 20,
        });
      }

      res.json({
        msg: "Event info received",
        events: events,
        city: returnCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  search: async (req: Request, res: Response) => {
    try {
      const {
        city = "63d93a8938759168016478f1",
        categoryIds = [],
        when,
        received = [],
        limiter = 15,
      }: {
        city?: string;
        categoryIds?: string[];
        when?: string;
        received?: string[];
        limiter?: number;
      } = req.body;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      let lastDay = today;

      if (when) {
        switch (when.toLowerCase()) {
          case "šonedēļ":
            const sevenDay = new Date(yesterday);
            sevenDay.setDate(yesterday.getDate() + 8);
            lastDay = sevenDay;

            break;
          case "šomēnes":
            const nextMonth = new Date(yesterday);
            nextMonth.setMonth(yesterday.getMonth() + 1);
            lastDay = nextMonth;

            break;
          default:
            const todayEnd = new Date(yesterday);
            todayEnd.setDate(yesterday.getDate() + 1);
            todayEnd.setUTCHours(23, 59, 59, 999);
            lastDay = todayEnd;

            break;
        }
      } else {
        const sevenDay = new Date(yesterday);
        sevenDay.setDate(yesterday.getDate() + 8);
        lastDay = sevenDay;
      }

      let where: Record<string, any> = {
        start_date: {
          gte: yesterday,
          lte: lastDay,
        },
      };

      if (categoryIds.length > 0) {
        where["categories"] = {
          some: {
            id: {
              in: categoryIds,
            },
          },
        };
      }

      if (city) {
        where["cityId"] = city;
      }

      if (received.length > 0) {
        where["id"] = {
          notIn: received,
        };
      }

      const foundEvents = await prisma.event.findMany({
        where,
        select: {
          cover: {
            select: {
              src: true,
            },
          },
          id: true,
          categories: {
            select: {
              name: true,
            },
            take: 1,
          },
          location: {
            select: {
              city: true,
              location: true,
              address: true,
            },
          },
          cityId: true,
          title: true,
          start_date: true,
          end_date: true,
          start_time: true,
          category_ids: true,
        },
        orderBy: {
          start_date: "asc",
        },
        take: limiter,
      });

      const paginationOver = foundEvents.length < limiter;

      res.json({
        msg: `Found ${foundEvents.length} events`,
        events: {
          sorted: foundEvents,
          unsorted: [],
        },
        lastDay,
        paginationOver,
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

      if (event) {
        await prisma.view.create({
          data: {
            userId: "63ff8f157d98f955b6996db7",
            eventId: event.id,
          },
        });
      }

      res.json({
        msg: "Event found",
        event,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getMapEvents: async (_req: Request, res: Response) => {
    const today = new Date();
    const monthLen = new Date(today);
    monthLen.setDate(today.getDate() + 30);

    const events = await prisma.event.findMany({
      where: {
        location: {
          isNot: {
            lat: null,
            lng: null,
          },
        },
        start_date: {
          gte: today,
          lte: monthLen,
        },
        city: {
          verified: true,
        },
      },
      select: {
        cover: {
          select: {
            src: true,
          },
        },
        id: true,
        location: {
          select: {
            city: true,
            lat: true,
            lng: true,
          },
        },
        categories: {
          select: {
            color: true,
          },
          take: 1,
        },
      },
      take: 250,
    });

    res.json({
      msg: "Received map events",
      events: events.filter((event) => event.cover !== null),
    });
  },
};
