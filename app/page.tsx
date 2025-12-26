import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import SocialProof from "@/components/SocialProof";
import PhotoStack from "@/components/PhotoStack";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { getPhotos, getHeroSettings } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected works from Ross Davidson. Featuring campaigns for global brands, music artists, and editorial publications.",
};

export default function Home() {
  const photos = getPhotos();
  const heroSettings = getHeroSettings();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Hero
        title={heroSettings.title}
        subtitle={heroSettings.subtitle}
        images={heroSettings.images}
      />
      <SocialProof />
      <PhotoStack />
      <About />
      <Services />
      <Gallery photos={photos} />
      <Contact />
    </main>
  );
}
