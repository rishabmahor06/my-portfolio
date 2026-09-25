import { NextResponse } from "next/server";
import { profile } from "@/lib/data";
import {
  createTransport,
  enquiryHtml,
  enquiryText,
  type Enquiry,
} from "@/lib/mail";

export const runtime = "nodejs";

// Best-effort in-memory limiter: 5 messages / 10 min per IP.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  const enquiry: Enquiry = {
    name: clean(body.name, 100),
    email: clean(body.email, 150),
    phone: clean(body.phone, 30),
    message:
      typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "",
  };

  if (enquiry.name.length < 2)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL.test(enquiry.email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (enquiry.message.length < 5)
    return NextResponse.json({ error: "Please write a short message." }, { status: 400 });

  try {
    const transport = createTransport();
    const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
    await transport.sendMail({
      from: `"${profile.name} — Portfolio" <${process.env.SMTP_USER}>`,
      to,
      replyTo: `"${enquiry.name}" <${enquiry.email}>`,
      subject: `New enquiry from ${enquiry.name}`,
      text: enquiryText(enquiry),
      html: enquiryHtml(enquiry, profile.name),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send your message right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
