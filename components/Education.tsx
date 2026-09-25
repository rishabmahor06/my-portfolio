"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { EASE, Reveal } from "./ui";

export default function Education() {
  return (
    <section
      id="education"
      className="border-y border-line/30 bg-surface py-14"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <Reveal>
          <p className="label">[ 05 / Academic Foundation ]</p>
          <h2 className="h2 mt-2">Education</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex h-full flex-col gap-4 border border-line/40 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.2)] sm:p-8"
              >
                <p className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
                  {e.period}
                </p>
                <h3 className="h3 -mt-1">{e.title}</h3>
                <p className="-mt-2 text-base leading-6 text-sub">{e.school}</p>
                {e.desc && (
                  <p className="border-t border-line/20 pt-2 text-base leading-6 text-body">
                    {e.desc}
                  </p>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
