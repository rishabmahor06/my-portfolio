import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - 80;
  if (instance) instance.scrollTo(top, { duration: 1.3 });
  else window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", id === "home" ? " " : `#${id}`);
}
