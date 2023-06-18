import { Request, Response } from "express";
import sendMail from "../../../src/utils/sendMail";

export const contactCtrl = {
  contact: async (req: Request, res: Response) => {
    try {
      const {
        email,
        content,
        name,
        phone,
      }: {
        email?: string;
        content?: string;
        phone?: string;
        name?: string;
      } = req.body;

      if (!email) {
        return res.status(400).json({ err: "Nprādiet savu epastu" });
      }

      const mailSent = await sendMail({
        receiver: "robzlegz@gmail.com",
        subject: `${name} - Spotloc`,
        text: `${content}\n\n- ${name}\n- ${email}\n- ${phone}`,
      });

      res.status(201).json({
        msg: mailSent ? "Mail sent" : "Mail not sent",
        sent: mailSent,
      });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
