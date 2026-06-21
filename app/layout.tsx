import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";

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

export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

// ... existing imports

import HashScroll from "@/components/HashScroll";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(settingsQuery, {}, { cache: 'no-store' });
  const rawNavLinks = settings?.headerLinks || [
    { label: "Home", url: "/" },
    { label: "Live", url: "/live" },
    { label: "Publications", url: "/publications" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ];

  // Normalize any "About" link url to "/about" (in case it comes from Sanity as "/#about" or "#about")
  const normalizedLinks = rawNavLinks.map((link: any) => {
    if (link.label.toLowerCase() === 'about') {
      return { ...link, url: '/about' };
    }
    return link;
  });

  // Dynamically swap Contact and About if they exist in the wrong order (e.g. from Sanity settings)
  const navLinks = [...normalizedLinks];
  const contactIndex = navLinks.findIndex(l => l.label.toLowerCase() === 'contact');
  const aboutIndex = navLinks.findIndex(l => l.label.toLowerCase() === 'about');
  if (contactIndex !== -1 && aboutIndex !== -1 && aboutIndex < contactIndex) {
    const temp = navLinks[contactIndex];
    navLinks[contactIndex] = navLinks[aboutIndex];
    navLinks[aboutIndex] = temp;
  }

  return (
    <html lang="en">

      <body
        className={`${oswald.variable} ${inter.variable} antialiased`}
      >

        <Header links={navLinks} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  );
}
