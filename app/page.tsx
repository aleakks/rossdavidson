import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import SocialProof from "@/components/SocialProof";
import PhotoStack from "@/components/PhotoStack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected works from Ross Davidson. Featuring campaigns for global brands, music artists, and editorial publications.",
};

export default function Home() {
  // Force rebuild for debug logs
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Hero />
      <SocialProof />
      <PhotoStack />
      <About />
      <Services />
      <Gallery />
      <Contact />
    </main>
  );
}
