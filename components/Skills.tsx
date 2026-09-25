"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import {
  AiIcon,
  BackendIcon,
  FrontendIcon,
  GrowthIcon,
} from "./icons";
import { Chip, EASE, Reveal, SectionHeader } from "./ui";

const icons = {
  ai: AiIcon,
  backend: BackendIcon,
  frontend: FrontendIcon,
  growth: GrowthIcon,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-24"
    >
      <SectionHeader
        label="[ 02 / Technical Capabilities ]"
        title="Skills & Abilities"
        description="Categorized tech stack spanning frontend, backend, databases and third-party integrations."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {skillGroups.map((g, i) => {
          const Icon = icons[g.icon];
          return (
            <Reveal key={g.title} delay={(i % 3) * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="h-full border border-line/40 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-center justify-between border-b border-line/20 pb-3">
                  <h3 className="text-xl font-semibold leading-7 tracking-[-0.01em]">
                    {g.title}
                  </h3>
                  <Icon />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
