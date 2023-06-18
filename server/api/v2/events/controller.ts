import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const eventCtrl = {
  getMapEvents: async (req: Request, res: Response) => {
    const { country = "64450f18e843597154f1d832" } = req.query;

    const today = new Date();
    const weekLen = new Date(today);
    weekLen.setDate(today.getDate() + 7);

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
          lte: weekLen,
        },
        city: {
          verified: true,
          countryId:
            typeof country === "string" ? country : "64450f18e843597154f1d832",
        },
        verified: true,
      },
      select: {
        cover: {
          select: {
            src: true,
          },
        },
        id: true,
        priority: true,
        location: {
          select: {
            lat: true,
            lng: true,
          },
        },
      },
      take: 500,
    });

    let returnEvents: any[] = [];

    for (const event of events) {
      if (
        returnEvents.filter(
          (e) =>
            e.location.lat === event.location.lat &&
            e.location.lng === event.location.lng
        ).length < 15
      ) {
        returnEvents = [...returnEvents, event];
      }
    }

    res.json({
      msg: "Received map events",
      events: returnEvents,
    });
  },
  searchMapEvents: async (req: Request, res: Response) => {
    const {
      city,
      categoryIds,
      start_date,
      end_date,
    }: {
      city?: string;
      categoryIds?: string[];
      start_date?: string;
      end_date?: string;
    } = req.body;

    if (!req.user_id) {
      return res.status(400).json({ err: "Unauthorized" });
    }

    const today = new Date();
    const weekLen = new Date(today);
    weekLen.setDate(today.getDate() + 7);

    let where: any = {
      location: {
        isNot: {
          lat: null,
          lng: null,
        },
      },
      end_date: {
        gte: today,
        lte: weekLen,
      },
      verified: true,
    };

    if (city) {
      where["cityId"] = city;
    }

    if (categoryIds && categoryIds.length > 0) {
      where["category_ids"] = {
        hasSome: categoryIds,
      };
    }

    if (start_date) {
      if (end_date) {
        where["end_date"] = {
          gte: start_date,
          lte: end_date,
        };
      } else {
        const dateRange = new Date(start_date);
        dateRange.setDate(dateRange.getDate() + 1);

        where["end_date"] = {
          gte: start_date,
          lte: dateRange,
        };
      }
    }

    const events = await prisma.event.findMany({
      where: where,
      select: {
        cover: {
          select: {
            src: true,
          },
        },
        id: true,
        priority: true,
        location: {
          select: {
            lat: true,
            lng: true,
          },
        },
      },
      take: 500,
      orderBy: {
        priority: "desc",
      },
    });

    let returnEvents: any[] = [];

    for (const event of events) {
      if (
        returnEvents.filter(
          (e) =>
            e.location.lat === event.location.lat &&
            e.location.lng === event.location.lng
        ).length < 15
      ) {
        returnEvents = [...returnEvents, event];
      }
    }

    if (start_date) {
      res.json({
        msg: "Received map events",
        events: returnEvents,
        spots: null,
      });

      await prisma.search.create({
        data: {
          query: null,
          city: city,
          start_date: start_date,
          end_date: end_date,
          category_ids: categoryIds,
          user_id: req.user_id,
        },
      });

      return;
    }

    delete where["end_date"];

    const spots = await prisma.spot.findMany({
      where: where,
      select: {
        cover: {
          select: {
            src: true,
          },
        },
        id: true,
        priority: true,
        location: {
          select: {
            lat: true,
            lng: true,
          },
        },
      },
      take: 500,
      orderBy: {
        priority: "desc",
      },
    });

    res.json({
      msg: "Received map events",
      events: returnEvents,
      spots,
    });

    await prisma.search.create({
      data: {
        query: null,
        city: city,
        start_date: start_date,
        end_date: end_date,
        category_ids: categoryIds,
        user_id: req.user_id,
      },
    });
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const { categories: includeCategories } = req.query;

      if (!req.user_id && !req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      if (includeCategories && req.partner_id) {
        const event = await prisma.event.findFirst({
          where: {
            id: eventId,
            partnerId: req.partner_id,
          },
          include: {
            categories: true,
          },
        });

        return res.json({
          msg: "Partner event found",
          event,
        });
      }

      let event = await prisma.event.findFirst({
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
          categories: includeCategories ? true : false,
          event_url: true,
        },
      });

      if (!event) {
        return res.status(404).json({ err: "Event not found" });
      }

      event = {
        ...event,
        event_url: event.event_url
          ? `https://spotloc.lv/pasakums/${event.event_url}`
          : null,
      };

      res.json({
        msg: "Event found",
        event,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  save: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(400).json({ err: "No user in request" });
      }

      const user = await prisma.user.findFirst({
        where: {
          id: req.user_id,
        },
        select: {
          saved_event_ids: true,
        },
      });

      if (!user) {
        return res.status(400).json({ err: "User not found in database" });
      }

      const { id: eventId } = req.params;

      const event = await prisma.event.findFirst({
        where: {
          id: eventId,
        },
        select: {
          saved_users_ids: true,
        },
      });

      if (!event) {
        return res.status(400).json({ err: "Event not found in database" });
      }

      const newSavedEventIds = Array.from(
        new Set([...user.saved_event_ids, eventId])
      );

      await prisma.user.update({
        where: {
          id: req.user_id,
        },
        data: {
          saved_event_ids: newSavedEventIds,
        },
      });

      const newSavedUserIds = Array.from(
        new Set([...event.saved_users_ids, req.user_id])
      );

      const savedEvent = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          saved_users_ids: newSavedUserIds,
        },
      });

      res.json({
        msg: "Event added to saved events",
        newSavedIds: newSavedEventIds,
        event: savedEvent,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  unsave: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(400).json({ err: "No user in request" });
      }

      const user = await prisma.user.findFirst({
        where: {
          id: req.user_id,
        },
        select: {
          saved_event_ids: true,
        },
      });

      if (!user) {
        return res.status(400).json({ err: "User not found in database" });
      }

      const { id: eventId } = req.params;

      const event = await prisma.event.findFirst({
        where: {
          id: eventId,
        },
        select: {
          saved_users_ids: true,
        },
      });

      if (!event) {
        return res.status(400).json({ err: "Event not found in database" });
      }

      const newSavedEventIds = Array.from(
        new Set(user.saved_event_ids.filter((id) => id !== eventId))
      );

      await prisma.user.update({
        where: {
          id: req.user_id,
        },
        data: {
          saved_event_ids: newSavedEventIds,
        },
      });

      const newSavedUsersIds = Array.from(
        new Set(event.saved_users_ids.filter((id) => id !== req.user_id))
      );

      await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          saved_users_ids: newSavedUsersIds,
        },
      });

      console.log("unsaved");

      res.json({
        msg: "Event removed from saved events",
        newSavedIds: newSavedEventIds,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
