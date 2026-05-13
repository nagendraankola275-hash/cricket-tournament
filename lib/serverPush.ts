import crypto from "node:crypto";

const FIREBASE_PROJECT_ID =
  process.env.FIREBASE_PROJECT_ID || "cricket-tournament-6a617";
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

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
    scope: [
      "https://www.googleapis.com/auth/firebase.messaging",
      "https://www.googleapis.com/auth/datastore",
    ].join(" "),
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

export const getPushTokens = async (accessToken: string) => {
  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/pushTokens`,
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

    throw new Error(`Unable to load push tokens (${response.status}).`);
  }

  const data = (await response.json()) as {
    documents?: Array<{
      fields?: {
        token?: { stringValue?: string };
      };
    }>;
  };

  return (data.documents || [])
    .map((document) => document.fields?.token?.stringValue)
    .filter((token): token is string => Boolean(token));
};

export const sendPushNotification = async ({
  accessToken,
  token,
  title,
  body,
  link,
}: {
  accessToken: string;
  token: string;
  title: string;
  body: string;
  link: string;
}) => {
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          token,
          notification: {
            title,
            body,
          },
          data: {
            link,
          },
          webpush: {
            fcm_options: {
              link,
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FCM send failed (${response.status}): ${errorText}`);
  }
};
