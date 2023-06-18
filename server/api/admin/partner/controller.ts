import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

export const partnerCtrl = {
  getPartnerInfo: async (req: Request, res: Response) => {
    try {
      const partners = await prisma.partner.findMany({
        include: { _count: true },
      });

      res.json({
        partners: partners,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  verify: async (req: Request, res: Response) => {
    try {
      const { id: partnerId } = req.params;

      const partner = await prisma.partner.findFirst({
        where: {
          id: partnerId,
        },
        select: {
          verified: true,
          id: true,
        },
      });

      if (!partner) {
        return res.status(400).json({ err: "Unable to find" });
      }

      const updated = await prisma.partner.update({
        where: {
          id: partnerId,
        },
        data: {
          verified: !partner.verified,
        },
        select: {
          id: true,
          verified: true,
        },
      });

      await prisma.event.updateMany({
        where: { partnerId: partnerId },
        data: { verified: !partner.verified },
      });

      res.json({
        partner: updated,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  verifyAll: async (req: Request, res: Response) => {
    try {
      await prisma.partner.updateMany({
        data: { verified: true },
      });

      res.json({
        msg: "Verified all partners",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
