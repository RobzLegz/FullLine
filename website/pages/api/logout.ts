import { NextApiRequest, NextApiResponse } from "next";
import { logoutCtrl } from "../../src/controllers/logoutController";

const { logout } = logoutCtrl;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      await logout(req, res);
      break;
  }
};
