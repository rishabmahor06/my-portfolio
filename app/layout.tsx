import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
  title: "Rishab Kumar — Full Stack Developer",
  description:
    "Portfolio of Rishab Kumar, a full stack developer building scalable MERN applications with real-time features and AI integration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${syne.variable} ${spaceMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
