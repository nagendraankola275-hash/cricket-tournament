import crypto from "node:crypto";

const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || "cricket-tournament-6a617";
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);
const SMS_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const SMS_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const SMS_FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const SMS_DEFAULT_COUNTRY_CODE =
  process.env.SMS_DEFAULT_COUNTRY_CODE || "+91";

const base64UrlEncode = (input: string | Buffer) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const createSignedJwt = () => {
  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: FIREBASE_CLIENT_EMAIL,
    sub: FIREBASE_CLIENT_EMAIL,
    aud: "https://oauth2.googleapis.com/token",
    scope: "https://www.googleapis.com/auth/datastore",
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(FIREBASE_PRIVATE_KEY);
  return `${unsignedToken}.${base64UrlEncode(signature)}`;
};

export const getGoogleAccessToken = async () => {
  const assertion = createSignedJwt();
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Unable to fetch Google access token (${response.status}).`);
  }

  const data = (await response.json()) as { access_token: string };
  return data.access_token;
};

const normalizePhoneNumber = (value: string) => value.replace(/[^\d+]/g, "");

const formatPhoneNumber = (value: string) => {
  const cleaned = normalizePhoneNumber(value);

  if (!cleaned) {
    return null;
  }

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  if (cleaned.startsWith("00")) {
    return `+${cleaned.slice(2)}`;
  }

  if (cleaned.length === 10) {
    return `${SMS_DEFAULT_COUNTRY_CODE}${cleaned}`;
  }

  return cleaned.startsWith("91") && cleaned.length === 12
    ? `+${cleaned}`
    : `${SMS_DEFAULT_COUNTRY_CODE}${cleaned}`;
};

export const getPlayerPhoneNumbers = async (accessToken: string) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/players`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }

    throw new Error(`Unable to load player phone numbers (${response.status}).`);
  }

  const data = (await response.json()) as {
    documents?: Array<{
      fields?: {
        phone?: { stringValue?: string };
      };
    }>;
  };

  return Array.from(
    new Set(
      (data.documents || [])
        .map((document) => document.fields?.phone?.stringValue || "")
        .map(formatPhoneNumber)
        .filter((phone): phone is string => Boolean(phone))
    )
  );
};

export const sendSmsMessage = async ({
  to,
  body,
}: {
  to: string;
  body: string;
}) => {
  if (!SMS_ACCOUNT_SID || !SMS_AUTH_TOKEN || !SMS_FROM_NUMBER) {
    throw new Error(
      "Missing TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER."
    );
  }

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${SMS_ACCOUNT_SID}/Messages.json`;
  const credentials = Buffer.from(
    `${SMS_ACCOUNT_SID}:${SMS_AUTH_TOKEN}`
  ).toString("base64");
  const payload = new URLSearchParams({
    To: to,
    From: SMS_FROM_NUMBER,
    Body: body,
  });

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SMS send failed (${response.status}): ${errorText}`);
  }
};
