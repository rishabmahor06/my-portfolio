"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { experience } from "@/lib/data";
import { EASE, SectionHeader } from "./ui";

type Job = (typeof experience)[number];

function TimelineItem({ e }: { e: Job }) {
  return (
    <div className="relative">
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
        className={`absolute top-[6px] -left-[30px] h-4 w-4 rounded-full border-4 border-bg sm:-left-[50px] [translate:-2px_0] ${
          e.current ? "bg-ink" : "bg-muted"
        }`}
      />

      {/* liquid entrance: slides in with a springy overshoot while un-blurring */}
      <motion.div
        initial={{ opacity: 0, x: 70, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ type: "spring", stiffness: 70, damping: 15, mass: 0.9 }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="border border-line/40 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.2)] sm:p-8"
        >
          <div className="flex flex-col gap-3 border-b border-line/20 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
                {e.period}
              </p>
              <h3 className="h3 mt-1">{e.role}</h3>
            </div>
            <span className="mono-btn self-start border border-line/30 bg-surface px-3 py-1 normal-case">
              {e.company}
            </span>
          </div>
          <ul className="mt-4 flex flex-col gap-2.5">
            {e.bullets.map((b, n) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 16,
                  delay: 0.15 + n * 0.07,
                }}
                className="flex gap-3 text-base leading-6 text-body"
              >
                <span className="mt-[2px] font-mono text-muted">–</span>
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const reduce = useReducedMotion();

  // Whole column leans a touch with page-scroll speed: a soft liquid wobble.
  const { scrollY } = useScroll();
  const pageSpeed = useSpring(useVelocity(scrollY), {
    stiffness: 120,
    damping: 30,
  });
  const skew = useTransform(pageSpeed, [-2500, 0, 2500], [-2, 0, 2], {
    clamp: true,
  });

  return (
    <section
      id="experience"
      className="mx-auto max-w-[1280px] overflow-x-clip px-5 py-16 md:px-12 md:py-24"
    >
      <SectionHeader
        label="[ 04 / Professional Journey ]"
        title="Work Experience"
      />
      <div className="relative ml-2 mt-10 md:mt-12 md:ml-4">
        <span className="absolute bottom-0 left-0 top-0 w-px bg-line/40" />

        <motion.div
          style={{ skewY: reduce ? 0 : skew }}
          className="flex flex-col gap-8 pl-6 sm:pl-10"
        >
          {experience.map((e) => (
            <TimelineItem key={e.role} e={e} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
