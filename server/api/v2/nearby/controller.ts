import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { getDistanceFromLatLngInKm } from "../../../src/utils/getDistanceFromCoords";

export const nearbyCtrl = {
  getNearbyData: async (req: Request, res: Response) => {
    try {
      const { lat, lng } = req.query;

      console.log(lat, lng);

      if (!req.user_id) {
        return res.status(500).json({ err: "Unauthorized" });
      }

      let event_agg: any = [
        {
          $search: {
            index: "default",
            compound: {
              must: {
                near: {
                  origin: {
                    type: "Point",
                    coordinates: [Number(lng), Number(lat)],
                  },
                  pivot: 100000,
                  path: "location.geo",
                },
              },
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
            location: 1,
          },
        },
        {
          $limit: 15,
        },
      ];

      let filter: any[] = [];

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setUTCHours(23, 59, 59);

      const threeahead = new Date();
      threeahead.setDate(threeahead.getDate() + 3);
      threeahead.setUTCHours(23, 59, 59);

      filter = [
        ...filter,
        {
          range: {
            gte: { $date: yesterday.toISOString() },
            path: "end_date",
          },
        },
        {
          range: {
            lte: { $date: threeahead.toISOString() },
            path: "end_date",
          },
        },
      ];

      filter = [...filter, { equals: { value: true, path: "verified" } }];

      if (filter.length > 0) {
        event_agg[0].$search.compound.filter = filter;
      }

      const event_response: any = await prisma.$runCommandRaw({
        aggregate: "Event",
        pipeline: event_agg,
        cursor: {},
      });

      const event_Res = event_response.cursor.firstBatch.map((item: any) => {
        const start_date = item.start_date?.$date;
        const end_date = item.end_date?.$date;
        const id = item._id?.$oid;

        delete item["_id"];

        const distance = getDistanceFromLatLngInKm(
          item.location.geo.coordinates[1],
          item.location.geo.coordinates[0],
          Number(lat),
          Number(lng)
        );

        return {
          ...item,
          id,
          start_date,
          end_date,
          distance: Math.round((distance + Number.EPSILON) * 100) / 100,
        };
      });

      let spot_agg: any = [
        {
          $search: {
            index: "spots",
            compound: {
              must: {
                near: {
                  origin: {
                    type: "Point",
                    coordinates: [Number(lng), Number(lat)],
                  },
                  pivot: 100000,
                  path: "location.geo",
                },
              },
              filter:  { equals: { value: true, path: "verified" } }  
            },
          },
        },
        {
          $project: {
            name: 1,
            _id: 1,
            cover: 1,
            location: 1,
          },
        },
        {
          $limit: 10,
        },
      ];

      // filter = [];

      // filter = [...filter, { equals: { value: true, path: "verified" } }];

      // if (filter.length > 0) {
      //   event_agg[0].$search.compound.filter = filter;
      // }

      const spot_response: any = await prisma.$runCommandRaw({
        aggregate: "Spot",
        pipeline: spot_agg,
        cursor: {},
      });

      const spot_Res = spot_response.cursor.firstBatch.map((item: any) => {
        const id = item._id?.$oid;

        delete item["_id"];

        const distance = getDistanceFromLatLngInKm(
          item.location.geo.coordinates[1],
          item.location.geo.coordinates[0],
          Number(lat),
          Number(lng)
        );

        return {
          ...item,
          id,
          distance: Math.round((distance + Number.EPSILON) * 100) / 100,
        };
      });

      res.json({
        msg: "Nearby events and spots",
        events: event_Res,
        spots: spot_Res,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
