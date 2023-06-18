import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { formatCityName } from "../../../src/utils/formatCityName";
import axios from "axios";
import memoryCache from "memory-cache";

export const feedCtrl = {
  getFeed: async (req: Request, res: Response) => {
    try {
      const {
        city = "63f0dd5f10aa3c717cb9a21b",
        country = "64450f18e843597154f1d832",
      } = req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      let agg: any = [
        {
          $search: {
            index: "default",
            compound: {
              filter: [
                {
                  equals: {
                    path: "verified",
                    value: true,
                  },
                },
                {
                  equals: {
                    path: "countryId",
                    value: { $oid: country },
                  },
                },
                {
                  exists: {
                    path: "cover",
                  },
                },
                {
                  range: {
                    path: "end_date",
                    gte: { $date: yesterday.toISOString() },
                  },
                },
              ],
            },
          },
        },
        {
          $project: {
            _id: 1,
            cover: 1,
            website_urls: 1,
            view_count: 1,
          },
        },
        {
          $sort: {
            view_count: -1,
          },
        },
        {
          $limit: 15,
        },
      ];

      const response: any = await prisma.$runCommandRaw({
        aggregate: "Event",
        pipeline: agg,
        cursor: {},
      });

      const fRes: any = response.cursor.firstBatch.map((item: any) => {
        const id = item._id?.$oid;

        delete item["_id"];

        return {
          ...item,
          id,
        };
      });

      let returnCountry: any = {
        id: "64450f18e843597154f1d832",
        name: "Latvija",
        verified: true,
        en_name: "Latvia",
        short: "LV",
        flag: "https://www.worldometers.info/img/flags/lg-flag.gif",
        cities: [
          {
            id: "63f0dd5f10aa3c717cb9a21b",
            name: "Rīga",
            priority: 0,
            lat: 56.9745121,
            lng: 24.1659994,
            verified: true,
            countryId: "64450f18e843597154f1d832",
          },
        ],
      };

      if (
        country !== "64450f18e843597154f1d832" &&
        typeof country === "string"
      ) {
        returnCountry = await prisma.country.findFirst({
          where: { id: country },
          include: {
            cities: {
              orderBy: {
                priority: "desc",
              },
              take: 1,
            },
          },
        });
      }

      if (!returnCountry) {
        console.log("No country");
        return res.status(500).json({ err: "Couldn't find the country" });
      }

      let returnCity = await prisma.city.findFirst({
        where: { id: String(city), countryId: String(country) },
        include: { country: true },
      });

      if (
        !returnCity &&
        returnCountry.cities &&
        returnCountry.cities.length > 0
      ) {
        returnCity = returnCountry.cities[0];
      }

      res.json({
        msg: "Feed received",
        feed: [
          {
            name: `Populāri ${formatCityName(returnCountry.name)}`,
            id: "news",
            events: fRes,
          },
        ],
        country: returnCountry,
        city: returnCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getRecomendations: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.params;
      const userId = req.user_id;

      if (!userId || userId !== user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      let feed: any = [];

      try {
        const engineBase = process.env.ENGINE_URL;
        const engineSecret = process.env.ENGINE_SECRET_TOKEN;
        if (engineBase && engineSecret) {
          const url = `${engineBase}?user_id=${userId}`;

          const res: any = await axios.get(url, {
            headers: { Authorization: engineSecret },
          });

          if (
            res.data &&
            res.data.id &&
            res.data.events &&
            res.data.events.length > 0
          ) {
            feed = [res.data];
          }
        }
      } catch (err: any) {
        console.log("No recomendations");
      }

      res.json({ feed: feed });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getLocationEvents: async (req: Request, res: Response) => {
    try {
      const {
        city = "63f0dd5f10aa3c717cb9a21b",
        country = "64450f18e843597154f1d832",
      } = req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      let returnCountry: any = {
        id: "64450f18e843597154f1d832",
        name: "Latvija",
        verified: true,
        en_name: "Latvia",
        short: "LV",
        flag: "https://www.worldometers.info/img/flags/lg-flag.gif",
        cities: [
          {
            id: "63f0dd5f10aa3c717cb9a21b",
            name: "Rīga",
            priority: 0,
            lat: 56.9745121,
            lng: 24.1659994,
            verified: true,
            countryId: "64450f18e843597154f1d832",
          },
        ],
      };

      if (
        country !== "64450f18e843597154f1d832" &&
        typeof country === "string"
      ) {
        returnCountry = await prisma.country.findFirst({
          where: { id: country },
          include: {
            cities: {
              orderBy: {
                priority: "desc",
              },
              take: 1,
            },
          },
        });
      }

      if (!returnCountry) {
        console.log("No country");
        return res.status(500).json({ err: "Couldn't find the country" });
      }

      let returnCity = await prisma.city.findFirst({
        where: { id: String(city), countryId: String(country) },
        include: { country: true },
      });

      if (
        !returnCity &&
        returnCountry.cities &&
        returnCountry.cities.length > 0
      ) {
        returnCity = returnCountry.cities[0];
      }

      if (!returnCity) {
        console.log("No city");
        return res.status(500).json({ err: "Couldn't find the city" });
      }

      let agg: any = [
        {
          $search: {
            index: "default",
            compound: {
              filter: [
                {
                  equals: {
                    path: "cityId",
                    value: { $oid: returnCity.id },
                  },
                },
                {
                  equals: {
                    path: "verified",
                    value: true,
                  },
                },
                {
                  exists: {
                    path: "cover",
                  },
                },
                {
                  range: {
                    path: "end_date",
                    gte: { $date: yesterday.toISOString() },
                  },
                },
                { equals: { value: true, path: "verified" } },
              ],
            },
          },
        },
        {
          $project: {
            title: 1,
            _id: 1,
            start_date: 1,
            end_date: 1,
            cover: 1,
            priority: 1,
            location: {
              city: 1,
              location: 1,
              address: 1,
            },
            category_ids: 1,
          },
        },
        {
          $sort: {
            start_date: 1,
          },
        },
      ];

      const response: any = await prisma.$runCommandRaw({
        aggregate: "Event",
        pipeline: agg,
        cursor: {},
      });

      const fRes: any = response.cursor.firstBatch.map((item: any) => {
        const start_date = item.start_date?.$date;
        const end_date = item.end_date?.$date;
        const id = item._id?.$oid;
        const category_ids = item.category_ids?.map((item: any) => {
          return item.$oid;
        });

        delete item["_id"];

        return {
          ...item,
          id,
          start_date,
          end_date,
          category_ids: category_ids.filter(
            (cat: any) => cat !== "64419400c5b35c8e38e347f9"
          ),
        };
      });

      const categoryIds: string[] = Array.from(
        new Set(fRes.flatMap((event: any) => event.category_ids))
      );

      let categories: any[] = memoryCache.get("categories");
      if (!categories) {
        categories = await prisma.category.findMany({
          where: { id: { in: categoryIds } },
        });
      }

      let news: any[] = [];

      for (const category of categories) {
        news = [
          ...news,
          {
            ...category,
            events: fRes.filter((ev: any) =>
              category.name !== "Citi"
                ? ev.category_ids.some((cId: any) => category.id === cId)
                : ev.category_ids.length === 0
            ),
          },
        ];
      }

      news = news.filter((cat) => cat.events.length > 0);

      const advertized = news.map((cat) => {
        const advertizedEvents = cat.events
          .filter((e: any) => e.priority >= 60)
          .sort((a: any, b: any) => b.priority - a.priority);

        if (advertizedEvents.length === 0) {
          return cat;
        }

        const advertizedEvent = advertizedEvents[0];

        return {
          ...cat,
          events: [
            advertizedEvent,
            ...cat.events
              .filter((e: any) => e.id !== advertizedEvent.id)
              .map((e: any) => ({ ...e, priority: 50 })),
          ],
        };
      });

      let returnCategories = advertized
        .filter((cat) => cat.name !== "Citi")
        .sort((a, b) => b.events.length - a.events.length);

      const citi = advertized.find((cat) => cat.name === "Citi");
      if (citi) {
        returnCategories = [...returnCategories, citi];
      }

      res.json({
        msg: "Location events received",
        feed: returnCategories,
        city: returnCity,
        country: returnCountry,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
