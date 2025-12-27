import { client } from "@/sanity/lib/client";
import { socialProofQuery } from "@/sanity/lib/queries";
import SocialProofClient from "./SocialProofClient";

async function getData() {
    return await client.fetch(socialProofQuery, {}, { next: { revalidate: 60 } });
}

export default async function SocialProof() {
    const data = await getData();
    const clients = data?.clients || [
        "Annie Mac",
        "skrillex",
        "blondish",
        "realblackcoffee",
        "followthefishtv",
        "adriatique",
    ];

    return <SocialProofClient clients={clients} />;
}
