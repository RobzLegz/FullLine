import sgMail from "@sendgrid/mail";
import { validateEmail } from "./valid";

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const senderEmail = process.env.SENDER_EMAIL;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

const sendMail = async ({
  subject,
  text,
  html,
  receiver,
}: {
  subject?: string;
  text: string;
  html?: string;
  receiver?: string;
}) => {
  if (
    !subject ||
    !sendgridApiKey ||
    !senderEmail ||
    !receiver ||
    !text ||
    !validateEmail(receiver)
  ) {
    return false;
  }

  const msg = {
    to: receiver,
    from: senderEmail,
    subject: subject,
    text: text,
    html,
  };

  const sendRes = await sgMail.send(msg);

  const statusCode = sendRes[0].statusCode;

  if (statusCode === 202) {
    return true;
  }

  return false;
};

export default sendMail;
