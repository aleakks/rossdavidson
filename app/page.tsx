import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import FeaturedWork from "@/components/FeaturedWork";
import { getPhotos, getHeroSettings, getFeaturedSettings } from "@/lib/api";

export default function Home() {
  const photos = getPhotos();
  const heroSettings = getHeroSettings();
  const featuredSettings = getFeaturedSettings();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Hero
        title={heroSettings.title}
        subtitle={heroSettings.subtitle}
        images={heroSettings.images}
      />
      <FeaturedWork
        heading={featuredSettings.heading}
        blocks={featuredSettings.blocks}
      />
      <Gallery photos={photos} />
    </main>
  );
}
