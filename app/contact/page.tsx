import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact & Licensing",
    description: "Start a project, inquire about licensing, or request a rate card. London-based music and nightlife photographer Ross Davidson.",
};

export default function ContactPage() {
    return (
        <main className="pt-20">
            <Contact />
        </main>
    );
}


