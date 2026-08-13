import { NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org";
const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

const PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_TYPES = new Set([
  ...PHOTO_TYPES,
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);
const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|heic|heif)$/i;

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatVehicle(make: string, model: string, year: string) {
  const parts = [year, make, model].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Not specified";
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return typeof File !== "undefined" && value instanceof File && value.size > 0;
}

function isAllowedImage(file: File) {
  const type = file.type.toLowerCase();
  return ALLOWED_TYPES.has(type) || ALLOWED_EXT.test(file.name);
}

function isTelegramPhoto(file: File) {
  const type = file.type.toLowerCase();
  return PHOTO_TYPES.has(type) || /\.(jpe?g|png|webp|gif)$/i.test(file.name);
}

function chunk<T>(items: T[], size: number) {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

async function telegramForm(token: string, method: string, body: FormData) {
  const res = await fetch(`${TELEGRAM_API}/bot${token}/${method}`, {
    method: "POST",
    body,
  });

  if (!res.ok) {
    throw new Error(`Telegram ${method} failed`);
  }
}

async function sendPhotos(token: string, chatId: string, files: File[]) {
  const photos = files.filter(isTelegramPhoto);
  const documents = files.filter((file) => !isTelegramPhoto(file));

  for (const group of chunk(photos, 10)) {
    const body = new FormData();
    body.append("chat_id", chatId);

    if (group.length === 1) {
      body.append("photo", group[0], group[0].name);
      await telegramForm(token, "sendPhoto", body);
      continue;
    }

    body.append(
      "media",
      JSON.stringify(
        group.map((file, index) => ({
          type: "photo",
          media: `attach://photo_${index}`,
        })),
      ),
    );

    group.forEach((file, index) => {
      body.append(`photo_${index}`, file, file.name);
    });

    await telegramForm(token, "sendMediaGroup", body);
  }

  for (const file of documents) {
    const body = new FormData();
    body.append("chat_id", chatId);
    body.append("document", file, file.name);
    await telegramForm(token, "sendDocument", body);
  }
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram is not configured." },
      { status: 500 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = asString(formData.get("firstName"));
  const lastName = asString(formData.get("lastName"));
  const phone = asString(formData.get("phone"));
  const email = asString(formData.get("email"));
  const make = asString(formData.get("make"));
  const model = asString(formData.get("model"));
  const year = asString(formData.get("year"));
  const photos = formData.getAll("photos").filter(isUploadFile);

  if (!firstName || !lastName || !phone || !email) {
    return NextResponse.json(
      { error: "Please fill in name, phone, and email." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (photos.length > MAX_PHOTOS) {
    return NextResponse.json(
      { error: `Please attach up to ${MAX_PHOTOS} photos.` },
      { status: 400 },
    );
  }

  if (photos.some((file) => !isAllowedImage(file) || file.size > MAX_PHOTO_BYTES)) {
    return NextResponse.json(
      { error: "Please upload JPG, PNG, WEBP, GIF, or HEIC images up to 8MB each." },
      { status: 400 },
    );
  }

  const message = [
    "<b>New Estimate Request</b>",
    "",
    `<b>Name:</b> ${escapeHtml(`${firstName} ${lastName}`)}`,
    `<b>Phone:</b> ${escapeHtml(phone)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Vehicle:</b> ${escapeHtml(formatVehicle(make, model, year))}`,
    photos.length > 0 ? `<b>Photos:</b> ${photos.length}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const telegramRes = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!telegramRes.ok) {
    return NextResponse.json(
      { error: "Could not send the request. Please try again." },
      { status: 502 },
    );
  }

  try {
    if (photos.length > 0) {
      await sendPhotos(token, chatId, photos);
    }
  } catch {
    return NextResponse.json(
      { error: "Request sent, but photos could not be delivered. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
