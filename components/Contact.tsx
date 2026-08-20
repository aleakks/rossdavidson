import { client } from "@/sanity/lib/client";
import { contactQuery } from "@/sanity/lib/queries";
import ContactClient from "./ContactClient";

async function getContactData() {
    return await client.fetch(contactQuery, {}, { next: { revalidate: 60 } });
}

export default async function Contact() {
    const data = await getContactData();
    // Default fallback values if Sanity is empty
    const rawCapabilities = data?.capabilities || ["Editorial Photography", "Commercial Campaign", "Live Events", "Creative Direction", "Moving Image"];
    const capabilities = rawCapabilities.map((cap: string) =>
        cap === "Touring" || cap === "Music/Touring" ? "Live Events" : cap
    );
    const email = data?.email || "contact@rossdavidsonphoto.com";
    const title = data?.title || "Let's Work";

    return (
        <ContactClient
            capabilities={capabilities}
            email={email}
            title={title}
        />
    );
}
