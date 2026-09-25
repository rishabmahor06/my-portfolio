"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { ArrowIcon } from "./icons";
import { EASE } from "./ui";

// Appears as soon as the home section has scrolled out of view.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(home);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToId("home")}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="group fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center bg-ink text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] sm:bottom-8 sm:right-8"
        >
          <svg
            viewBox="0 0 48 48"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <motion.rect
              x="1.5"
              y="1.5"
              width="45"
              height="45"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowIcon className="h-[11px] w-[11px] -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
