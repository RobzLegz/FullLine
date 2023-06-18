import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";
import { formatDate } from "../../../src/utils/formatDate";
import bcrypt from "bcrypt";
import { valdatePassword, validateEmail } from "../../../src/utils/valid";
import { createAdminToken } from "../../../src/utils/generateToken";

export const userCtrl = {
  getUserData: async (req: Request, res: Response) => {
    try {
      let chartStartDate = new Date();
      let chartEndDate = new Date();

      const users = await prisma.user.findMany({
        select: { created_at: true },
        orderBy: { created_at: "asc" },
      });

      interface ChartDataUser {
        id: number;
        label: string;
        count: number;
      }

      let chartDataUsers: ChartDataUser[] = [];

      if (users.length > 0) {
        const userData = users.sort((a, b) =>
          new Date(a.created_at) < new Date(b.created_at) ? -1 : 1
        );

        if (chartStartDate > new Date(userData[0].created_at)) {
          chartStartDate = new Date(userData[0].created_at);
        }

        if (chartEndDate < new Date(userData[userData.length - 1].created_at)) {
          chartEndDate = new Date(userData[userData.length - 1].created_at);
        }

        let count = 0;

        for (const view of userData) {
          const date = new Date(view.created_at);
          const label = formatDate(date);

          count++;

          if (chartDataUsers.some((d) => d.label === label)) {
            chartDataUsers = chartDataUsers.map((item) => {
              if (item.label === label) {
                return {
                  ...item,
                  count: count,
                };
              }

              return item;
            });
          } else {
            chartDataUsers = [
              ...chartDataUsers,
              {
                id: chartDataUsers.length,
                label,
                count: count,
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

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Users",
            data: chartDataUsers.map((data) => data.count),
            borderColor: "#EB3355",
            backgroundColor: "#EB3355",
            borderWidth: 2,
          },
        ],
      };

      res.json({
        msg: "Joined newsletter",
        chartData,
        count: users.length,
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
        return res.status(400).json({ err: "Invalid password" });
      }

      const user = await prisma.user.findFirst({
        where: { email: email },
      });
      if (!user || !user.password) {
        return res
          .status(400)
          .json({ err: "A user with this email does not exist" });
      }

      if (user.role < 3) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ err: "Incorrect password" });
      }

      const refresh_token = createAdminToken({
        id: user.id.toString(),
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

      res.status(200).json({
        msg: "Logged in",
        token: refresh_token,
        user: user,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getUserInfo: async (req: Request, res: Response) => {
    try {
      if (!req.user_id) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      const user = await prisma.user.findFirst({
        where: { id: req.user_id },
      });
      if (!user) {
        return res.status(400).json({ err: "Unauthorized" });
      }

      res.json({
        msg: "Logged in",
        user: user,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
