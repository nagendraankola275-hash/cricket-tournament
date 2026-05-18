import { NextRequest, NextResponse } from "next/server";
import {
  getGoogleAccessToken,
  getPlayerPhoneNumbers,
  sendMsg91Sms,
} from "@/lib/serverMsg91";

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

    await sendMsg91Sms({
      phoneNumbers,
      title: title.trim(),
      body: body.trim(),
      link: targetLink,
    });

    return NextResponse.json({
      ok: true,
      sent: phoneNumbers.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send MSG91 SMS notification.",
      },
      { status: 500 }
    );
  }
}
