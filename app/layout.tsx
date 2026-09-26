import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TabTitle from "@/components/TabTitle";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Rishab Kumar",
  icons: {
    icon: [{ url: "/favicon-me.png", type: "image/png" }],
    apple: "/favicon-me.png",
  },
  description:
    "Portfolio of Rishab Kumar, a full stack developer building scalable MERN applications with real-time features and AI integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} ${spaceMono.variable}`}
      // Browser extensions (e.g. ones that add `foxified` attributes) edit <html>/<body> before
      // React loads; without this React logs a hydration-mismatch warning that isn't a real bug.
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <TabTitle />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
