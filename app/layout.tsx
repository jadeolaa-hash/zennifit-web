import type { Metadata } from "next";
import { Barlow, Geist, Geist_Mono, Lato, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifFont = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Matches the premium app's type (Lato 400/700/900).
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Brand heading face (Barlow Black Italic), used by the /zennifit landing page.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["900"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "ZenniFit — Precision in Every Motion",
  description: "On-device neural biomechanics and computer vision fitness protocols.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${serifFont.variable} ${lato.variable} ${barlow.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
