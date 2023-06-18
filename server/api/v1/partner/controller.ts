import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import bcrypt from "bcrypt";
import {
  createPartnerToken,
  createPasswordResetToken,
} from "../../../src/utils/generateToken";
import { valdatePassword, validateEmail } from "../../../src/utils/valid";
import sendMail from "../../../src/utils/sendMail";
import { passwordResetHtml } from "../../../src/documents/passwordReset";
import jwt from "jsonwebtoken";
import { formatDate } from "../../../src/utils/formatDate";

export const partnerCtrl = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password, logo } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ err: "Please fill in fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ err: "Invalid email" });
      }

      if (!valdatePassword(password)) {
        return res
          .status(400)
          .json({ err: "Password must be at least 6 characters long" });
      }

      const emailTest = await prisma.partner.findFirst({ where: { email } });
      if (emailTest) {
        return res.status(400).json({ err: "This email already exists" });
      }

      const nameTest = await prisma.partner.findFirst({
        where: { name: name },
      });
      if (nameTest) {
        return res.status(400).json({ err: "This name is already taken" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newPartner = await prisma.partner.create({
        data: {
          email: email,
          name: name,
          password: passwordHash,
          logo,
        },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
          logo: true,
          verified: true,
        },
      });

      const refresh_token = createPartnerToken({
        id: newPartner.id.toString(),
      });

      res.cookie("token", refresh_token, {
        path: process.env.NODE_ENV === "production" ? "/" : undefined,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN
            : undefined,
        secure: process.env.NODE_ENV === "production" ? true : undefined,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : undefined,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Account has been activated!",
        token: refresh_token,
        partner: newPartner,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ err: "Please fill in fields" });
      }

      if (!validateEmail(email)) {
        return res.status(400).json({ err: "Invalid email" });
      }

      if (!valdatePassword(password)) {
        return res
          .status(400)
          .json({ err: "Password must be at least 6 characters long" });
      }

      const partner = await prisma.partner.findFirst({
        where: { email: email },
      });
      if (!partner || !partner.password) {
        return res
          .status(400)
          .json({ err: "A partner with this email does not exist" });
      }

      const isMatch = await bcrypt.compare(password, partner.password);
      if (!isMatch) {
        return res.status(400).json({ err: "Incorrect password" });
      }

      const refresh_token = createPartnerToken({
        id: partner.id.toString(),
      });

      res.cookie("token", refresh_token, {
        path: process.env.NODE_ENV === "production" ? "/" : undefined,
        domain:
          process.env.NODE_ENV === "production"
            ? process.env.COOKIE_DOMAIN
            : undefined,
        secure: process.env.NODE_ENV === "production" ? true : undefined,
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : undefined,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Logged in",
        token: refresh_token,
        partner: partner,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      if (!token) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const pasword_reset_secret = process.env.PASSWORD_RESET_SECRET;
      if (!pasword_reset_secret) {
        return res.status(500).json({ err: "Something went wrong" });
      }

      const decoded: any = jwt.verify(token, pasword_reset_secret, {
        ignoreExpiration: true,
      });
      if (!decoded || !decoded.id) {
        return res.status(400).json({ err: "sesija beigusies" });
      }

      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);

      const partner = await prisma.partner.update({
        where: { id: decoded.id },
        data: {
          password: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
          logo: true,
          verified: true,
        },
      });
      if (!partner) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      res.json({
        msg: "Password updated successfully",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const emailValid = validateEmail(email);
      if (!email || !emailValid) {
        return res.status(400).json({ err: "Invalid email" });
      }

      const partner = await prisma.partner.findFirst({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
          logo: true,
          verified: true,
        },
      });
      if (!partner) {
        return res
          .status(400)
          .json({ err: "Partner with this email doesn't exist" });
      }

      const passwordResetToken = createPasswordResetToken({
        id: partner.id.toString(),
      });
      if (!passwordResetToken) {
        return res
          .status(500)
          .json({ err: "Something went wrong, try again later" });
      }

      const html = passwordResetHtml(passwordResetToken);

      const mailSent = await sendMail({
        receiver: email,
        subject: "Paroles atiestatīšana",
        html,
        text: "Atiestatiet savu spotloc organizētāja paroli!",
      });

      if (!mailSent) {
        return res
          .status(500)
          .json({ err: "Something went wrong, try again later" });
      }

      res.json({
        msg: "Check your email",
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getPartnerInfo: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const partner = await prisma.partner.findFirst({
        where: { id: req.partner_id },
        select: {
          id: true,
          name: true,
          email: true,
          description: true,
          logo: true,
          verified: true,
        },
      });
      if (!partner) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      res.json({
        msg: "Logged in",
        partner: partner,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getPartnerSpots: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const spots = await prisma.spot.findMany({
        where: {
          partnerId: req.partner_id,
        },
        take: 50,
      });

      res.json({
        msg: "Received spot data",
        spots: spots,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  updatePartnerInfo: async (req: Request, res: Response) => {
    try {
      const { email, name, logo, password, description } = req.body;
      if (password) {
        if (!valdatePassword(password)) {
          return res
            .status(400)
            .json({ err: "Password must be at least 6 characters long" });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const partner = await prisma.partner.update({
          where: { id: req.partner_id },
          data: { email, name, logo, password: passwordHash, description },
        });

        return res.json({
          msg: "Updated",
          partner: partner,
        });
      }

      const partner = await prisma.partner.update({
        where: { id: req.partner_id },
        data: { email, name, logo, description },
      });

      res.json({
        msg: "Updated",
        partner: partner,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: partnerId } = req.params;

      if (!partnerId) {
        return res.status(400).json({ err: "Invalid id" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const partner = await prisma.partner.findFirst({
        where: { id: partnerId },
        select: {
          events: {
            where: {
              verified: true,
              cover: {
                isSet: true,
              },
              start_date: {
                gt: yesterday,
              },
            },
            select: {
              id: true,
              cover: {
                select: {
                  src: true,
                },
              },
              title: true,
              start_date: true,
              end_date: true,
              location: {
                select: {
                  location: true,
                  city: true,
                  address: true,
                },
              },
            },
            orderBy: {
              event_views: {
                _count: "desc",
              },
            },
            take: 20,
          },
        },
      });

      res.json({
        msg: "Received partner info",
        partner: partner,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getPopular: async (req: Request, res: Response) => {
    try {
      const { id: partner_id } = req.params;

      if (!req.partner_id || req.partner_id !== partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const popular = await prisma.event.findMany({
        where: {
          partnerId: req.partner_id,
          start_date: { gte: yesterday },
        },
        select: {
          id: true,
          cover: true,
          title: true,
          start_date: true,
          end_date: true,
          view_count: true,
        },
        orderBy: {
          view_count: "desc",
        },
        take: 20,
      });

      res.json({ msg: "Received popular events", popular });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getEvents: async (req: Request, res: Response) => {
    try {
      if (!req.partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const { skip = "0" } = req.query;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      const events = await prisma.event.findMany({
        where: {
          partnerId: req.partner_id,
          start_date: { gte: yesterday },
        },
        select: {
          id: true,
          cover: true,
          title: true,
          info: true,
          start_date: true,
          end_date: true,
          view_count: true,
        },
        orderBy: {
          start_date: "asc",
        },
        skip: Number(skip),
        take: 20,
      });

      res.json({ msg: "Received events", events });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getChartData: async (req: Request, res: Response) => {
    try {
      const { id: partner_id } = req.params;

      if (!req.partner_id || req.partner_id !== partner_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 2);
      yesterday.setUTCHours(24, 59, 59, 99);

      let chartData = null;

      interface ChartDataView {
        id: number;
        label: string;
        views: number;
      }

      let chartStartDate = new Date();
      let chartEndDate = new Date();

      let chartDataViews: ChartDataView[] = [];

      const partnerViews = await prisma.view.findMany({
        where: {
          event: {
            partnerId: req.partner_id,
          },
        },
        select: {
          created_at: true,
        },
      });

      if (partnerViews.length > 0) {
        const eventViews = partnerViews.sort((a, b) =>
          new Date(a.created_at) < new Date(b.created_at) ? -1 : 1
        );

        chartStartDate = new Date(eventViews[0].created_at);
        chartEndDate = new Date(eventViews[eventViews.length - 1].created_at);

        for (const view of eventViews) {
          const date = new Date(view.created_at);
          const label = formatDate(date);

          if (chartDataViews.some((d) => d.label === label)) {
            chartDataViews = chartDataViews.map((item) => {
              if (item.label === label) {
                return {
                  ...item,
                  views: item.views + 1,
                };
              }

              return item;
            });
          } else {
            chartDataViews = [
              ...chartDataViews,
              {
                id: chartDataViews.length,
                label,
                views: 1,
              },
            ];
          }
        }
      }

      const partnerWebsiteViews = await prisma.websiteVisit.findMany({
        where: {
          event: {
            partnerId: req.partner_id,
          },
        },
        select: {
          created_at: true,
        },
      });

      interface ChartDataWebsiteViews {
        id: number;
        label: string;
        website_visits: number;
      }

      let chartDataWebsiteViews: ChartDataWebsiteViews[] = [];

      if (partnerWebsiteViews.length > 0) {
        const websiteViews = partnerWebsiteViews.sort((a, b) =>
          new Date(a.created_at) < new Date(b.created_at) ? -1 : 1
        );

        if (chartStartDate > new Date(websiteViews[0].created_at)) {
          chartStartDate = new Date(websiteViews[0].created_at);
        }

        if (
          chartEndDate <
          new Date(websiteViews[websiteViews.length - 1].created_at)
        ) {
          chartEndDate = new Date(
            websiteViews[websiteViews.length - 1].created_at
          );
        }

        for (const view of websiteViews) {
          const date = new Date(view.created_at);
          const label = formatDate(date);

          if (chartDataWebsiteViews.some((d) => d.label === label)) {
            chartDataWebsiteViews = chartDataWebsiteViews.map((item) => {
              if (item.label === label) {
                return {
                  ...item,
                  website_visits: item.website_visits + 1,
                };
              }

              return item;
            });
          } else {
            chartDataWebsiteViews = [
              ...chartDataWebsiteViews,
              {
                id: chartDataWebsiteViews.length,
                label,
                website_visits: 1,
              },
            ];
          }
        }
      }

      let labels: string[] = [];

      while (chartStartDate < chartEndDate) {
        labels = [...labels, formatDate(chartStartDate)];
        chartStartDate.setDate(chartStartDate.getDate() + 1);
      }

      labels = [...labels, formatDate(chartEndDate)];

      labels = Array.from(new Set(labels));

      chartData = {
        labels: labels,
        datasets: [
          {
            label: "Skatījumi",
            data: chartDataViews.map((data) => data.views),
            borderColor: "#EB3355",
            backgroundColor: "#EB3355",
            borderWidth: 2,
          },
          {
            label: "Mājaslapas apmeklējumi",
            data: chartDataWebsiteViews.map((data) => data.website_visits),
            borderColor: "#771F49",
            backgroundColor: "#771F49",
            borderWidth: 2,
          },
        ],
      };

      res.json({
        msg: "Received chart data",
        chartData,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
