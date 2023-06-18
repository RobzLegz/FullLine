import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { validateEmail } from "../../../src/utils/valid";
import { createRefreshToken } from "../../../src/utils/generateToken";
import { City } from "@prisma/client";

export const userCtrl = {
  getUserInfo: async (req: Request, res: Response) => {
    try {
      if (req.user_id === null) {
        const user = await prisma.user.create({
          data: {
            settings: {},
          },
          select: { saved_event_ids: true, id: true },
        });

        const refresh_token = createRefreshToken({
          id: user.id.toString(),
        });

        return res.json({
          msg: "Logged in",
          user: user,
          refreshToken: refresh_token,
        });
      }

      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const user = await prisma.user.update({
        where: { id: req.user_id },
        data: {
          last_login: new Date(),
        },
        select: {
          saved_event_ids: true,
          cityId: true,
          countryId: true,
          id: true,
        },
      });

      res.json({
        msg: "Logged in",
        user: user,
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
      if (!refreshToken) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      res.json({
        msg: "User created",
        refreshToken: refreshToken,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  // registerHackathon: async (req: Request, res: Response) => {
  //   try {
  //     const {
  //       email,
  //       name,
  //       school,
  //       grade,
  //       question,
  //     }: {
  //       email?: string;
  //       name?: string;
  //       school?: string;
  //       grade?: string;
  //       question?: string;
  //     } = req.body;

  //     if (!email || !name || !school || !grade) {
  //       return res.status(400).json({ err: "Invalid data" });
  //     }

  //     const emailCheck = await prisma.participant.findFirst({
  //       where: { email: email },
  //     });
  //     if (emailCheck) {
  //       return res
  //         .status(400)
  //         .json({ err: "A user with this email already exists" });
  //     }

  //     const user = await prisma.participant.create({
  //       data: {
  //         email,
  //         name,
  //         school,
  //         grade,
  //         question,
  //       },
  //     });

  //     const refreshToken = createRefreshToken({ id: user.id });
  //     if (!refreshToken) {
  //       return res.status(500).json({ err: "Something went wrong" });
  //     }

  //     res.json({
  //       msg: "User created",
  //       refreshToken: refreshToken,
  //     });
  //   } catch (err: any) {
  //     return res.status(500).json({ err: err.message });
  //   }
  // },
  getFeed: async (req: Request, res: Response) => {
    try {
      const { city = "Rīga", gotNews = "false" } = req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const nextMonth = new Date(yesterday);
      nextMonth.setMonth(yesterday.getMonth() + 1);

      let returnCity: City | null = {
        id: "63f0dd5f10aa3c717cb9a21b",
        name: "Rīga",
        lat: 56.9663848,
        lng: 24.1334868,
        verified: true,
        countryId: null,
        priority: 1,
      };

      if (city !== "Rīga" && typeof city === "string") {
        returnCity = await prisma.city.findFirst({ where: { id: city } });
      }

      if (!returnCity) {
        return res.status(400).json({ err: "City not found" });
      }

      const categories = await prisma.category.findMany({
        where: {
          events: {
            some: {
              cityId: returnCity.id,
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
          },
        },
        orderBy: {
          events: {
            _count: "desc",
          },
        },
        take: 8,
        select: {
          id: true,
          name: true,
          events: {
            where: {
              cityId: returnCity.id,
              start_date: {
                gte: yesterday,
              },
              verified: true,
            },
            select: {
              cover: true,
              id: true,
              title: true,
              start_date: true,
              end_date: true,
              location: true,
            },
            orderBy: {
              start_date: "asc",
            },
            take: 7,
          },
        },
      });

      const thisWeek = new Date(yesterday);
      thisWeek.setDate(yesterday.getDate() - 7);

      let feed: any[] = [];

      if (gotNews === "false") {
        const news = await prisma.event.findMany({
          where: {
            cover: {
              isSet: true,
            },
            verified: true,
            start_date: {
              gte: today,
            },
          },
          take: 11,
          select: {
            id: true,
            cover: true,
          },
          orderBy: {
            event_views: {
              _count: "desc",
            },
          },
        });

        // const news = await prisma.event.findMany({
        //   where: {
        //     start_date: {
        //       gte: today,
        //     },
        //     cover: {
        //       isSet: true,
        //     },
        //     verified: true,
        //     event_views: {
        //       some: {
        //         created_at: {
        //           gt: thisWeek,
        //         },
        //       },
        //     },
        //   },
        //   take: 50,
        //   select: {
        //     id: true,
        //     cover: true,
        //     website_urls: true,
        //     event_views: {
        //       where: {
        //         created_at: {
        //           gt: thisWeek,
        //         },
        //       },
        //     },
        //   },
        //   orderBy: {
        //     event_views: {
        //       _count: "desc",
        //     },
        //   },
        // });

        // const weeklyTop = news
        //   .sort((a, b) => b.event_views.length - a.event_views.length)
        //   .slice(0, 12);

        feed = [
          ...feed,
          {
            name: "Populāri Latvijā",
            id: "news",
            events: news,
          },
        ];
      }

      feed = [...feed, ...categories];

      res.json({
        msg: "Feed received",
        feed,
        city: returnCity,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
