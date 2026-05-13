import { NextRequest, NextResponse } from "next/server";
import {
  getGoogleAccessToken,
  getPlayerPhoneNumbers,
  sendSmsMessage,
} from "@/lib/serverSms";

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
    const phoneNumbers = await getPlayerPhoneNumbers(accessToken);

    if (!phoneNumbers.length) {
      return NextResponse.json({
        ok: true,
        sent: 0,
        message: "No player phone numbers found.",
      });
    }

    const targetLink = link?.trim() || "https://bpl2026.in/";
    const messageBody = [title.trim(), body.trim(), targetLink]
      .filter(Boolean)
      .join("\n\n");
    const settled = await Promise.allSettled(
      phoneNumbers.map((phoneNumber) =>
        sendSmsMessage({
          to: phoneNumber,
          body: messageBody,
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
            : "Unable to send SMS notification.",
      },
      { status: 500 }
    );
  }
}
