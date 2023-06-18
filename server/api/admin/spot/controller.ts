import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const spotCtrl = {
  verify: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;

      const spot = await prisma.spot.findFirst({
        where: {
          id: spotId,
        },
        select: {
          verified: true,
          id: true,
        },
      });

      if (!spot) {
        return res.status(400).json({ err: "Unable to find" });
      }

      const updated = await prisma.spot.update({
        where: {
          id: spotId,
        },
        data: {
          verified: !spot.verified,
        },
        select: {
          id: true,
          verified: true,
        },
      });

      res.json({
        spot: updated,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id: spotId } = req.params;

      await prisma.spot.delete({
        where: {
          id: spotId,
        },
      });

      await prisma.event.updateMany({
        where: {
          spotId: spotId,
        },
        data: {
          spotId: null,
        },
      });

      res.json({
        msg: "Spot deleated",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const spots = await prisma.spot.findMany({
        orderBy: { events: { _count: "desc" } },
        include: { _count: true },
      });

      res.json({
        msg: "Spot info received",
        spots: spots,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
