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
  title: "Ross Davidson | Photography",
  description: "Music and Nightlife Photography by Ross Davidson",
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
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
