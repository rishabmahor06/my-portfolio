"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Code2,
  Image as ImageIcon,
  Package,
  ShieldCheck,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import {
  siCloudinary,
  siCss,
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siGooglemaps,
  siHtml5,
  siJavascript,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostman,
  siRazorpay,
  siReact,
  siRender,
  siShopify,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";
import { EASE, Reveal, SectionHeader } from "./ui";

type Skill = {
  name: string;
  brand?: SimpleIcon;
  fallback?: { Icon: LucideIcon; color: string };
};

// Brand logos come from simple-icons; the few it doesn't ship get a coloured icon.
const skills: Skill[] = [
  { name: "HTML5", brand: siHtml5 },
  { name: "CSS3", brand: siCss },
  { name: "JavaScript", brand: siJavascript },
  { name: "TypeScript", brand: siTypescript },
  { name: "React.js", brand: siReact },
  { name: "Next.js", brand: siNextdotjs },
  { name: "Tailwind CSS", brand: siTailwindcss },
  { name: "Zustand", fallback: { Icon: Package, color: "#5b4636" } },
  { name: "WordPress", brand: siWordpress },
  { name: "Shopify", brand: siShopify },
  { name: "Node.js", brand: siNodedotjs },
  { name: "Express.js", brand: siExpress },
  { name: "Socket.io", brand: siSocketdotio },
  { name: "REST APIs", fallback: { Icon: Webhook, color: "#0ea5e9" } },
  { name: "Auth (JWT)", fallback: { Icon: ShieldCheck, color: "#d63aff" } },
  { name: "PHP", brand: siPhp },
  { name: "MongoDB", brand: siMongodb },
  { name: "MySQL", brand: siMysql },
  { name: "Cloudinary", brand: siCloudinary },
  { name: "ImageKit.io", fallback: { Icon: ImageIcon, color: "#0450d5" } },
  { name: "Google Maps API", brand: siGooglemaps },
  { name: "OpenAI API", fallback: { Icon: Bot, color: "#10a37f" } },
  { name: "Gemini AI", brand: siGooglegemini },
  { name: "Razorpay", brand: siRazorpay },
  { name: "Git", brand: siGit },
  { name: "GitHub", brand: siGithub },
  { name: "Postman", brand: siPostman },
  { name: "VS Code", fallback: { Icon: Code2, color: "#007acc" } },
  { name: "Vercel", brand: siVercel },
  { name: "Render", brand: siRender },
];

function Logo({ skill }: { skill: Skill }) {
  if (skill.brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[26px] w-[26px]"
        fill={`#${skill.brand.hex}`}
        aria-hidden="true"
      >
        <path d={skill.brand.path} />
      </svg>
    );
  }
  const { Icon, color } = skill.fallback!;
  return <Icon className="h-[26px] w-[26px]" style={{ color }} strokeWidth={1.75} aria-hidden="true" />;
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-[1280px] px-5 py-16 md:px-12 md:py-24"
    >
      <SectionHeader
        label="[ 02 / Technical Arsenal ]"
        title="Skills & Abilities"
      
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:mt-12 lg:grid-cols-6">
        {skills.map((s, i) => (
          <li key={s.name}>
            <Reveal delay={(i % 6) * 0.05} y={18} className="h-full">
              <motion.div
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="group flex h-full min-h-[92px] cursor-default flex-col items-center justify-center gap-3 rounded-xl border border-line/40 bg-white px-3 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.22)]"
              >
                <motion.span
                  className="flex"
                  whileHover={{ scale: 1.18, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 14 }}
                >
                  <Logo skill={s} />
                </motion.span>
                <span className="text-center text-[11px] font-semibold leading-[14px] tracking-[-0.005em] text-ink-2">
                  {s.name}
                </span>
              </motion.div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
