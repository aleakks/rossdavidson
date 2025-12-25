import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import { getPhotos, getHeroSettings } from "@/lib/api";

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
      <About />
      <Gallery photos={photos} />
      <Contact />
    </main>
  );
}
