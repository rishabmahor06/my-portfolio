import { aboutFacts, aboutParagraphs, profile } from "@/lib/data";
import { ArrowIcon } from "./icons";
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

export default function About() {
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
          <Reveal
            delay={0.1}
            className="mt-6 flex flex-col gap-4 border border-line/40 bg-white px-6 pb-8 pt-10 sm:px-8 sm:pt-12"
          >
            {aboutFacts.map((f, i) => (
              <div
                key={f.label}
                className={`flex items-start justify-between gap-4 font-mono text-xs leading-4 tracking-[0.04em] ${
                  i < aboutFacts.length - 1 ? "border-b border-line/20 pb-3" : ""
                }`}
              >
                <span className="uppercase text-muted">{f.label}</span>
                <span
                  className={`break-all text-right ${f.bold ? "font-bold" : ""}`}
                >
                  {f.value}
                </span>
              </div>
            ))}
          </Reveal>
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
