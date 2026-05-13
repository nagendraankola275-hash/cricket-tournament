import { NextRequest, NextResponse } from "next/server";
import {
  getGoogleAccessToken,
  getPushTokens,
  sendPushNotification,
} from "@/lib/serverPush";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Naags@3570";

export async function POST(request: NextRequest) {
  try {
    const { password, title, body, link } = (await request.json()) as {
      password?: string;
      title?: string;
      body?: string;
      link?: string;
    };

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body are required." },
        { status: 400 }
      );
    }

    const accessToken = await getGoogleAccessToken();
    const tokens = await getPushTokens(accessToken);

    if (!tokens.length) {
      return NextResponse.json({
        ok: true,
        sent: 0,
        message: "No subscribed devices found.",
      });
    }

    const targetLink = link?.trim() || "https://bpl2026.in/";
    const settled = await Promise.allSettled(
      tokens.map((token) =>
        sendPushNotification({
          accessToken,
          token,
          title,
          body,
          link: targetLink,
        })
      )
    );

    const sent = settled.filter((result) => result.status === "fulfilled").length;
    const failed = settled.length - sent;

    return NextResponse.json({
      ok: true,
      sent,
      failed,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send notification.",
      },
      { status: 500 }
    );
  }
}
