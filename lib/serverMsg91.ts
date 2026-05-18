import crypto from "node:crypto";

const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || "cricket-tournament-6a617";
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_FLOW_ID = process.env.MSG91_FLOW_ID;
const MSG91_SENDER_ID = process.env.MSG91_SENDER_ID;
const MSG91_ROUTE = process.env.MSG91_ROUTE || "4";
const MSG91_COUNTRY = process.env.MSG91_COUNTRY || "91";

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

const normalizePhoneNumber = (value: string) =>
  value.replace(/[^\d]/g, "").replace(/^0+/, "");

const formatMsg91Mobile = (value: string) => {
  const normalized = normalizePhoneNumber(value);

  if (!normalized) {
    return "";
  }

  if (normalized.startsWith(MSG91_COUNTRY)) {
    return normalized;
  }

  return `${MSG91_COUNTRY}${normalized}`;
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
        .map(normalizePhoneNumber)
        .filter(Boolean)
    )
  );
};

const assertMsg91Config = () => {
  if (!MSG91_AUTH_KEY) {
    throw new Error("Missing MSG91_AUTH_KEY.");
  }

  if (!MSG91_FLOW_ID && !MSG91_SENDER_ID) {
    throw new Error("Missing MSG91_FLOW_ID or MSG91_SENDER_ID.");
  }
};

export const sendMsg91Sms = async ({
  phoneNumbers,
  title,
  body,
  link,
}: {
  phoneNumbers: string[];
  title: string;
  body: string;
  link: string;
}) => {
  assertMsg91Config();

  if (!phoneNumbers.length) {
    return;
  }

  if (MSG91_FLOW_ID) {
    const response = await fetch("https://api.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: {
        authkey: MSG91_AUTH_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flow_id: MSG91_FLOW_ID,
        recipients: phoneNumbers.map((mobile) => ({
          mobiles: formatMsg91Mobile(mobile),
          title,
          body,
          link,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MSG91 flow send failed (${response.status}): ${errorText}`);
    }

    return;
  }

  const response = await fetch("https://api.msg91.com/api/v2/sendsms", {
    method: "POST",
    headers: {
      authkey: MSG91_AUTH_KEY as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: MSG91_SENDER_ID,
      route: MSG91_ROUTE,
      country: MSG91_COUNTRY,
      sms: [
        {
          message: [title, body, link].filter(Boolean).join("\n\n"),
          to: phoneNumbers.map(formatMsg91Mobile),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MSG91 SMS send failed (${response.status}): ${errorText}`);
  }
};
