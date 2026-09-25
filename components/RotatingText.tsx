"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./ui";

// `prefix` stays fixed. Once a word has fully arrived it stays readable for
// HOLD_MS, then its letters climb out one step after another (staircase). The
// next word's first letter starts rising the moment the last letter has left.
const HOLD_MS = 3000;

const word: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
  gone: { transition: { staggerChildren: 0.02 } },
};

const letter: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.2, ease: EASE } },
  gone: { y: "-110%", opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

export default function RotatingText({
  prefix,
  words,
}: {
  prefix: string;
  words: readonly string[];
}) {
  const [i, setI] = useState(0);
  const entered = useRef(false);

  // The first word is already on screen (no entrance animation); later words
  // need their letters to finish rising before the hold time starts counting.
  useEffect(() => {
    const enterMs = entered.current ? (words[i].length - 1) * 30 + 400 : 0;
    entered.current = true;
    const t = setTimeout(
      () => setI((v) => (v + 1) % words.length),
      enterMs + HOLD_MS,
    );
    return () => clearTimeout(t);
  }, [i, words]);

  return (
    <p className="flex items-center gap-[0.35em] whitespace-nowrap text-xl font-semibold leading-8 tracking-[-0.015em] text-sub md:text-2xl">
      <span>{prefix}</span>
      <span className="sr-only">{words.join(", ")}</span>
      <span className="relative block h-8 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            variants={word}
            initial="hidden"
            animate="show"
            exit="gone"
            className="flex text-ink"
          >
            {[...words[i]].map((c, n) => (
              <motion.span key={n} variants={letter} className="inline-block">
                {c === " " ? "\u00A0" : c}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
