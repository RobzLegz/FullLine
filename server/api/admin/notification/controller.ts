import { Expo } from "expo-server-sdk";
import { Request, Response } from "express";
import prisma from "../../../src/lib/prisma";

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export const notificationCtrl = {
  sendNotification: async (req: Request, res: Response) => {
    const {
      city,
      country,
      title,
      body,
      data,
    }: {
      city?: string;
      country?: string;
      title: string;
      body: string;
      data?: object;
    } = req.body;

    let where: any = {
      push_notification_token: {
        isSet: true,
      },
    };

    if (city) {
      where["cityId"] = city;
    }

    if (country) {
      where["countryId"] = country;
    }

    const users = await prisma.user.findMany({
      where,
      select: { id: true, push_notification_token: true },
    });

    let messages: {
      to: string;
      sound: "default";
      body: string;
      title: string;
      data?: object;
    }[] = [];

    for (const user of users) {
      const pushToken = user.push_notification_token;

      if (!pushToken) {
        continue;
      }

      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      const message: {
        to: string;
        sound: "default";
        body: string;
        title: string;
        data?: object;
      } = {
        to: pushToken,
        sound: "default",
        body: body,
        title: title,
        data: data,
      };

      messages.push(message);
    }

    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(messages);
    let tickets: any[] = [];
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
    })();

    // Later, after the Expo push notification service has delivered the
    // notifications to Apple or Google (usually quickly, but allow the the service
    // up to 30 minutes when under load), a "receipt" for each notification is
    // created. The receipts will be available for at least a day; stale receipts
    // are deleted.
    //
    // The ID of each receipt is sent back in the response "ticket" for each
    // notification. In summary, sending a notification produces a ticket, which
    // contains a receipt ID you later use to get the receipt.
    //
    // The receipts may contain error codes to which you must respond. In
    // particular, Apple or Google may block apps that continue to send
    // notifications to devices that have blocked notifications or have uninstalled
    // your app. Expo does not control this policy and sends back the feedback from
    // Apple and Google so you can handle it appropriately.
    let receiptIds = [];
    for (const ticket of tickets) {
      // NOTE: Not all tickets have IDs; for example, tickets for notifications
      // that could not be enqueued will have error information and no receipt ID.
      if (ticket.id) {
        receiptIds.push(ticket.id);
      }
    }

    const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
    (async () => {
      // Like sending notifications, there are different strategies you could use
      // to retrieve batches of receipts from the Expo service.
      for (const chunk of receiptIdChunks) {
        try {
          const receipts: any = await expo.getPushNotificationReceiptsAsync(
            chunk
          );
          console.log(receipts);

          // The receipts specify whether Apple or Google successfully received the
          // notification and information about an error, if one occurred.
          for (const receiptId in receipts) {
            const { status, message, details } = receipts[receiptId];
            if (status === "ok") {
              continue;
            } else if (status === "error") {
              console.error(
                `There was an error sending a notification: ${message}`
              );
              if (details && details.error) {
                // The error codes are listed in the Expo documentation:
                // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                // You must handle the errors appropriately.
                console.error(`The error code is ${details.error}`);
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return res.json({ msg: "Messages sent" });
  },
};
