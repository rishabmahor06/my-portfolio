"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { EASE, StairText } from "./ui";

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function Navbar() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-line/30 bg-bg/90 shadow-[0_1px_20px_rgba(0,0,0,0.04)]"
            : "border-line/30 bg-bg/85"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-12">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="group flex items-center gap-2"
          >
            <span className="block h-3 w-3 bg-ink transition-transform duration-500 group-hover:rotate-90" />
            <span className="text-lg font-semibold uppercase tracking-[-0.025em] sm:text-xl">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center xl:flex">
            {navLinks.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
                className={`mono-btn group/stair relative pb-1 tracking-[0.1em] transition-colors duration-200 hover:text-ink ${
                  i > 0 ? "ml-8" : ""
                } ${active === l.id ? "text-ink" : "text-body"}`}
              >
                <StairText>{l.label}</StairText>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-ink"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden items-center xl:flex">
            <a
              href={profile.resumeUrl}
              className="mono-btn group/stair border border-line px-4 py-2 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
            >
              <StairText>Resume</StairText>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
              className="mono-btn group/stair ml-4 bg-ink px-4 py-2 text-white transition-colors duration-300 hover:bg-ink-2"
            >
              <StairText>Available for hire</StairText>
            </a>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center border border-line xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <motion.span
                className="absolute left-0 top-0 h-px w-5 bg-ink"
                animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
              />
              <motion.span
                className="absolute left-0 top-[6px] h-px w-5 bg-ink"
                animate={{ opacity: open ? 0 : 1 }}
              />
              <motion.span
                className="absolute left-0 top-3 h-px w-5 bg-ink"
                animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
              />
            </span>
          </button>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-ink"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] xl:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,360px)] flex-col bg-bg px-6 pb-8 pt-24 shadow-2xl xl:hidden"
            >
              <p className="label mb-4">[ Navigation ]</p>
              <nav className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.id);
                    }}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                    className={`flex items-center justify-between border-b border-line/40 py-4 font-display text-2xl ${
                      active === l.id ? "text-ink" : "text-body"
                    }`}
                  >
                    {l.label}
                    <span className="font-mono text-xs text-muted">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <a
                  href={profile.resumeUrl}
                  className="mono-btn border border-line py-3 text-center"
                >
                  Resume
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    go("contact");
                  }}
                  className="mono-btn bg-ink py-3 text-center text-white"
                >
                  Available for hire
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
