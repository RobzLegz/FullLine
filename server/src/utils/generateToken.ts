import jwt from "jsonwebtoken";

export const createAccessToken = (payload: any) => {
  if (process.env.ACCESS_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  }
};

export const createRefreshToken = (payload: any) => {
  if (process.env.REFRESH_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  }
};

export const createPartnerToken = (payload: any) => {
  if (process.env.ORGANIZER_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ORGANIZER_TOKEN_SECRET);
  }
};

export const createAdminToken = (payload: any) => {
  if (process.env.ADMIN_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ADMIN_TOKEN_SECRET);
  }
};

export const createActivationToken = (payload: any) => {
  if (process.env.ACTIVATION_TOKEN_SECRET) {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET);
  }
  return null;
};

export const createPasswordResetToken = (payload: any) => {
  if (process.env.PASSWORD_RESET_SECRET) {
    return jwt.sign(payload, process.env.PASSWORD_RESET_SECRET);
  }
  return null;
};
