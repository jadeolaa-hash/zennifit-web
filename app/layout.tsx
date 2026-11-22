import type { Metadata } from "next";
import { Barlow, Geist, Geist_Mono, Newsreader } from "next/font/google";
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

// Site-wide brand face: Barlow for body text, Barlow Black (900) for headings.
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "ZenniFitness — ZenniFit app and Zenni Fitness shop",
  description: "Home of ZenniFit, the AI-coached training app, and the Zenni Fitness shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${serifFont.variable} ${barlow.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
