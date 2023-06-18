import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const sitemapCtrl = {
  getSitemap: async (req: Request, res: Response) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const sitemap = await prisma.event.findMany({
        where: {
          start_date: { gte: yesterday },
          end_date: { gte: yesterday },
          verified: true,
          event_url: { isSet: true },
        },
        select: {
          event_url: true,
        },
      });

      res.json({
        msg: "Feed received",
        sitemap,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
