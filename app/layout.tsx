import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
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
      <body
        className={`${oswald.variable} ${inter.variable} antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
