import { Request, Response } from "express";
import prisma from "../../src/lib/prisma";
import { createRefreshToken } from "../../src/utils/generateToken";
import jwt from "jsonwebtoken";

export const userCtrl = {
  getUserInfo: async (req: Request, res: Response) => {
    try {
      let userId: string | null = null;

      try {
        const token = req.headers.authorization;

        if (token) {
          const access_token_secret = process.env.REFRESH_TOKEN_SECRET;
          if (access_token_secret) {
            const decoded: any = jwt.verify(token, access_token_secret, {
              ignoreExpiration: true,
            });
            if (decoded && decoded.id) {
              userId = decoded.id;
            }
          }
        }
      } catch (err: any) {
        userId = null;
      }

      try {
        if (userId) {
          const user = await prisma.user.update({
            where: { id: userId },
            data: {
              last_login: new Date(),
            },
            select: {
              id: true,
            },
          });

          if (user) {
            //UNCOMMENT THIS IF SOMETHING GOES WRONG WITH TOKENS
            // const refresh_token = createRefreshToken({
            //   id: user.id,
            // });
            return res.json({
              msg: "Logged in",
              user: user,
              // token: refresh_token,
            });
          }
        }
      } catch (err: any) {}

      const user = await prisma.user.create({
        data: {},
        select: {
          id: true,
        },
      });

      const refresh_token = createRefreshToken({
        id: user.id,
      });

      return res.json({
        msg: "Logged in",
        user: user,
        token: refresh_token,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
