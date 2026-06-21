import { client } from "@/sanity/lib/client";
import { contactQuery } from "@/sanity/lib/queries";
import ContactClient from "./ContactClient";

async function getContactData() {
    return await client.fetch(contactQuery, {}, { next: { revalidate: 60 } });
}

export default async function Contact() {
    const data = await getContactData();
    // Default fallback values if Sanity is empty
    const capabilities = data?.capabilities || ["Editorial Photography", "Commercial Campaign", "Creative Direction", "Moving Image"];
    const status = data?.status || "Accepting New Projects";
    const email = data?.email || "studio@rossdavidson.com";
    const title = data?.title || "Let's Work";
    const description = data?.description || "Seeking projects that challenge the norm. Fashion, Music, Art Direction.";
    const disclaimer = data?.disclaimer || "By submitting this form you acknowledge that great work takes time and energy.";

    return (
        <ContactClient
            capabilities={capabilities}
            status={status}
            email={email}
            title={title}
            description={description}
            disclaimer={disclaimer}
        />
    );
}
