import { client } from "@/sanity/lib/client";
import { socialProofQuery } from "@/sanity/lib/queries";
import SocialProofClient from "./SocialProofClient";

export default async function SocialProof() {
    let data = null;
    try {
        data = await client.fetch(socialProofQuery, {}, { next: { revalidate: 60 } });
    } catch (e) {
        console.error("Social Proof Fetch Error", e);
    }

    const clients = data?.clients || [
        "Mixmag",
        "DJ Mag",
        "Insomniac",
        "Defected",
        "Cercle",
        "Afterlife",
    ];
    const callout = data?.primaryCallout;

    return <SocialProofClient clients={clients} callout={callout} />;
}
