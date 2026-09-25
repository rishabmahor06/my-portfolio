"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowIcon } from "./icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "transition" | "viewport"
>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
      <Reveal>
        <p className="label">{label}</p>
        <h2 className="h2 mt-2 text-ink">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1} className="md:max-w-[640px] md:text-right">
          <p className="pb-1 text-base leading-6 text-body">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  arrow?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  arrow = false,
  type = "button",
  className = "",
}: BtnProps) {
  const base =
    "mono-btn group group/stair relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 transition-colors duration-300 cursor-pointer";
  const styles =
    variant === "solid"
      ? "bg-ink text-white hover:bg-ink-2"
      : "border border-line text-ink hover:border-ink hover:bg-ink hover:text-white";
  const inner = (
    <>
      <span className="relative">
        {typeof children === "string" ? (
          <StairText>{children}</StairText>
        ) : (
          children
        )}
      </span>
      {arrow && (
        <ArrowIcon className="relative h-[9px] w-[9px] transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </>
  );
  const props = {
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
    className: `${base} ${styles} ${className}`,
  };
  if (href)
    return (
      <motion.a href={href} onClick={onClick} {...props}>
        {inner}
      </motion.a>
    );
  return (
    <motion.button type={type} onClick={onClick} {...props}>
      {inner}
    </motion.button>
  );
}

/**
 * Staircase hover text: put `group/stair` on the hovering parent. Each letter
 * rolls up and is replaced by a copy from below, one step after another.
 */
export function StairText({ children }: { children: string }) {
  return (
    <span className="inline-flex" aria-label={children}>
      {[...children].map((c, i) => {
        const ch = c === " " ? " " : c;
        const cls =
          "block transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stair:-translate-y-full group-focus-visible/stair:-translate-y-full motion-reduce:transition-none";
        return (
          <span
            key={i}
            aria-hidden="true"
            className="relative inline-block h-[1lh] overflow-hidden align-top"
          >
            <span className={cls} style={{ transitionDelay: `${i * 22}ms` }}>
              {ch}
            </span>
            <span
              className={`${cls} absolute left-0 top-full`}
              style={{ transitionDelay: `${i * 22}ms` }}
            >
              {ch}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block cursor-default border border-line/40 bg-surface px-2.5 py-1 font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-ink-2 transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white">
      {children}
    </span>
  );
}
