import { client } from "@/sanity/lib/client";
import { publicationsPageQuery, publicationsQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import PublicationsClient from "@/components/PublicationsClient";

export const metadata: Metadata = {
    title: "Publications & Editorial",
    description: "Selected editorial covers, feature articles, and printed publications by Ross Davidson.",
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
    let publications = [];
    let pageSettings = null;

    try {
        [publications, pageSettings] = await Promise.all([
            client.fetch(publicationsQuery),
            client.fetch(publicationsPageQuery)
        ]);
    } catch (error) {
        console.error("Publications page fetch error:", error);
    }

    return (
        <main className="bg-black min-h-screen text-white pt-24 pb-12">
            <PublicationsClient publications={publications} pageSettings={pageSettings} />
        </main>
    );
}
