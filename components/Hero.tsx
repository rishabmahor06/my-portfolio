"use client";

import { motion } from "framer-motion";
import { heroStats, profile, socials } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import SocialIcon from "./SocialIcon";
import { Button, EASE } from "./ui";
import ProfilePhoto from "./ProfilePhoto";
import RotatingText from "./RotatingText";

const item = (i: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.09 },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mx-auto max-w-[1280px] px-5 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40"
    >
      {/* desktop only: photo sits on the right, above the social icons (hidden on tablet and mobile) */}
      <ProfilePhoto
        size={340}
        className="absolute right-12 top-[15rem] hidden w-[340px] xl:block"
      />

      <motion.div
        {...item(0)}
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-line/40 bg-surface-2 px-3 py-1"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
        </span>
        <span className="font-mono text-[11px] leading-4 tracking-[0.04em] text-ink-2 sm:text-xs">
          {profile.badge}
        </span>
      </motion.div>

      <motion.h1
        {...item(1)}
        className="mt-8 max-w-[896px] font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-[56px]"
      >
        Hi There, I&apos;m <br /> {profile.name}
      </motion.h1>

      <motion.div {...item(2)} className="mt-6">
        <RotatingText prefix={profile.rolePrefix} words={profile.rotatingRoles} />
      </motion.div>

      <motion.p
        {...item(3)}
        className="mt-6 max-w-[768px] text-base leading-7 tracking-[-0.005em] text-body md:text-lg"
      >
        {profile.intro}
      </motion.p>

      <motion.div
        {...item(4)}
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 border border-line/30 bg-surface p-5 sm:p-6 lg:inline-grid lg:grid-cols-2 lg:gap-x-4"
      >
        {heroStats.map((s) => (
          <div key={s.label} className="min-w-0 lg:min-w-[168px]">
            <p className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
              [ {s.label} ]
            </p>
            <p className="mt-[3px] text-base font-semibold leading-7 tracking-[-0.01em] sm:text-xl">
              {s.value}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        {...item(5)}
        className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6"
      >
        <Button arrow onClick={() => scrollToId("projects")}>
          Explore flagship work
        </Button>
        <Button variant="outline" onClick={() => scrollToId("contact")}>
          Contact me
        </Button>
        <div className="flex gap-4 sm:ml-auto">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="flex h-10 w-10 items-center justify-center border border-line/50 text-ink-2 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
            >
              <SocialIcon name={s.icon} className="h-4 w-4" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
