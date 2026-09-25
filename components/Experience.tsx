"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { EASE, Reveal, SectionHeader } from "./ui";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-24"
    >
      <SectionHeader
        label="[ 04 / Professional Journey ]"
        title="Work Experience"
        description="Track record of shipping production-grade platforms and AI automation systems."
      />
      <div className="relative ml-2 mt-10 flex flex-col gap-8 pl-6 sm:pl-10 md:mt-12 md:ml-4">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-line/40"
        />
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.1} className="relative">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 18 }}
              className={`absolute top-[6px] -left-[30px] h-4 w-4 rounded-full border-4 border-bg sm:-left-[50px] ${
                e.current ? "bg-ink" : "bg-muted"
              }`}
              style={{ translate: "-2px 0" }}
            />
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
                {e.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-base leading-6 text-body"
                  >
                    <span className="mt-[2px] font-mono text-muted">–</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
