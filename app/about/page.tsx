import About from "@/components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About the Artist",
    description: "Learn more about London-based photographer Ross Davidson, his biography, creative philosophy, and portrait work.",
};

export default function AboutPage() {
    return (
        <main className="pt-20">
            <About />
        </main>
    );
}
