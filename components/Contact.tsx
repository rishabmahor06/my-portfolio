"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { profile, socials } from "@/lib/data";
import SocialIcon from "./SocialIcon";
import { EnvelopeIcon, PhoneIcon, PinIcon, SendIcon } from "./icons";
import { EASE, Reveal, StairText } from "./ui";

const fieldCls =
  "w-full border border-line/40 bg-bg px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/60 focus:border-ink focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="mono-btn text-ink">{label}</span>
      {children}
    </label>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,465px)_minmax(0,1fr)] lg:gap-12"
    >
      <div className="flex flex-col gap-6">
        <Reveal>
          <p className="label">[ 06 / Direct Connection ]</p>
          <h2 className="h2 mt-6">Get in Touch</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-base leading-6 text-body">
            Thank you for visiting my personal portfolio website. Connect with
            me over socials or drop a direct message for full stack roles,
            freelance engineering, or consulting.
          </p>
        </Reveal>
        <Reveal delay={0.16} className="flex flex-col gap-4 pt-4">
          {[
            { Icon: PhoneIcon, text: profile.phone, href: `tel:${profile.phone.replace(/\s|-/g, "")}` },
            { Icon: EnvelopeIcon, text: profile.email, href: `mailto:${profile.email}` },
            { Icon: PinIcon, text: profile.address, href: undefined },
          ].map(({ Icon, text, href }) => (
            <div key={text} className="group flex items-center gap-4">
              <span className="flex w-5 justify-center text-ink transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </span>
              {href ? (
                <a
                  href={href}
                  className="mono-btn break-all normal-case underline-offset-4 hover:underline"
                >
                  {text}
                </a>
              ) : (
                <span className="mono-btn normal-case">{text}</span>
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="flex h-10 w-10 items-center justify-center border border-line/50 text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-white"
              >
                <SocialIcon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <form
          onSubmit={onSubmit}
          className="relative flex flex-col gap-6 border border-line/40 bg-white p-6 sm:p-8"
        >
          {/* honeypot — hidden from people, bots fill it */}
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <Field label="Your name">
            <input name="name" required className={fieldCls} autoComplete="name" />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Email address">
              <input
                name="email"
                type="email"
                required
                className={fieldCls}
                autoComplete="email"
              />
            </Field>
            <Field label="Phone number">
              <input name="phone" type="tel" className={fieldCls} autoComplete="tel" />
            </Field>
          </div>
          <Field label="Message">
            <textarea
              name="message"
              required
              rows={5}
              className={`${fieldCls} resize-none`}
            />
          </Field>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileTap={{ scale: 0.98 }}
            className="mono-btn group group/stair relative flex h-12 items-center justify-center gap-2 overflow-hidden bg-ink text-white transition-colors duration-300 hover:bg-ink-2 disabled:cursor-wait disabled:opacity-80"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status === "error" ? "idle" : status}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex items-center gap-2"
              >
                {status === "sent" ? (
                  "Message sent ✓"
                ) : status === "sending" ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending…
                  </>
                ) : (
                  <>
                    <StairText>Send message</StairText>
                    <SendIcon className="h-[9px] w-[11px] transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <p
            role="status"
            aria-live="polite"
            className={`-mt-2 min-h-5 font-mono text-xs leading-5 tracking-[0.03em] ${
              status === "error" ? "text-red-700" : "text-live"
            }`}
          >
            {status === "error" && error}
            {status === "sent" &&
              "Thanks! Your message has reached me — I'll reply soon."}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
