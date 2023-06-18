import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const activate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ err: "sesija beigusies" });
    }

    const activation_token_secret = process.env.ACTIVATION_TOKEN_SECRET;
    if (!activation_token_secret) {
      return res.status(500).json({ err: "Something went wrong" });
    }

    const decoded: any = jwt.verify(token, activation_token_secret);
    if (!decoded) {
      return res.status(400).json({ err: "sesija beigusies" });
    }

    req.user_id = decoded.id;
    next();
  } catch (err: any) {
    res.status(500).json({ err: err.message });
  }
};
