import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const countryCtrl = {
  get: async (_req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      const foundCountries = await prisma.country.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      res.json({
        msg: "Country info received",
        countries: foundCountries,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { name }: { name?: string } = req.body;

      const { id: countryId } = req.params;

      const updatedCountry = await prisma.country.update({
        where: {
          id: countryId,
        },
        data: {
          name,
        },
      });

      res.json({
        msg: "Country updated successfully",
        country: updatedCountry,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const {
        name,
        en_name,
        flag,
        short,
      }: { name?: string; en_name?: string; flag?: string; short?: string } =
        req.body;

      if (!name) {
        return res.status(400).json({ err: "Enter name" });
      }

      const createdCountry = await prisma.country.upsert({
        where: {
          name: name,
        },
        create: {
          name: name,
          en_name,
          flag,
          short,
          verified: true,
        },
        update: {
          en_name,
          flag,
          short,
          verified: true,
        },
      });

      res.json({
        msg: "Country created successfully",
        country: createdCountry,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  verify: async (req: Request, res: Response) => {
    try {
      const { id: countryId } = req.params;

      const country = await prisma.country.findFirst({
        where: {
          id: countryId,
        },
        select: {
          verified: true,
          id: true,
        },
      });

      if (!country) {
        return res.status(400).json({ err: "Unable to find" });
      }

      const updated = await prisma.country.update({
        where: {
          id: countryId,
        },
        data: {
          verified: !country.verified,
        },
        select: {
          id: true,
          verified: true,
        },
      });

      res.json({
        country: updated,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const countries = await prisma.country.findMany();

      res.json({
        msg: "Country info received",
        countries: countries,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
