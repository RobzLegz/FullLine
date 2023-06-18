import mcache from "memory-cache";
import { NextFunction, Request } from "express";

export const cache = (duration: number) => {
  return (req: Request, res: any, next: NextFunction) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res["sendResponse"] = res.send;
      res.send = (body: any) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
