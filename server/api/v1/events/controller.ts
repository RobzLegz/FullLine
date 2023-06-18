import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { getCoordsFromAddress } from "../../../src/utils/getCoordsFromAddress";

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

interface EventCreateBody {
  title: string;
  info: string[];
  start_date: Date;
  end_date?: Date;
  start_time: string;
  end_time: string;
  cover?: {
    src: string;
    alt: string;
  };
  images: {
    src: string;
    alt: string;
  }[];
  city: string;
  address: string;
  location: string;
  country: string;
  category_ids: string[];
  website_urls: string[];
  ticket_url?: string;
}

export const eventCtrl = {
  search: async (req: Request, res: Response) => {
    try {
      const {
        query,
        city,
        categoryIds,
        start_date,
        end_date,
        limiter = 20,
      }: {
        query?: string;
        city?: string;
        categoryIds?: string[];
        start_date?: string;
        end_date?: string;
        limiter?: number;
      } = req.body;

      if (!req.user_id) {
        return res.status(500).json({ err: "Unauthorized" });
      }

      let agg: any = [
        {
          $search: {
            index: "default",
            compound: {},
          },
        },
        {
          $project: {
            title: 1,
            _id: 1,
            start_date: 1,
            end_date: 1,
            cover: 1,
            location: {
              city: 1,
              location: 1,
              address: 1,
            },
          },
        },
        {
          $limit: limiter,
        },
      ];

      let filter: any[] = [];
      let should: any[] = [];

      if (query) {
        agg[0].$search.compound.must = [
          { autocomplete: { query: query, path: "title" } },
        ];
      } else {
        agg = [
          ...agg,
          //$sort might be slow on $search atlas search queries
          {
            $sort: {
              end_date: 1,
            },
          },
        ];
      }
      if (city) {
        filter = [
          ...filter,
          { equals: { value: { $oid: city }, path: "cityId" } },
        ];
      }
      if (categoryIds) {
        for (const i in categoryIds) {
          should = [
            ...should,
            {
              equals: { value: { $oid: categoryIds[i] }, path: "category_ids" },
            },
          ];
        }
      }
      if (start_date && end_date) {
        filter = [
          ...filter,
          {
            range: {
              gte: { $date: new Date(start_date).toISOString() },
              path: "end_date",
            },
          },
          {
            range: {
              lte: { $date: new Date(end_date).toISOString() },
              path: "end_date",
            },
          },
        ];
      } else if (start_date) {
        const dateRange = new Date(start_date);
        dateRange.setDate(new Date(start_date).getDate() + 1);

        filter = [
          ...filter,
          {
            range: {
              gte: { $date: new Date(start_date).toISOString() },
              path: "end_date",
            },
          },
          {
            range: {
              lte: {
                $date: new Date(dateRange).toISOString(),
              },
              path: "end_date",
            },
          },
        ];
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setUTCHours(23, 59, 59);
        filter = [
          ...filter,
          {
            range: {
              gte: { $date: yesterday.toISOString() },
              path: "end_date",
            },
          },
        ];
      }

      filter = [...filter, { equals: { value: true, path: "verified" } }];

      if (filter.length > 0) {
        agg[0].$search.compound.filter = filter;
      }

      if (should.length > 0) {
        agg[0].$search.compound.should = should;
        agg[0].$search.compound.minimumShouldMatch = 1;
      }

      const response: any = await prisma.$runCommandRaw({
        aggregate: "Event",
        pipeline: agg,
        cursor: {},
      });

      const fRes = response.cursor.firstBatch.map((item: any) => {
        const start_date = item.start_date?.$date;
        const end_date = item.end_date?.$date;
        const id = item._id?.$oid;

        delete item["_id"];

        return {
          ...item,
          id,
          start_date,
          end_date,
        };
      });

      await prisma.search.create({
        data: {
          query: query,
          city: city,
          start_date: start_date,
          end_date: end_date,
          category_ids: categoryIds,
          user_id: req.user_id,
        },
      });

      res.json({
        events: fRes,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const { categories: includeCategories } = req.query;

      if (!req.user_id && !req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

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
          categories: includeCategories ? true : false,
          event_url: true,
        },
      });

      if (!event) {
        return res.status(404).json({ err: "Event not Found" });
      }

      res.json({
        msg: "Event found",
        event: {
          ...event,
          event_url: event.event_url
            ? `pasakums/${event.event_url}`
            : undefined,
        },
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getByTitle: async (req: Request, res: Response) => {
    try {
      const { title: title_link } = req.params;

      const event = await prisma.event.findFirst({
        where: {
          event_url: title_link,
          verified: true,
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
          data: { eventId: event.id },
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
  clickWebsiteUrl: async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;

      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      await prisma.websiteVisit.create({
        data: { eventId, userId: req.user_id },
      });

      res.json({
        msg: "Pressed",
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
        verified: true,
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
      take: 500,
    });

    let returnEvents: any[] = [];

    for (const event of events) {
      if (
        returnEvents.filter(
          (e) =>
            e.location.lat === event.location.lat &&
            e.location.lng === event.location.lng
        ).length < 20
      ) {
        returnEvents = [...returnEvents, event];
      }
    }

    res.json({
      msg: "Received map events",
      events: returnEvents,
    });
  },
  getSaved: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(400).json({ err: "No user object" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const events = await prisma.event.findMany({
        where: {
          saved_users_ids: {
            has: req.user_id,
          },
          end_date: {
            gte: yesterday,
          },
        },
        orderBy: {
          start_date: "asc",
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
              address: true,
            },
          },
          cityId: true,
          cover: true,
        },
      });

      res.json({ events: events });
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

      if (user.saved_event_ids.some((id) => id === eventId)) {
        const user_saved_ids = user.saved_event_ids.filter(
          (id) => id !== eventId
        );
        await prisma.user.update({
          where: {
            id: req.user_id,
          },
          data: {
            saved_event_ids: user_saved_ids,
          },
        });

        const event_saved_ids = event.saved_users_ids.filter(
          (id) => id !== req.user_id
        );
        await prisma.event.update({
          where: {
            id: eventId,
          },
          data: {
            saved_users_ids: event_saved_ids,
          },
        });

        return res.json({
          msg: "Event removed from saved events",
          newSavedIds: user_saved_ids,
        });
      }

      await prisma.user.update({
        where: {
          id: req.user_id,
        },
        data: {
          saved_event_ids: [...user.saved_event_ids, eventId],
        },
      });
      const savedEvent = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          saved_users_ids: [...event.saved_users_ids, req.user_id],
        },
      });

      res.json({
        msg: "Event added to saved events",
        newSavedIds: [...user.saved_event_ids, eventId],
        event: savedEvent,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  createEvent: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const partner = await prisma.partner.findFirst({
        where: { id: req.partner_id },
        select: {
          verified: true,
        },
      });

      if (!partner) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const {
        title,
        info,
        start_date,
        end_date,
        start_time,
        end_time,
        cover,
        images,
        city,
        address,
        location,
        category_ids,
        website_urls,
        ticket_url,
      }: EventCreateBody = req.body;

      const eventCity = await prisma.city.findFirst({ where: { id: city } });
      if (!eventCity) {
        return res.status(400).json({ err: "City not found" });
      }

      let coords: { lat: null | number; lng: null | number } = {
        lat: null,
        lng: null,
      };

      if (address) {
        coords = await getCoordsFromAddress(`${address}, ${eventCity.name}`);
      }

      const { lat, lng } = coords;

      let locationObject: any = {
        address,
        lat,
        lng,
      };

      if (lat && lng) {
        locationObject = {
          ...locationObject,
          geo: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }

      let priority =
        req.partner_id === "64500e7039f2de1e158d1692" ||
        req.partner_id === "6453c992171e6d69a0fd635e"
          ? 0
          : 50;

      const event = await prisma.event.create({
        data: {
          title,
          info,
          start_date,
          end_date: end_date ? end_date : start_date,
          start_time,
          end_time,
          cover,
          priority,
          images,
          category_ids,
          website_urls: website_urls.filter((url) => url),
          ticket_url,
          spotId: location ? location : undefined,
          location: locationObject,
          cityId: city,
          countryId: eventCity.countryId,
          partnerId: req.partner_id,
          verified: partner.verified,
        },
      });

      res.json({ msg: "Event created", event });

      if (priority !== 0) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 2);
        yesterday.setUTCHours(24, 59, 59, 99);

        const prevAd = await prisma.event.findFirst({
          where: {
            priority: { gte: 60 },
            start_date: { gte: yesterday },
          },
        });

        if (!prevAd) {
          await prisma.event.update({
            where: { id: event.id },
            data: { priority: 60 },
          });
        }
      }

      await prisma.category.updateMany({
        where: { id: { in: category_ids } },
        data: { event_ids: { push: event.id } },
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  updateOne: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const partner = await prisma.partner.findFirst({
        where: { id: req.partner_id },
        select: {
          verified: true,
        },
      });

      if (!partner) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const { id: eventId } = req.params;

      const {
        title,
        info,
        start_date,
        end_date,
        start_time,
        end_time,
        cover,
        images,
        city,
        address,
        location,
        country,
        category_ids,
        website_urls,
        ticket_url,
      }: EventCreateBody = req.body;

      const eventCity = await prisma.city.findFirst({
        where: { id: city, countryId: country },
      });
      if (!eventCity) {
        return res.status(400).json({ err: "City not found" });
      }

      let coords: { lat: null | number; lng: null | number } = {
        lat: null,
        lng: null,
      };

      if (address) {
        coords = await getCoordsFromAddress(`${address}, ${eventCity.name}`);
      }

      const { lat, lng } = coords;

      let locationObject: any = {
        address,
        lat,
        lng,
      };

      if (lat && lng) {
        locationObject = {
          ...locationObject,
          geo: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }

      const event = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          title,
          info,
          start_date,
          end_date: end_date ? end_date : start_date,
          start_time,
          end_time,
          cover,
          images,
          category_ids,
          website_urls: website_urls.filter((url) => url),
          ticket_url,
          spotId: location ? location : undefined,
          location: locationObject,
          cityId: eventCity.id,
          countryId: eventCity.countryId,
          partnerId: req.partner_id,
          verified: partner.verified,
        },
      });

      await prisma.category.updateMany({
        where: { id: { in: category_ids } },
        data: { event_ids: { push: event.id } },
      });

      res.json({ msg: "Event updated", event });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteOne: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const partner = await prisma.partner.findFirst({
        where: { id: req.partner_id },
        select: {
          verified: true,
        },
      });

      if (!partner) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const { id: eventId } = req.params;

      const event = await prisma.event.delete({
        where: {
          id: eventId,
        },
        select: {
          categories: {
            select: {
              id: true,
              event_ids: true,
            },
          },
        },
      });

      for (const cat of event.categories) {
        const newEventIds = cat.event_ids.filter((id) => id !== eventId);

        await prisma.category.update({
          where: { id: cat.id },
          data: { event_ids: newEventIds },
        });
      }

      res.json({ msg: "Event deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getEventList: async (req: Request, res: Response) => {
    try {
      const { ids: event_ids_string } = req.query;

      if (typeof event_ids_string !== "string") {
        return res.status(400).json({ err: "Something went wrong" });
      }

      const event_id_array = event_ids_string.split(";");

      let events = await prisma.event.findMany({
        where: {
          id: { in: event_id_array },
          verified: true,
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
          location: true,
          category_ids: true,
        },
        orderBy: {
          start_date: "asc",
        },
        take: 20,
      });

      const spots = await prisma.spot.findMany({
        where: {
          id: { in: event_id_array },
          verified: true,
        },
        select: {
          id: true,
          cover: true,
          name: true,
          description: true,
          location: true,
          category_ids: true,
        },
        orderBy: {
          priority: "desc",
        },
        take: 15,
      });

      const advertizedEvents = events
        .filter((e: any) => e.priority >= 60)
        .sort((a: any, b: any) => b.priority - a.priority);

      if (advertizedEvents.length > 0) {
        const advertizedEvent = advertizedEvents[0];

        events = [
          advertizedEvent,
          ...events
            .filter((e: any) => e.id !== advertizedEvent.id)
            .map((e: any) => ({ ...e, priority: 50 })),
        ];
      }

      res.json({
        msg: "Events found",
        events: events,
        spots,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
