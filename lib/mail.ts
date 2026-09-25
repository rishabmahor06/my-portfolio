import nodemailer from "nodemailer";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function createTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
  if (!user || !pass) throw new Error("SMTP credentials are not configured");
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const MONO = "'Courier New', Courier, monospace";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Branded HTML email (table layout + inline styles for mail-client support). */
export function enquiryHtml(e: Enquiry, owner: string) {
  const name = escapeHtml(e.name);
  const email = escapeHtml(e.email);
  const phone = e.phone ? escapeHtml(e.phone) : "—";
  const message = escapeHtml(e.message).replace(/\n/g, "<br>");
  const when = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
  const initial = escapeHtml(e.name.trim().charAt(0).toUpperCase() || "?");

  const row = (label: string, value: string, last = false) => `
    <tr>
      <td style="padding:14px 0;${last ? "" : "border-bottom:1px solid #ece9e3;"}font-family:${MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#77767b;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:14px 0;${last ? "" : "border-bottom:1px solid #ece9e3;"}font-family:${SANS};font-size:15px;color:#000;vertical-align:top;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>New portfolio enquiry</title>
</head>
<body style="margin:0;padding:0;background:#fcf9f4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${name} sent you a message from your portfolio.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fcf9f4;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

        <!-- brand -->
        <tr>
          <td style="padding:0 0 20px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="width:12px;height:12px;background:#000;font-size:0;line-height:0;">&nbsp;</td>
              <td style="padding-left:10px;font-family:${SANS};font-size:16px;font-weight:700;letter-spacing:-0.02em;text-transform:uppercase;color:#000;">${escapeHtml(owner)}</td>
            </tr></table>
          </td>
        </tr>

        <!-- card -->
        <tr>
          <td style="background:#ffffff;border:1px solid #dcd9d3;">

            <!-- hero band -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000;">
              <tr>
                <td style="padding:32px 32px 28px 32px;">
                  <div style="font-family:${MONO};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a9a7ab;">[ New enquiry ]</div>
                  <div style="font-family:${SANS};font-size:28px;line-height:1.2;font-weight:600;letter-spacing:-0.02em;color:#fff;padding-top:10px;">You have a new message</div>
                  <div style="font-family:${MONO};font-size:11px;letter-spacing:0.06em;color:#a9a7ab;padding-top:10px;">${when} IST</div>
                </td>
              </tr>
            </table>

            <!-- sender -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 32px 8px 32px;">
                  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                    <td style="width:48px;height:48px;background:#f6f3ee;border:1px solid #dcd9d3;text-align:center;font-family:${SANS};font-size:20px;font-weight:700;color:#000;">${initial}</td>
                    <td style="padding-left:14px;">
                      <div style="font-family:${SANS};font-size:18px;font-weight:600;letter-spacing:-0.01em;color:#000;">${name}</div>
                      <div style="font-family:${MONO};font-size:12px;color:#47464a;padding-top:2px;"><a href="mailto:${email}" style="color:#47464a;text-decoration:none;">${email}</a></div>
                    </td>
                  </tr></table>
                </td>
              </tr>
            </table>

            <!-- details -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 32px 0 32px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${row("Name", name)}
                    ${row("Email", `<a href="mailto:${email}" style="color:#000;text-decoration:underline;">${email}</a>`)}
                    ${row("Phone", phone, true)}
                  </table>
                </td>
              </tr>
            </table>

            <!-- message -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:24px 32px 8px 32px;">
                  <div style="font-family:${MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#77767b;padding-bottom:10px;">Message</div>
                  <div style="background:#f6f3ee;border-left:3px solid #000;padding:18px 20px;font-family:${SANS};font-size:15px;line-height:1.65;color:#1b1c19;">${message}</div>
                </td>
              </tr>
            </table>

            <!-- cta -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:24px 32px 36px 32px;">
                  <a href="mailto:${email}?subject=${encodeURIComponent("Re: your message on my portfolio")}" style="display:inline-block;background:#000;color:#fff;font-family:${MONO};font-size:12px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;padding:14px 26px;">Reply to ${name.split(" ")[0]} &rarr;</a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- footer -->
        <tr>
          <td style="padding:20px 4px 0 4px;font-family:${MONO};font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:#77767b;line-height:1.7;">
            Sent from your portfolio contact form.<br>
            Just hit reply &mdash; your answer goes straight to ${email}.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export function enquiryText(e: Enquiry) {
  return [
    "NEW PORTFOLIO ENQUIRY",
    "",
    `Name:  ${e.name}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || "—"}`,
    "",
    "Message:",
    e.message,
    "",
    "Reply to this email to answer directly.",
  ].join("\n");
}
