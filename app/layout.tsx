import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prime PDR — Paintless Dent Repair in Austin, Texas",
  description:
    "Mobile paintless dent repair in Austin, Cedar Park, Round Rock & surrounding areas. Premium results without repainting. Free estimates by photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
