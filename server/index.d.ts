export {};

declare global {
  namespace Express {
    interface Request {
      user_id?: string;
      partner_id?: string;
    }
  }
}
