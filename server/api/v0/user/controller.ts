import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { validateEmail } from "../../../src/utils/valid";
import { createRefreshToken } from "../../../src/utils/generateToken";

export const userCtrl = {
  getUserInfo: async (req: Request, res: Response) => {
    try {
      res.json({
        msg: "Logged in",
        user: req.user_id,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  joinNewsletter: async (req: Request, res: Response) => {
    try {
      const { email }: { email?: string } = req.body;
      if (!email || !validateEmail(email)) {
        return res.status(400).json({ err: "Invalid email" });
      }

      await prisma.user.create({
        data: { email: email, subscribed_to_newsletter: true, settings: {} },
      });

      res.json({
        msg: "Joined newsletter",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const validator = process.env.VALIDATOR_TOKEN_SECRET;
      if (!validator) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      if (req.query.x_token_xd_spot_fr !== validator) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      const user = await prisma.user.create({
        data: {
          settings: {},
        },
      });

      const refreshToken = createRefreshToken({ id: user.id });
      console.log(refreshToken);
      res.json({
        msg: "User created",
        refreshToken: refreshToken,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
