"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { LiveArrowIcon, SourceIcon } from "./icons";
import { Chip, Reveal, SectionHeader, StairText } from "./ui";

type Project = (typeof projects)[number];

// On phones the overlay appears after the card has been held for 0.2 second.
const HOLD_MS = 200;

const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

function ProjectCard({ p, i }: { p: Project; i: number }) {
  // Touch screens have no hover: pressing and holding the card shows the overlay.
  const [open, setOpen] = useState(false);
  // Mouse hover is tracked in state (not CSS :hover) so it also works in mobile/responsive
  // view, where the `(hover: hover)` media query is off and Tailwind's hover: variants never fire.
  const [hover, setHover] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const holdStart = useRef({ x: 0, y: 0 });
  const justHeld = useRef(false);

  // 3D tilt: the card leans toward the cursor, with a glare that follows it.
  const ref = useRef<HTMLElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const scale = useSpring(1, spring);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const gx = useTransform(px, (v) => v * 100);
  const gy = useTransform(py, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.32), transparent 55%)`;

  // tapping anywhere outside an open card closes it
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);
  useEffect(
    () => () => {
      clearTimeout(holdTimer.current);
      clearTimeout(hoverTimer.current);
    },
    [],
  );

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    justHeld.current = false;
    holdStart.current = { x: e.clientX, y: e.clientY };
    clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => {
      justHeld.current = true;
      setOpen(true);
      navigator.vibrate?.(12);
    }, HOLD_MS);
  };
  const onUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    clearTimeout(holdTimer.current);
    // a quick tap on an already-open card closes it; releasing the long press keeps it open
    if (open && !justHeld.current) setOpen(false);
    justHeld.current = false;
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") {
      // finger moved: it's a scroll, not a long press
      if (
        Math.abs(e.clientX - holdStart.current.x) > 10 ||
        Math.abs(e.clientY - holdStart.current.y) > 10
      )
        clearTimeout(holdTimer.current);
      return;
    }
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    // in mobile/responsive view (touch-style device) the hover also waits 1s; on desktop it's instant
    clearTimeout(hoverTimer.current);
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches)
      hoverTimer.current = setTimeout(() => setHover(true), HOLD_MS);
    else setHover(true);
    scale.set(1.03);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    clearTimeout(hoverTimer.current);
    setHover(false);
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
    glareOpacity.set(0);
  };

  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <div className="h-full [perspective:1100px]">
      <motion.article
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => clearTimeout(holdTimer.current)}
        onContextMenu={(e) => {
          if (window.matchMedia("(pointer: coarse)").matches) e.preventDefault();
        }}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="group relative flex h-full select-none flex-col [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] border border-line/40 bg-white will-change-transform transition-shadow duration-300 hover:shadow-[0_35px_60px_-25px_rgba(0,0,0,0.4)]"
      >
        {/* glare that follows the cursor */}
        <motion.div
          aria-hidden="true"
          style={{ backgroundImage: glare, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 z-20"
        />
        {/* top: project image */}
        <div className="relative aspect-[371/224] overflow-hidden bg-surface-2">
          {p.image ? (
            <Image
              src={p.image}
              alt={`${p.title} preview`}
              fill
              sizes="(min-width:1024px) 373px, (min-width:768px) 50vw, 100vw"
              draggable={false}
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

        {/* bottom: tech stack, with the action overlay on hover */}
        <div className="relative flex flex-1 flex-col overflow-hidden border-t border-line/30 p-6">
          <p className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
            [ {p.tag} ]
          </p>
          <h3 className="h3 mt-1">{p.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>

          <div
            data-open={open || hover}
            className="absolute inset-0 flex translate-y-full items-center justify-center gap-3 bg-ink px-6 opacity-0 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:opacity-100"
          >
            <a
              href={p.live}
              {...external(p.live)}
              className="mono-btn group/stair inline-flex items-center gap-2 bg-white px-5 py-3 text-ink transition-colors duration-300 hover:bg-surface-2"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
            >
              <StairText>View</StairText>
              <LiveArrowIcon className="h-[11px] w-[11px] transition-transform duration-300 group-hover/stair:-translate-y-0.5 group-hover/stair:translate-x-0.5" />
            </a>
            <a
              href={p.source}
              {...external(p.source)}
              className="mono-btn group/stair inline-flex items-center gap-2 border border-white/60 px-5 py-3 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
            >
              <StairText>Code</StairText>
              <SourceIcon className="h-[7px] w-3" />
            </a>
          </div>
        </div>
      </motion.article>
      </div>
    </Reveal>
  );
}

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
          
        />
        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
