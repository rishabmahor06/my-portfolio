"use client";

import { useEffect } from "react";

const AWAY_TITLE = "Come Back To Portfolio";
const HOME_ICON = "/favicon-me.png";
const AWAY_ICON = "/favicon-away.png";

function setFavicon(href: string) {
  const links = document.querySelectorAll<HTMLLinkElement>(
    'link[rel~="icon"]',
  );
  if (links.length) {
    links.forEach((l) => {
      l.type = "image/png";
      l.href = href;
    });
    return;
  }
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = href;
  document.head.appendChild(link);
}

// Away from the tab: title + prayer icon nudge the visitor back.
// Back on the tab: the normal title and the circular profile photo return.
export default function TabTitle() {
  useEffect(() => {
    let original = document.title;
    new Image().src = AWAY_ICON; // preload so the swap is instant

    const onChange = () => {
      if (document.hidden) {
        original = document.title;
        document.title = AWAY_TITLE;
        setFavicon(AWAY_ICON);
      } else {
        document.title = original;
        setFavicon(HOME_ICON);
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      if (document.title === AWAY_TITLE) document.title = original;
      setFavicon(HOME_ICON);
    };
  }, []);

  return null;
}
