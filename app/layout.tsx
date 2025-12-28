import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ross Davidson | Photography",
    template: "%s | Ross Davidson",
  },
  description: "London-based Photographer specializing in Music, Nightlife, and Editorial Fashion. Creating iconic imagery that defines brands and captures the energy of the moment.",
  keywords: ["Photographer", "London", "Music Photography", "Nightlife", "Editorial", "Fashion", "Event Photography"],
  authors: [{ name: "Ross Davidson" }],
  creator: "Ross Davidson",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://rossdavidson.com",
    title: "Ross Davidson | Photography",
    description: "London-based Photographer specializing in Music, Nightlife, and Editorial Fashion.",
    siteName: "Ross Davidson Photo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ross Davidson | Photography",
    description: "London-based Photographer specializing in Music, Nightlife, and Editorial Fashion.",
    creator: "@rossdavidson",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

// ... existing imports

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(settingsQuery, {}, { next: { revalidate: 60 } });
  const navLinks = settings?.headerLinks || [
    { label: "Work", url: "/#work" },
    { label: "Services", url: "/info" }, // Map Services to /info for now if using default
    { label: "About", url: "/#about" },
    { label: "Journal", url: "/journal" },
  ];

  return (
    <html lang="en">

      <body
        className={`${oswald.variable} ${inter.variable} antialiased`}
      >
        <CustomCursor />
        <Header links={navLinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
