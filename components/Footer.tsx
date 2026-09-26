import { footerLinks, profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line/30 bg-bg">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-12 md:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="mono-btn text-ink">{profile.footerTitle}</p>
          <p className="text-sm leading-6 text-body sm:text-base">
            {profile.copyright}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="font-mono text-[10px] uppercase leading-[14px] tracking-[0.06em] text-body transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
