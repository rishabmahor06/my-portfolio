"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "@/lib/data";
import { LiveArrowIcon, SourceIcon } from "./icons";
import { Chip, EASE, Reveal, SectionHeader, StairText } from "./ui";

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-y border-line/30 bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-12">
        <SectionHeader
          label="[ 03 / Portfolio Catalog ]"
          title="Flagship Projects"
          description="Real-time, AI-powered and full-stack MERN applications built end to end."
        />
        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08} className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group flex h-full flex-col border border-line/40 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-[371/224] overflow-hidden bg-surface-2">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.title} preview`}
                      fill
                      sizes="(min-width:1024px) 373px, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(0,0,0,0.14) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    >
                      <span className="font-display text-7xl font-semibold tracking-[-0.04em] text-ink/85 sm:text-8xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 bg-ink px-2.5 py-1 font-mono text-sm uppercase leading-6 tracking-[0.05em] text-white">
                    {p.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
                    [ {p.tag} ]
                  </p>
                  <h3 className="h3 mt-1">{p.title}</h3>
                  <p className="mt-1 pt-1 text-sm leading-5 text-body">
                    {p.desc}
                  </p>
                  <div className="mb-6 mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-line/20 pt-4">
                    <a
                      href={p.live}
                      className="mono-btn group/l group/stair inline-flex items-center gap-1 text-ink"
                    >
                      <StairText>Live view</StairText>
                      <LiveArrowIcon className="h-[11px] w-[11px] transition-transform duration-300 group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
                    </a>
                    <a
                      href={p.source}
                      className="mono-btn group/stair inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
                    >
                      <StairText>Source</StairText>
                      <SourceIcon className="h-[7px] w-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
