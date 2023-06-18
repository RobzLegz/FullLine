import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export const logoutCtrl = {
  logout: async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req, res);

    cookies.set("token", "", {
      maxAge: 0,
      httpOnly: false,
      path: "/",
    });

    res.json({ msg: "Logged out" });
  },
};
