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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

      </head>
      <body
        className={`${oswald.variable} ${inter.variable} antialiased`}
      >
        {/* <CustomCursor /> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
