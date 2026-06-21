import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import PhotoStack from "@/components/PhotoStack";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected works from Ross Davidson. Featuring campaigns for global brands, music artists, and editorial publications.",
};

// Removed runtime='edge' to ensure stability
// export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Hero />
      <SocialProof />
      <PhotoStack />
    </main>
  );
}

