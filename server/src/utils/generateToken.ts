import jwt from "jsonwebtoken";

export const createRefreshToken = (payload: any) => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  }
};
