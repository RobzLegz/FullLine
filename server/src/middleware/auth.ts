import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ err: "Invalid authorization" });
    }

    const access_token_secret = process.env.REFRESH_TOKEN_SECRET;
    if (!access_token_secret) {
      return res.status(500).json({ err: "Something went wrong" });
    }

    const decoded: any = jwt.verify(token, access_token_secret, {
      ignoreExpiration: true,
    });
    if (!decoded || !decoded.id) {
      return res.status(400).json({ err: "Invalid authorization" });
    }

    req.user_id = decoded.id;
    next();
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ err: "Unauthorized" });
    }

    const access_token_secret = process.env.ADMIN_TOKEN_SECRET;
    if (!access_token_secret) {
      return res.status(500).json({ err: "Something went wrong" });
    }

    const decoded: any = jwt.verify(token, access_token_secret, {
      ignoreExpiration: true,
    });
    if (!decoded || !decoded.id) {
      return res.status(400).json({ err: "Unauthorized" });
    }

    const user = await prisma.user.findFirst({ where: { id: decoded.id } });
    if (!user || user.role < 2) {
      return res.status(400).json({ err: "Unauthorized" });
    }

    req.user_id = decoded.id;
    next();
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

export const authPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ err: "Invalid authorization" });
    }

    const access_token_secret = process.env.ORGANIZER_TOKEN_SECRET;
    if (!access_token_secret) {
      return res.status(500).json({ err: "Something went wrong" });
    }

    const decoded: any = jwt.verify(token, access_token_secret, {
      ignoreExpiration: true,
    });
    if (!decoded || !decoded.id) {
      res.clearCookie("token");
      return res.status(400).json({ err: "Invalid authorization" });
    }

    req.partner_id = decoded.id;

    next();
  } catch (err: any) {
    res.clearCookie("token");
    res.status(500).json({ err: err.message });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      req.user_id = "63ff8f157d98f955b6996db7";
      return next();
    }

    const access_token_secret = process.env.REFRESH_TOKEN_SECRET;
    if (!access_token_secret) {
      req.user_id = "63ff8f157d98f955b6996db7";
      return next();
    }

    const decoded: any = jwt.verify(token, access_token_secret, {
      ignoreExpiration: true,
    });
    if (!decoded || !decoded.id) {
      req.user_id = "63ff8f157d98f955b6996db7";
      return next();
    }

    req.user_id = decoded.id;
    next();
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};

export const developerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { apiKey } = req.query;
    if (apiKey !== "Artura_API_atslega") {
      return res.status(400).json({ err: "Invalid authorization" });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};
