"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { EASE } from "./ui";

// Circular profile photo: gentle float, and on hover it tilts in 3D toward the
// cursor — the rings sit at different depths and a glare follows the pointer.
export default function ProfilePhoto({
  className = "",
  size = 320,
}: {
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20, mass: 0.7 };
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-14, 14]), spring);
  const scale = useSpring(1, spring);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 25 });
  const gx = useTransform(px, (v) => v * 100);
  const gy = useTransform(py, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    scale.set(1.06);
    glareOpacity.set(1);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ perspective: 900 }}
        className="aspect-square w-full"
      >
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
          style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
          className="relative h-full w-full will-change-transform"
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ translateZ: -40 }}
            className="absolute -inset-3 rounded-full border border-dashed border-ink/30"
          />
          <span
            aria-hidden="true"
            style={{ transform: "translateZ(-20px)" }}
            className="absolute -inset-1 rounded-full border border-line/60"
          />
          <Image
            src="/profile.png"
            alt="Rishab Kumar"
            width={size * 2}
            height={size * 2}
            priority
            sizes={`${size}px`}
            style={{ transform: "translateZ(10px)" }}
            className="relative h-full w-full rounded-full bg-surface-2 object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
          />
          <motion.span
            aria-hidden="true"
            style={{
              backgroundImage: glare,
              opacity: glareOpacity,
              transform: "translateZ(20px)",
            }}
            className="pointer-events-none absolute inset-0 rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
