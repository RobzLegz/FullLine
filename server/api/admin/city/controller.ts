import { Request, Response } from "express";
import { cities } from "../../../src/constants/cities";
import prisma from "../../../src/lib/prisma";
import { City } from "@prisma/client";

export const cityCtrl = {
  get: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const foundCities = await prisma.city.findMany({
        where: {
          name: {
            in: cities,
          },
          events: {
            some: {
              start_date: {
                gte: yesterday,
                lt: nextMonth,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          lat: true,
          lng: true,
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
      });

      res.json({
        msg: "City info received",
        cities: foundCities,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { name, lat, lng }: { name?: string; lat?: number; lng?: number } =
        req.body;

      const { id: cityId } = req.params;

      const updatedCity = await prisma.city.update({
        where: {
          id: cityId,
        },
        data: {
          name,
          lat,
          lng,
        },
      });

      res.json({
        msg: "City updated successfully",
        city: updatedCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { name, lat, lng }: { name?: string; lat?: number; lng?: number } =
        req.body;

      if (!name) {
        return res.status(400).json({ err: "Enter name" });
      }

      const createdCity = await prisma.city.upsert({
        where: {
          name: name,
        },
        create: {
          name: name,
          lat: lat,
          lng: lng,
        },
        update: {
          lat: lat,
          lng: lng,
        },
        select: {
          id: true,
          name: true,
        },
      });

      res.json({
        msg: "City created successfully",
        city: createdCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  merge: async (req: Request, res: Response) => {
    try {
      const { name, ids }: { name?: string; ids?: string[] } = req.body;

      if (!name || !ids) {
        return res.status(400).json({
          err: "Wrong data",
        });
      }

      const cities = await prisma.city.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        select: {
          lat: true,
          lng: true,
          events: {
            select: {
              id: true,
            },
          },
        },
      });

      let lat,
        lng = undefined;

      let eventIds: string[] = [];

      for (const city of cities) {
        if (city.lat && city.lng) {
          lat = city.lat;
          lng = city.lng;
        }

        eventIds = Array.from(
          new Set([...eventIds, ...city.events.map((e) => e.id)])
        );
      }

      const createdCity = await prisma.city.upsert({
        where: {
          name: name,
        },
        create: {
          name: name,
          lat: lat,
          lng: lng,
          verified: true,
        },
        update: {
          lat: lat,
          lng: lng,
          verified: true,
        },
        include: {
          _count: true,
        },
      });

      const deleteIds = ids.filter((cid) => cid !== createdCity.id);

      await prisma.event.updateMany({
        where: {
          id: {
            in: eventIds,
          },
        },
        data: {
          cityId: createdCity.id,
          location: {
            city: createdCity.name,
          },
        },
      });

      await prisma.city.deleteMany({
        where: {
          id: {
            in: deleteIds,
          },
        },
      });

      res.json({
        msg: "Cities merged",
        city: createdCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  verify: async (req: Request, res: Response) => {
    try {
      const { id: cityId } = req.params;

      const city = await prisma.city.findFirst({
        where: {
          id: cityId,
        },
        select: {
          verified: true,
          id: true,
        },
      });

      if (!city) {
        return res.status(400).json({ err: "Unable to find" });
      }

      const updated = await prisma.city.update({
        where: {
          id: cityId,
        },
        data: {
          verified: !city.verified,
        },
        select: {
          id: true,
          verified: true,
        },
      });

      res.json({
        city: updated,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id: cityId } = req.params;

      await prisma.city.delete({
        where: {
          id: cityId,
        },
      });

      await prisma.event.updateMany({
        where: {
          cityId: cityId,
        },
        data: {
          cityId: null,
          location: {
            city: null,
          },
        },
      });

      res.json({
        msg: "City deleated",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const cities = await prisma.city.findMany({
        orderBy: { events: { _count: "desc" } },
        include: { _count: true },
      });

      res.json({
        msg: "City info received",
        cities: cities,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  updateMany: async (req: Request, res: Response) => {
    try {
      const { cities }: { cities: City[] } = req.body;

      for (const city of cities) {
        await prisma.city.update({
          where: { id: city.id },
          data: {
            name: city.name,
            countryId: city.countryId,
            lat: city.lat,
            lng: city.lng,
          },
        });
      }

      res.json({
        msg: "City info updated",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  fuck: async (_req: Request, res: Response) => {
    try {
      const x = await prisma.event.updateMany({
        where: {
          cityId: "63f093f4305542737dd4dc2f",
        },
        data: {
          cityId: "63f093f4305542737dd4dc2f",
          location: {
            city: "Tiešsaistē",
          },
        },
      });

      res.json({
        msg: "Fuck",
        count: x.count,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
