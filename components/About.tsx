import { aboutFacts, aboutParagraphs, profile } from "@/lib/data";
import type { ReactNode } from "react";
import { ArrowIcon, EnvelopeIcon, PhoneIcon, PinIcon } from "./icons";
import { Reveal, StairText } from "./ui";

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

const tile =
  "border border-line/40 bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.22)]";

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line/40 bg-surface text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
      {children}
    </span>
  );
}

function ContactTile({
  href,
  label,
  value,
  icon,
  delay,
}: {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="col-span-2">
      <a href={href} className={`group flex items-center gap-4 p-4 ${tile}`}>
        <IconBox>{icon}</IconBox>
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-muted">
            {label}
          </span>
          <span className="mt-0.5 block break-all font-mono text-[12px] leading-5 tracking-normal text-ink sm:text-[13px] sm:tracking-[0.02em]">
            {value}
          </span>
        </span>
        <ArrowIcon className="h-[9px] w-[9px] shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
      </a>
    </Reveal>
  );
}

export default function About() {
  const [years, unit] = aboutFacts[0].value.split(" ");
  return (
    <section
      id="about"
      className="border-y border-line/30 bg-surface py-14 md:py-14"
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 md:px-12 lg:grid-cols-[minmax(0,465px)_minmax(0,1fr)] lg:gap-12">
        <div>
          <Reveal>
            <p className="label">[ Archival Profile ]</p>
            <h2 className="h2 mt-2">I&apos;m {profile.firstName}</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Reveal delay={0.1}>
              <div className={`flex h-full flex-col justify-between p-5 ${tile}`}>
                <p className="label">Experience</p>
                <p className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.04em]">
                  {years}
                  <span className="ml-1.5 font-sans text-base font-semibold tracking-normal text-body">
                    {unit}
                  </span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={`group flex h-full flex-col justify-between gap-6 p-5 ${tile}`}>
                <div className="flex items-start justify-between">
                  <p className="label">Base</p>
                  <IconBox>
                    <PinIcon className="h-[18px] w-[14px]" />
                  </IconBox>
                </div>
                <p className="text-2xl font-semibold leading-none tracking-[-0.02em]">
                  {profile.base}
                </p>
              </div>
            </Reveal>
            <ContactTile
              delay={0.2}
              label="Phone"
              value={profile.phone}
              href={`tel:${profile.phone.replace(/\s|-/g, "")}`}
              icon={<PhoneIcon className="h-4 w-4" />}
            />
            <ContactTile
              delay={0.25}
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              icon={<EnvelopeIcon className="h-3.5 w-[18px]" />}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal>
            <h3 className="h3">{profile.role}</h3>
          </Reveal>
          {aboutParagraphs.map((p, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <p className="text-base leading-6 text-body">
                <Rich text={p} />
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.25} className="pt-4">
            <a
              href={profile.resumeUrl}
              className="mono-btn group group/stair inline-flex items-center gap-2 bg-ink px-6 py-3 text-white transition-colors duration-300 hover:bg-ink-2"
            >
              <StairText>Download complete resume</StairText>
              <ArrowIcon className="h-[9px] w-[9px] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
