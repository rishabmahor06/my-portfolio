"use client";

import { motion } from "framer-motion";
import { siClaude, siGooglegemini, siPerplexity } from "simple-icons";
import { profile } from "@/lib/data";
import { EASE } from "./ui";

// The message every AI tool receives. Written for the tool, not the visitor.
const PROMPT = `Please go through this portfolio page and summarize ${profile.name}'s profile — skills, experience, projects, and the services offered. After the summary, I will ask follow-up questions, so please ensure the analysis is concise and covers the main points. Here's the page URL: ${profile.siteUrl}`;

const OPENAI_PATH =
  "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z";

type Tool = {
  name: string;
  /** builds the URL that opens the tool with the prompt pre-filled */
  url: (q: string) => string;
  icon: React.ReactNode;
  color: string;
};

const svg = (path: string, fill?: string) => (
  <svg
    viewBox="0 0 24 24"
    className="h-[22px] w-[22px]"
    fill={fill ?? "currentColor"}
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const tools: Tool[] = [
  {
    name: "ChatGPT",
    url: (q) => `https://chatgpt.com/?q=${q}`,
    icon: svg(OPENAI_PATH),
    color: "#10a37f",
  },
  {
    name: "Claude",
    url: (q) => `https://claude.ai/new?q=${q}`,
    icon: svg(siClaude.path, `#${siClaude.hex}`),
    color: `#${siClaude.hex}`,
  },
  {
    // gemini.google.com can't be pre-filled from a URL, but Google's Gemini-powered
    // AI Mode can: ?udm=50&q=<prompt> opens it with the prompt already sent.
    name: "Gemini",
    url: (q) => `https://www.google.com/search?udm=50&q=${q}`,
    icon: svg(siGooglegemini.path, `#${siGooglegemini.hex}`),
    color: `#${siGooglegemini.hex}`,
  },
  {
    name: "Grok",
    url: (q) => `https://grok.com/?q=${q}`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[22px] w-[22px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8.5" />
        <path d="M6 19.5 19 5" />
      </svg>
    ),
    color: "#111111",
  },
  {
    name: "Perplexity",
    url: (q) => `https://www.perplexity.ai/search?q=${q}`,
    icon: svg(siPerplexity.path, `#${siPerplexity.hex}`),
    color: `#${siPerplexity.hex}`,
  },
];

export default function AskAI() {
  const q = encodeURIComponent(PROMPT);

  return (
    <div className="mt-8">
      <p className="label">[ Ask AI about me ]</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {tools.map((t) => {
          const cls =
            "group relative flex h-12 w-12 items-center justify-center rounded-full border border-line/40 bg-surface-2 text-ink transition-colors duration-300 hover:border-transparent hover:bg-white";
          const inner = (
            <>
              <span className="transition-transform duration-300 group-hover:scale-110">
                {t.icon}
              </span>
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-white opacity-0 transition-all duration-200 group-hover:-bottom-10 group-hover:opacity-100">
                Ask {t.name}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_0_2px_var(--ring)] transition-opacity duration-300 group-hover:opacity-100"
                style={{ ["--ring" as string]: t.color }}
              />
            </>
          );
          return (
            <li key={t.name}>
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <a
                  href={t.url(q)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask ${t.name} about ${profile.name}`}
                  className={cls}
                >
                  {inner}
                </a>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
